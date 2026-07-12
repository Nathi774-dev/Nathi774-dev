def test_analyze_resume(client, get_auth_headers):
    # Create an authenticated user for the tests
    auth_headers = get_auth_headers
    
    # dummy response to test out the AI response
    response = client.post(f"/ai/analyze-resume/4", headers=auth_headers)
    print(response.json())
    assert response.status_code == 200
    
    assert "score" in response.json()
    assert "strengths" in response.json()
    assert "ats_score" in response.json()