from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.jwt import verify_access_token
from app.repos.user_repository import UserRepository


Oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_current_user(token: str = Depends(Oauth2_scheme), db: Session = Depends(get_db)):
    """This validates if this user is the correct user through Authentication"""
    payload = verify_access_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    email = payload.get("sub")
    
    user = UserRepository.get_by_email(db, email)
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
        
    return user