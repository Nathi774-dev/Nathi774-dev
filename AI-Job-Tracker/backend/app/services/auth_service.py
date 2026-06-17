from sqlalchemy.orm import Session
from app.core.security import hash_password, verify_password
from app.repos.user_repository import UserRepository
from app.core.jwt import create_access_token

class AuthService:
    @staticmethod
    def register_user(db: Session, email: str, password: str):
        existing_user = UserRepository.get_by_email(db, email)
        if existing_user:
            raise ValueError("Email already registered")
        password_hash = hash_password(password)
        return UserRepository.create(db, email, password_hash)
    
    @staticmethod
    def login_user(db: Session, email: str, password: str):
        user = UserRepository.get_by_email(db, email)
        if not user:
            raise ValueError("User does not exist")
        if not verify_password(password, user.password_hash):
            raise ValueError("Password is incorrect")
        try:
            token = create_access_token(
                data={"sub": user.email}
            )
            print("Token created successfully")
        except Exception as e:
            print("JWT ERROR: ", repr(e))
        return {
            "access_token": token,
            "token_type": "bearer"
        }