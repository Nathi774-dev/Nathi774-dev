# The test results for the AI Job application tracker

This is the tests folder for the full-stack backend of my app.

---
## Testing
Run tests with:
pytest filename.py
```bash
pytest
by using this command: pytest -v > test_results.txt
And then copying them into a readme file
```
RESULTS:

## First test:

### Authentication
- [ ] User registration
- [X] Duplicate email protection
- [ ] User login
- [ ] JWT Authentication

============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0 -- C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend
configfile: pyproject.toml
plugins: anyio-4.13.0
collecting ... collected 4 items

app/tests/test_auth.py::test_register_user FAILED                        [ 25%]
app/tests/test_auth.py::test_replicate_duplicate_email PASSED            [ 50%]
app/tests/test_auth.py::test_login_user_invalid_password FAILED          [ 75%]
app/tests/test_auth.py::test_login_user_success FAILED                   [100%]

================================== FAILURES ===================================
_____________________________ test_register_user ______________________________

client = <starlette.testclient.TestClient object at 0x0000016219D17590>

    def test_register_user(client):
        response = client.post("/auth/register", json={
            "email": "test@example.com",
            "password": "password123"
        })
    
>       assert response.status_code == 201
E       assert 400 == 201
E        +  where 400 = <Response [400 Bad Request]>.status_code

app\tests\test_auth.py:9: AssertionError
______________________ test_login_user_invalid_password _______________________

client = <starlette.testclient.TestClient object at 0x000001621D314E50>

    def test_login_user_invalid_password(client):
        client.post("/auth/register", json={
            "email": "test@google.com",
            "password": "password0101"
        })
    
        response = client.post("/auth/register", json={
            "email": "test@google.com",
            "password": "wrongpassword"
        })
    
>       assert response.status_code == 401
E       assert 400 == 401
E        +  where 400 = <Response [400 Bad Request]>.status_code

app\tests\test_auth.py:35: AssertionError
___________________________ test_login_user_success ___________________________

client = <starlette.testclient.TestClient object at 0x000001621D2C7790>

    def test_login_user_success(client):
        client.post("/auth/register", json={
            "email": "test@example.com",
            "password": "password"
        })
    
        response = client.post("/auth/register", json={
            "email": "test@example.com",
            "password": "password"
        })
    
>       assert response.status_code == 200
E       assert 400 == 200
E        +  where 400 = <Response [400 Bad Request]>.status_code

app\tests\test_auth.py:48: AssertionError
============================== warnings summary ===============================
.venv\Lib\site-packages\fastapi\testclient.py:1
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Lib\site-packages\fastapi\testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=========================== short test summary info ===========================
FAILED app/tests/test_auth.py::test_register_user - assert 400 == 201
FAILED app/tests/test_auth.py::test_login_user_invalid_password - assert 400 ...
FAILED app/tests/test_auth.py::test_login_user_success - assert 400 == 200
=================== 3 failed, 1 passed, 2 warnings in 3.21s ===================

## Second test

### User registration
- [X] User registration
- [X] Duplicate email protection
- [ ] User login
- [ ] JWT Authentication

============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0 -- C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend
configfile: pyproject.toml
plugins: anyio-4.13.0
collecting ... collected 4 items

app/tests/test_auth.py::test_register_user PASSED                        [ 25%]
app/tests/test_auth.py::test_replicate_duplicate_email PASSED            [ 50%]
app/tests/test_auth.py::test_login_user_invalid_password FAILED          [ 75%]
app/tests/test_auth.py::test_login_user_success FAILED                   [100%]

================================== FAILURES ===================================
______________________ test_login_user_invalid_password _______________________

client = <starlette.testclient.TestClient object at 0x00000189346BCA10>

    def test_login_user_invalid_password(client):
        client.post("/auth/register", json={
            "email": "test@google.com",
            "password": "password0101"
        })
    
        response = client.post("/auth/login", json={
            "email": "test@google.com",
            "password": "wrongpassword"
        })
    
>       assert response.status_code == 401
E       assert 404 == 401
E        +  where 404 = <Response [404 Not Found]>.status_code

app\tests\test_auth.py:36: AssertionError
---------------------------- Captured stdout call -----------------------------
password length:  12
___________________________ test_login_user_success ___________________________

client = <starlette.testclient.TestClient object at 0x0000018934710110>

    def test_login_user_success(client):
        client.post("/auth/register", json={
            "email": "test@example.com",
            "password": "password"
        })
    
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "password"
        })
    
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404 Not Found]>.status_code

app\tests\test_auth.py:49: AssertionError
---------------------------- Captured stdout call -----------------------------
password length:  8
============================== warnings summary ===============================
.venv\Lib\site-packages\fastapi\testclient.py:1
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Lib\site-packages\fastapi\testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=========================== short test summary info ===========================
FAILED app/tests/test_auth.py::test_login_user_invalid_password - assert 404 ...
FAILED app/tests/test_auth.py::test_login_user_success - assert 404 == 200
=================== 2 failed, 2 passed, 2 warnings in 4.91s ===================

## IMPORTANT NOTICE:
My development database job_tracker will be managed by alembic migrations.

## For testing:
- Database: job_tracker_test
- Managed by SQLAlchemy create_all/drop_all
- Alembic must never be run against the test database

Safety:
- Tests fail if TEST_DATABASE_URL does not contain "test"

## Third test
============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0
rootdir: C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend
configfile: pyproject.toml
plugins: anyio-4.13.0
collected 1 item

