from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from functools import wraps
from threading import Lock
from uuid import uuid4

from flask import Flask, g, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt,
    verify_jwt_in_request,
)
from werkzeug.security import check_password_hash, generate_password_hash


ROLE_PERMISSIONS = {
    "super_admin": {"*"},
    "school_admin": {"students.read", "students.write", "fees.read", "fees.write", "audit.read"},
    "teacher": {"students.read"},
    "accountant": {"students.read", "fees.read", "fees.write"},
}


class MemoryStore:
    """Thread-safe offline store used by tests and zero-config sandbox mode."""

    def __init__(self) -> None:
        self.lock = Lock()
        self.users: dict[str, dict] = {}
        self.students: dict[str, dict] = {}
        self.invoices: dict[str, dict] = {}
        self.payments: dict[str, dict] = {}
        self.audit: list[dict] = []
        self.sms: list[dict] = []
        self.idempotency: dict[str, dict] = {}
        self.seed()

    def seed(self) -> None:
        password = generate_password_hash("Demo@2025")
        users = [
            ("super@edunest.africa", "super_admin", None, "Platform Admin"),
            ("admin@brookfield.ac.ke", "school_admin", "school-a", "Mary Wanjiru"),
            ("teacher@brookfield.ac.ke", "teacher", "school-a", "Eva Wambui"),
            ("accounts@brookfield.ac.ke", "accountant", "school-a", "Peter Kamau"),
            ("admin@highlands.ac.ke", "school_admin", "school-b", "Joseph Kiptoo"),
        ]
        for email, role, school_id, name in users:
            self.users[email] = {
                "id": str(uuid4()),
                "email": email,
                "password": password,
                "role": role,
                "school_id": school_id,
                "name": name,
            }
        for school_id, admission, name in [
            ("school-a", "ADM-2024-0182", "Amani Mwangi"),
            ("school-a", "ADM-2024-0194", "Brian Otieno"),
            ("school-b", "HLA-2024-0001", "Faith Chebet"),
        ]:
            student_id = str(uuid4())
            self.students[student_id] = {
                "id": student_id,
                "school_id": school_id,
                "admission_no": admission,
                "name": name,
                "class_name": "Grade 7A",
                "deleted_at": None,
                "created_at": now_iso(),
                "updated_at": now_iso(),
            }
            invoice_id = str(uuid4())
            self.invoices[invoice_id] = {
                "id": invoice_id,
                "school_id": school_id,
                "student_id": student_id,
                "total": 50000,
                "paid": 0,
                "balance": 50000,
            }

    def audit_event(self, action: str, resource: str, resource_id: str | None, details: dict | None = None) -> None:
        self.audit.append(
            {
                "id": str(uuid4()),
                "school_id": getattr(g, "school_id", None),
                "actor_id": getattr(g, "user", {}).get("sub"),
                "action": action,
                "resource": resource,
                "resource_id": resource_id,
                "details": details or {},
                "ip": request.remote_addr,
                "created_at": now_iso(),
            }
        )


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def envelope(data=None, *, message: str | None = None, errors=None, status: int = 200):
    return jsonify({"success": status < 400, "data": data, "message": message, "errors": errors}), status


def require_permission(permission: str):
    def decorator(handler):
        @wraps(handler)
        def wrapped(*args, **kwargs):
            role = g.user.get("role")
            allowed = ROLE_PERMISSIONS.get(role, set())
            if "*" not in allowed and permission not in allowed:
                return envelope(message="You do not have permission for this action.", status=403)
            return handler(*args, **kwargs)

        return wrapped

    return decorator


def tenant_records(records: dict[str, dict]) -> list[dict]:
    return [
        record
        for record in records.values()
        if record.get("school_id") == g.school_id and not record.get("deleted_at")
    ]


