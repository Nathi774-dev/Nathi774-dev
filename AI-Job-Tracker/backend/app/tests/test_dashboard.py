# This test is for the dashboard stats

def get_auth_headers(client):
    client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "password12345"
    })
    
    login_response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password12345"
    })
    
    token = login_response.json()["access_token"]
    return {
        "Authorization": f"Bearer {token}"
    }

def test_dashboard_stats(client):
    headers = get_auth_headers(client)
    
    statuses = [
        "wishlist",
        "applied",
        "interview",
        "applied",
        "offer",
        "rejected"
    ]
    for status in statuses:
        client.post("/applications", json={
            "company_name": "Test Company",
            "role": "Developer",
            "status": status
        }, headers=headers)
    response = client.get("/dashboard/stats", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    
    # Test the dashboard itself
    assert data["total"] == 6
    assert data["applied"] == 2
    assert data["rejected"] == 1