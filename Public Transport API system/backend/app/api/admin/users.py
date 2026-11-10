from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin
from app.models import User
from app.schemas import UserUpdate, UserResponse
from app.services import get_user_by_id, get_all_users, update_user


router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db), current_admin: User = Depends(require_admin)):
    return get_all_users(db)

@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_single_user(
    user_id: int, 
    db: Session = Depends(get_db), 
    current_admin: User = Depends(require_admin)
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return user

@router.patch("/{user_id}", response_model=UserResponse)
def update_current_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):
    user = update_user(db, user_id, current_admin.username, current_admin.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return user