def create_app(config: dict | None = None) -> Flask:
    app = Flask(__name__)
    app.config.update(
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "offline-demo-secret-change-in-production"),
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1),
        JSON_SORT_KEYS=False,
    )
    if config:
        app.config.update(config)
    CORS(app, origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:8443").split(","))
    JWTManager(app)
    app.extensions["store"] = MemoryStore()

    @app.after_request
    def security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        return response

    @app.before_request
    def authenticated_tenant():
        if request.path in {"/api/v1/health", "/api/v1/auth/login"}:
            return None
        verify_jwt_in_request()
        claims = get_jwt()
        g.user = claims
        g.school_id = claims.get("school_id")
        if claims.get("role") != "super_admin" and not g.school_id:
            return envelope(message="Authenticated user has no school context.", status=403)
        return None

    @app.get("/api/v1/health")
    def health():
        return envelope({"status": "healthy", "mode": "sandbox"})

    @app.post("/api/v1/auth/login")
    def login():
        body = request.get_json(silent=True) or {}
        store: MemoryStore = app.extensions["store"]
        user = store.users.get(str(body.get("email", "")).lower())
        if not user or not check_password_hash(user["password"], str(body.get("password", ""))):
            return envelope(message="Incorrect email or password.", status=401)
        claims = {
            "sub": user["id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "school_id": user["school_id"],
        }
        token = create_access_token(identity=user["id"], additional_claims=claims)
        with app.test_request_context():
            g.user = claims
            g.school_id = user["school_id"]
            store.audit.append(
                {
                    "id": str(uuid4()),
                    "school_id": user["school_id"],
                    "actor_id": user["id"],
                    "action": "login",
                    "resource": "auth",
                    "ip": request.remote_addr,
                    "created_at": now_iso(),
                }
            )
        return envelope({"access_token": token, "user": {key: value for key, value in claims.items() if key != "sub"}}, message="Welcome back.")

    @app.get("/api/v1/students")
    @require_permission("students.read")
    def list_students():
        store: MemoryStore = app.extensions["store"]
        query = request.args.get("search", "").lower()
        page = max(1, request.args.get("page", 1, type=int))
        per_page = min(100, max(1, request.args.get("per_page", 25, type=int)))
        records = tenant_records(store.students)
        if query:
            records = [record for record in records if query in f"{record['name']} {record['admission_no']}".lower()]
        records.sort(key=lambda item: item["name"])
        start = (page - 1) * per_page
        return envelope({"items": records[start : start + per_page], "pagination": {"page": page, "per_page": per_page, "total": len(records)}})

    @app.get("/api/v1/students/<student_id>")
    @require_permission("students.read")
    def get_student(student_id: str):
        store: MemoryStore = app.extensions["store"]
        student = store.students.get(student_id)
        if not student or student.get("school_id") != g.school_id or student.get("deleted_at"):
            return envelope(message="Student not found.", status=404)
        return envelope(student)

    @app.post("/api/v1/students")
    @require_permission("students.write")
    def create_student():
        body = request.get_json(silent=True) or {}
        if not body.get("name") or not body.get("class_name"):
            return envelope(errors={"fields": ["name and class_name are required"]}, status=422)
        store: MemoryStore = app.extensions["store"]
        with store.lock:
            count = len(tenant_records(store.students)) + 1
            student_id = str(uuid4())
            student = {
                "id": student_id,
                "school_id": g.school_id,
                "name": str(body["name"]).strip(),
                "class_name": str(body["class_name"]).strip(),
                "admission_no": f"ADM-{datetime.now().year}-{count:04d}",
                "deleted_at": None,
                "created_at": now_iso(),
                "updated_at": now_iso(),
                "created_by": g.user["sub"],
            }
            store.students[student_id] = student
            store.audit_event("create", "student", student_id)
        return envelope(student, message="Student created.", status=201)

    def reconcile_payment(body: dict, idempotency_key: str):
        store: MemoryStore = app.extensions["store"]
        if not idempotency_key:
            return None, envelope(message="Idempotency-Key header is required.", status=400)
        if idempotency_key in store.idempotency:
            return store.idempotency[idempotency_key], None
        amount = body.get("amount")
        admission = body.get("admission_no")
        if not isinstance(amount, (int, float)) or amount <= 0 or not admission:
            return None, envelope(errors={"fields": ["positive amount and admission_no are required"]}, status=422)
        student = next((item for item in tenant_records(store.students) if item["admission_no"] == admission), None)
        if not student:
            return None, envelope(message="No matching student account.", status=404)
        invoice = next(item for item in store.invoices.values() if item["school_id"] == g.school_id and item["student_id"] == student["id"])
        applied = min(float(amount), invoice["balance"])
        invoice["paid"] += applied
        invoice["balance"] -= applied
        payment = {
            "id": str(uuid4()),
            "school_id": g.school_id,
            "student_id": student["id"],
            "invoice_id": invoice["id"],
            "amount": float(amount),
            "applied": applied,
            "reference": body.get("reference") or f"SIM{uuid4().hex[:9].upper()}",
            "status": "reconciled",
            "receipt_url": f"/api/v1/payments/receipts/{uuid4().hex}.pdf",
            "created_at": now_iso(),
            "new_balance": invoice["balance"],
        }
        store.payments[payment["id"]] = payment
        message = f"Payment received: KSh {amount:,.0f}. Student: {student['name']}. New balance: KSh {invoice['balance']:,.0f}"
        store.sms.append({"school_id": g.school_id, "student_id": student["id"], "message": message, "status": "mock-delivered"})
        store.idempotency[idempotency_key] = payment
        store.audit_event("create", "payment", payment["id"], {"amount": amount})
        return payment, None

    @app.post("/api/v1/payments/stk-push")
    @require_permission("fees.write")
    def stk_push():
        store: MemoryStore = app.extensions["store"]
        with store.lock:
            payment, error = reconcile_payment(request.get_json(silent=True) or {}, request.headers.get("Idempotency-Key", ""))
        if error:
            return error
        return envelope({"checkout_request_id": f"ws_CO_{uuid4().hex[:16]}", "payment": payment, "sms_status": "mock-delivered"}, message="Sandbox STK payment completed.")

    @app.get("/api/v1/payments")
    @require_permission("fees.read")
    def list_payments():
        store: MemoryStore = app.extensions["store"]
        return envelope({"items": tenant_records(store.payments), "total": len(tenant_records(store.payments))})

    @app.get("/api/v1/audit")
    @require_permission("audit.read")
    def list_audit():
        store: MemoryStore = app.extensions["store"]
        return envelope({"items": [item for item in store.audit if item.get("school_id") == g.school_id]})

    @app.errorhandler(422)
    def validation_error(error):
        return envelope(message="Validation failed.", errors={"detail": str(error)}, status=422)

    return app
