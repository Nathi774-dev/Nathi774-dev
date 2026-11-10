from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.user import User

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)

def get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return db.scalar(statement)

def get_user_by_username(db: Session, username: str) -> User | None:
    selected_name = select(User).where(User.username == username)
    return db.scalar(selected_name)

def create_user(
    db: Session, 
    username: str, 
    email: str, 
    password_hash: str, 
    company_name: str,
    account_type: str,
    company_id: int | None = None,
    role: str = "operator"
) -> User:
    user = User(
        username=username, 
        email=email, 
        password_hash=password_hash, 
        role=role,
        company_name=company_name,
        account_type=account_type,
        company_id=company_id
    )
    
    db.add(user)
    db.flush()
    
    return user    

def get_all_users(db: Session) -> list[User]:
    users = select(User)
    return list(db.scalars(users).all())

def deactivate_user(db: Session, user_id: int) -> User:
    user = db.get(User, user_id)
    if not user:
         return None
    user.is_active = False
    db.commit()
    db.refresh(user)
    
    return user

def update_user(
    db: Session, 
    user_id: int, 
    username: str | None = None, 
    email: str | None = None
) -> User | None:
    user = db.get(User, user_id)
    if not user:
        return None
    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    
    db.commit()
    db.refresh(user)
    return user

