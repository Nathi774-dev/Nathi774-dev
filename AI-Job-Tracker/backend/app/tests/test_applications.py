# These tests are for the job application process
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
    
# the tests start here
def test_create_application(client):
    headers = get_auth_headers(client)
    response = client.post("/applications", json={
        "company_name": "Google",
        "role": "Software Developer",
        "status": "applied",
        "location": "Remote",
        "job_url": "https://example.com/job",
        "notes": "Dream job"
    }, headers=headers)
    
    assert response.status_code == 201
    data = response.json()
    
    assert data["company_name"] == "Google"
    assert data["role"] == "Software Developer"
    
def test_get_applications(client):
    headers = get_auth_headers(client)
    client.post("/applications", json={
        "company_name": "Microsoft",
        "status": "offer",
        "role": "Data Scientist"
    }, headers=headers)
    
    response = client.get("/applications", headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    
def test_get_single_application(client):
    headers = get_auth_headers(client)
    
    create_response = client.post("/applications", json={
        "company_name": "Amazon AWS",
        "role": "Cloud Engineer",
        "status": "applied"
    }, headers=headers)
    
    application_id = create_response.json()["id"]
    response = client.get(f"/applications/{application_id}", headers=headers)
    
    assert response.status_code == 200
    assert response.json()["role"] == "Cloud Engineer"
    
def test_update_application(client):
    headers = get_auth_headers(client)
    
    create_response = client.post("/applications", json={
        "company_name": "Oracle",
        "role": "Database Manager",
        "status": "wishlist"
    }, headers=headers)
    
    
    application_id = create_response.json()["id"]
    updated_response = client.patch(f"/applications/{application_id}", json={
        "status": "interview"
    }, headers=headers)
    
    assert updated_response.status_code == 200
    assert updated_response.json()["status"] == "interview"
    
def test_delete_applications(client):
    headers = get_auth_headers(client)
    create_response = client.post("/applications", json={
        "company_name": "Codecademy",
        "status": "applied",
        "role": "Full-Stack Engineer"
    }, headers=headers)
    
    application_id = create_response.json()["id"]
    delete_response = client.delete(f"/applications/{application_id}", headers=headers)
    
    assert delete_response.status_code == 204
    
    get_response = client.get(f"/applications/{application_id}", headers=headers)
    assert get_response.status_code == 404
    
def test_create_application_without_token(client):
    response = client.post("/applications", json={
        "company_name": "Samsung",
        "status": "interview",
        "role": "Software Engineer"
    })
    
    assert response.status_code == 401     # Invalid request because the user isn't authorized