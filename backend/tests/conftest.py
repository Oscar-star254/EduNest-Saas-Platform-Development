import pytest

from app import create_app


@pytest.fixture()
def app():
    return create_app({"TESTING": True, "JWT_SECRET_KEY": "test-secret"})


@pytest.fixture()
def client(app):
    return app.test_client()


def login(client, email):
    response = client.post("/api/v1/auth/login", json={"email": email, "password": "Demo@2025"})
    assert response.status_code == 200
    return {"Authorization": f"Bearer {response.get_json()['data']['access_token']}"}


@pytest.fixture()
def school_a_headers(client):
    return login(client, "admin@brookfield.ac.ke")


@pytest.fixture()
def school_b_headers(client):
    return login(client, "admin@highlands.ac.ke")