app\tests\test_auth.py .                                                 [100%]

============================== warnings summary ===============================
.venv\Lib\site-packages\fastapi\testclient.py:1
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Lib\site-packages\fastapi\testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
======================== 1 passed, 2 warnings in 1.08s ========================

- [X] User registration
- [X] Duplicate email protection
- [X] User login
- [X] JWT Authentication

## Now the next test run is for protected routes
## Next step is User Authorization:
- [ ] Get current user
- [ ] JWT Authentication
- [ ] Protected routes

## Fourth Test:

============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0 -- C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Scripts\python.exe
cachedir: .pytest_cache
rootdir: C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend
configfile: pyproject.toml
plugins: anyio-4.13.0
collecting ... collected 9 items

app/tests/test_auth.py::test_register_user PASSED                        [ 11%]
app/tests/test_auth.py::test_replicate_duplicate_email PASSED            [ 22%]
app/tests/test_auth.py::test_login_user_invalid_password PASSED          [ 33%]
app/tests/test_auth.py::test_login_user_success PASSED                   [ 44%]
app/tests/test_auth.py::test_get_current_user_without_token FAILED       [ 55%]
app/tests/test_auth.py::test_get_current_user_with_token FAILED          [ 66%]
app/tests/test_auth.py::test_verify_access_token PASSED                  [ 77%]
app/tests/test_auth.py::test_verify_invalid_token PASSED                 [ 88%]
app/tests/test_auth.py::test_verify_token_without_subject PASSED         [100%]

================================== FAILURES ===================================
_____________________ test_get_current_user_without_token _____________________

client = <starlette.testclient.TestClient object at 0x00000257BEC91850>

    def test_get_current_user_without_token(client):
        """This tests if the api can get the user without the jwt token"""
        response = client.get("/users/me")
>       assert response.status_code == 401     # This should reject the request
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       assert 404 == 401
E        +  where 404 = <Response [404 Not Found]>.status_code

app\tests\test_auth.py:55: AssertionError
______________________ test_get_current_user_with_token _______________________

client = <starlette.testclient.TestClient object at 0x00000257BEC371D0>

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
    
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404 Not Found]>.status_code

app\tests\test_auth.py:71: AssertionError
---------------------------- Captured stdout call -----------------------------
Token created successfully
============================== warnings summary ===============================
.venv\Lib\site-packages\fastapi\testclient.py:1
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\.venv\Lib\site-packages\fastapi\testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\full-stack-project4\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=========================== short test summary info ===========================
FAILED app/tests/test_auth.py::test_get_current_user_without_token - assert 4...
FAILED app/tests/test_auth.py::test_get_current_user_with_token - assert 404 ...
=================== 2 failed, 7 passed, 2 warnings in 5.76s ===================

## My Authorization checklist:
- [X] Get current user
- [X] JWT Authentication
- [X] Protected routes

## Other requirements in the checklist:
- [X] Token creation
- [X] Token verification
- [X] Invalid token handling
- [X] Missing subject validation

## Authentication system
### Completed
- [X] User registration
- [X] Duplicate email validation
- [X] Password hashing with bcrypt
- [X] Login endpoint
- [X] JWT access tokens
- [X] JWT verification
- [X] Protected routes
- [X] Current user dependency

### Tests:

- [X] Register user
- [X] Duplicate email rejected
- [X] Login successful
- [X] Invalid password rejected
- [X] Access protected route without token rejected
- [X] Access protected route with valid token accepted

## Fifth test

### Testing the CRUD operations
- [ ] Successful creation of an application
- [ ] Updating the status of an application (Update)
- [ ] Deleting an application while it's not been reviewed (Delete)
- [ ] Testing routes with applications that have invalid tokens

## Results
============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0
rootdir: C:\Programming\Web-development\full-stack-applications\AI-Job-Tracker\backend
configfile: pyproject.toml
plugins: anyio-4.13.0
collected 1 item

app\tests\test_applications.py .                                         [100%]

============================== warnings summary ===============================
app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\AI-Job-Tracker\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
======================== 1 passed, 1 warning in 1.09s =========================

============================= test session starts =============================
platform win32 -- Python 3.11.6, pytest-9.1.0, pluggy-1.6.0 -- C:\Users\Anathi\AppData\Local\Programs\Python\Python311\python.exe
cachedir: .pytest_cache
rootdir: C:\Programming\Web-development\full-stack-applications\AI-Job-Tracker\backend
configfile: pytest.ini
plugins: anyio-4.13.0
collecting ... collected 6 items

app/tests/test_applications.py::test_create_application PASSED           [ 16%]
app/tests/test_applications.py::test_get_applications PASSED             [ 33%]
app/tests/test_applications.py::test_get_single_application PASSED       [ 50%]
app/tests/test_applications.py::test_update_application PASSED           [ 66%]
app/tests/test_applications.py::test_delete_applications PASSED          [ 83%]
app/tests/test_applications.py::test_create_application_without_token PASSED [100%]

============================== warnings summary ===============================
app\core\config.py:3
  C:\Programming\Web-development\full-stack-applications\AI-Job-Tracker\backend\app\core\config.py:3: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.13/migration/
    class Settings(BaseSettings):

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
======================== 6 passed, 1 warning in 4.99s =========================

## Test results
- [X] Successful creation of an application
- [X] Updating the status of an application (Update)
- [X] Deleting an application while it's not been reviewed (Delete)
- [X] Testing routes with applications that have invalid tokens