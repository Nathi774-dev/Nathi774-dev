import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
import uuid

from app.models.interview import Interview
from app.models.user import User
from app.models.company import Company
from app.models.application import Application
from app.core.database import Base, get_db
from app.main import app
from app.core.config import settings

TEST_DATABASE_URL = settings.TEST_DATABASE_URL
if "test" not in TEST_DATABASE_URL.lower():
    raise RuntimeError("Tests are pointing at a non-test database.") 
engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

# Create tables before test run
@pytest.fixture(scope="session", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine) 
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    
# override the get_db dependency
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
   
@pytest.fixture
def get_auth_headers(client):
    email = f"test_{uuid.uuid4()}@example.com"
    
    register_response = client.post("/auth/register", json={
        "email": email,
        "password": 'password12345'
    })
    
    assert register_response.status_code == 201
    
    login_response = client.post("/auth/login", json={
      "email": email,
      "password": "password12345"  
    })
    
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
# for testing purposes
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    return TestClient(app)

# So that the test database works with a new entry
# to prevent test data leaks
@pytest.fixture(autouse=True)
def clean_database():
    db = TestingSessionLocal()
    # This makes sure that the applications table is deleted before the users table
    for table in reversed(Base.metadata.sorted_tables):
        db.execute(table.delete())
    db.commit()
    yield
    
    for table in reversed(Base.metadata.sorted_tables):
        db.execute(table.delete())
    db.commit()
    db.close()