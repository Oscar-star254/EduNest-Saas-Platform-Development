def test_stk_sandbox_reconciles_once_and_sends_sms(client, app, school_a_headers):
    payload = {"admission_no": "ADM-2024-0182", "amount": 10000, "phone": "254712345678"}
    headers = {**school_a_headers, "Idempotency-Key": "checkout-001"}

    first = client.post("/api/v1/payments/stk-push", headers=headers, json=payload)
    second = client.post("/api/v1/payments/stk-push", headers=headers, json=payload)

    assert first.status_code == 200
    assert second.status_code == 200
    first_payment = first.get_json()["data"]["payment"]
    second_payment = second.get_json()["data"]["payment"]
    assert first_payment["id"] == second_payment["id"]
    assert first_payment["new_balance"] == 40000

    store = app.extensions["store"]
    assert len(store.payments) == 1
    assert len(store.sms) == 1
    assert store.sms[0]["status"] == "mock-delivered"
    assert "KSh 10,000" in store.sms[0]["message"]
