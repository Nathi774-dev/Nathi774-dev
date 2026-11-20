import bcrypt
from app.services.user_service import get_user_by_email, create_user
from fastapi import HTTPException
from app.models import Company

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode("utf-8")

def verify_password(password: str, password_hash: str) -> bool:
    password_bytes = password.encode("utf-8")
    hashed_pw_bytes = password_hash.encode("utf-8")
    return bcrypt.checkpw(password_bytes, hashed_pw_bytes)

def register_user(
    db, 
    username: str, 
    email: str, 
    password: str,
    account_type: str,
    company_name: str
):
    existing_user = get_user_by_email(db, email)
    if existing_user:
        raise HTTPException(status_code=409, detail="This username is already taken.")
    
    try:
        if account_type == "business_owner":
            if get_user_by_email(db, username):
                raise HTTPException(status_code=409, detail="This username already exists")
            password_hash = hash_password(password)
            user = create_user(
                db,
                username,
                email,
                password_hash,
                company_name,
                account_type,
                role="company_admin"
            )
            
            company = Company(name=company_name, owner_id=user.id)
            
            db.add(company)
            db.flush()
            
            user.company_id = company.id
            
            db.commit()
            db.refresh(user)
            return user
        raise ValueError("Employee registration requires an invitation code")
    except Exception:
        db.rollback()
        raise
    
def authenticate_user(db, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    
    if not verify_password(password, user.password_hash):
        return None
    
    if not user.is_active:
        return None
    
    return user