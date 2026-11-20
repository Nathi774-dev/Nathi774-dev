# This is where all the authentication routes are placed
# The application will start here and send data here as well as recieve it
# This data is then sent to the frontend for the user
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import UserRegister, UserLogin
from app.schemas.user import UserResponse
from app.schemas.auth import TokenResponse
from app.services.auth_service import AuthService


router = APIRouter()       # the router instance

# the register router
@router.post("/register", response_model=UserResponse, status_code=201)
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    try:
        return AuthService.register_user(
            db, user_data.email, user_data.password
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))  # We use status codes of 400 for invalid or incorrect requests

# the login route
@router.post("/login", response_model=TokenResponse, status_code=200)
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    try:
        return AuthService.login_user(
            db, user_data.email, user_data.password
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    