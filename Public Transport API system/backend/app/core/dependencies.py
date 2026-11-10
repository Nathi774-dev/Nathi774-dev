from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core import (
    create_access_token, 
    decode_access_token,
    get_db
)
from app.services import user_service, get_user_by_id
from app.models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token is invalid or expired.", 
            headers={"WWW-Authenticate": "Bearer"}
        )
    user_id = payload.get("sub")
    
    if not user_id: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid token.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")
    
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found.")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account of user is not active")
    
    return user
    
def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required.")
    return current_user

def require_operator(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["operator", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="At least Operator status is required.")
    return current_user

def require_company_admin(current_user: User = Depends(get_current_user)):
    if (current_user.role != "company_admin") or (current_user.account_type != "business_owner"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Only Company admins can perform this action"
        )
    return current_user