import pytest
from app.core.jwt import create_access_token, verify_access_token

def test_register_user(client):
    response = client.post("/auth/register", json={
        "email": "another2test@example.com",
        "password": "passcode345"
    })
    print(response.json())
    print(response.status_code)
    
    assert response.status_code == 201
    
def test_replicate_duplicate_email(client):
    client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "MyPassword"
    })
    
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "MyPassword"
    })
    
    assert response.status_code == 400
    
def test_login_user_invalid_password(client):
    client.post("/auth/register", json={
        "email": "test@google.com",
        "password": "password0101"
    })
    
    response = client.post("/auth/login", json={
        "email": "test@google.com",
        "password": "wrongpassword"
    })
    
    assert response.status_code == 401
    
def test_login_user_success(client):
    client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "password12345"
    })
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password12345"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
    
# These tests are for protected routes
def test_get_current_user_without_token(client):
    """This tests if the api can get the user without the jwt token"""
    response = client.get("/users/me")
    assert response.status_code == 401     # This should reject the request
    
def test_get_current_user_with_token(client):
    client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "password0101"
    })
    
    login = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password0101"
    })
    token = login.json()["access_token"]
    
    response = client.get("/users/me", headers={"Authorization": f"Bearer {token}"})
    
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    
def test_verify_access_token():
    """To test if the access token is correctly verified"""
    token = create_access_token(
        data={"sub": "test@example.com"}
    )
    payload = verify_access_token(token)
    
    assert payload is not None
    assert payload['sub'] == "test@example.com"
    
def test_verify_invalid_token():
    """This test verifies if a token is an invalid token"""
    payload = verify_access_token("this.is.not.a.valid.token")
    
    assert payload is None
    
def test_verify_token_without_subject():
    """This checks for a missing subject"""
    token = create_access_token(
        data={"name": "Anathi"}
    )
    payload = verify_access_token(token)
    
    assert payload is None
    
