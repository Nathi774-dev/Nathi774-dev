# this tests that users can search applications with filtering
import time

def create_application(client, get_auth_headers, company_name, role, status="applied"):
    """This function is needed to test filters with an application"""
    return client.post("/applications", json={
        "company_name": company_name,
        "role": role,
        "status": status
    }, headers=get_auth_headers)

def test_search_by_company(client, get_auth_headers):
    
    create_application(client, get_auth_headers, "Microsoft", "Software Engineer", "rejected")
    create_application(client, get_auth_headers, "Amazon", "Cloud Developer", "interview")
    
    response_1 = client.get("/applications?search=goo", headers=get_auth_headers)
    response_2 = client.get("/applications?search=mic", headers=get_auth_headers)
    
    assert response_1.status_code == 200       # It will show an empty page
    assert response_2.status_code == 200
    
    data_2 = response_2.json()
    assert len(data_2) == 1
    assert data_2[0]["company_name"] == "Microsoft"

def test_paginate_applications(client, get_auth_headers):
    
    for i in range(15):
        create_application(client, get_auth_headers, f"Company {i}", "Developer", "applied")
    response = client.get("/applications?page1&limit=10", headers=get_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 10
    
def test_second_page_applications(client, get_auth_headers):
    
    for i in range(15):
        create_application(client, get_auth_headers, f"Company {i}", "Developer", "applied")
    response = client.get("/applications?page2&limit=10", headers=get_auth_headers)
    data = response.json()
    
    assert response.status_code == 200
    assert len(data) == 10        # the second page would have 5 items since page 1 has 10

def test_search_by_status(client, get_auth_headers):

    create_application(client, get_auth_headers, "Google", "Back-End Engineer")
    create_application(client, get_auth_headers, "Rock Star Games", "Game Developer")
    create_application(client, get_auth_headers, "Meta", "Marketing Manager", "wishlist")
    
    response = client.get("/applications?status=applied", headers=get_auth_headers)
    assert response.status_code == 200
    data = response.json()
    
    assert len(data) == 2
    assert data[0]["status"] == "applied"
    
def test_search_by_created_date(client, get_auth_headers):
    create_application(client, get_auth_headers, "Apple iOS", "Developer")
    # Ensure different timestamps
    time.sleep(2)
    create_application(client, get_auth_headers, "Google", "Developer", status="wishlist")
    
    response = client.get("/applications?sort=newest", headers=get_auth_headers)
    data = response.json()
    assert response.status_code == 200
    assert data[0]["company_name"] == "Google"