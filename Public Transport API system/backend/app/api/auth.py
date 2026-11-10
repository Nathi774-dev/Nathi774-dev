from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, settings, get_current_user, create_access_token
from app.models import User
from app.schemas import UserCreate, UserLogin, UserResponse, UserFullResponse
from app.services import authenticate_user, register_user


router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserFullResponse, status_code=status.HTTP_201_CREATED)
def signup_user(data: UserCreate, db: Session = Depends(get_db)):
    try:
        user = register_user(
            db, 
            data.username, 
            data.email, 
            data.password,
            data.account_type,
            data.company_name
        )
        
        # an access token that allows the user to use their profile
        access_token = create_access_token(
            {"sub": str(user.id)}, 
            timedelta(minutes=settings.access_token_expire_minutes)
        )
        
        return {
            "access_token": access_token,
            "token_bearer": "bearer",
            "user": user
        }
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))
    
@router.post("/login")
def login_user(data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = create_access_token(data={
        "sub": str(user.id),
        "role": user.role
    }, expires_delta=timedelta(minutes=settings.access_token_expire_minutes))
    
    return {
        "access_token": access_token,
        "token_bearer": "bearer",
        "user": user
    }
    
@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user