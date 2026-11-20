import secrets
import hashlib
from datetime import datetime, timedelta
from app.models import Invitation, Company

def generate_invitation_code():
    return secrets.token_urlsafe(24).upper()

def hash_invitation_code(code: str):
    return hashlib.sha256(code.encode()).hexdigest()

def create_invitation_code(db, company_id):
    """Creates an invitation a single-use code that's valid for 7 days"""
    
    code = generate_invitation_code()
    
    # Find the company by filtering in order to get the company id
    company = db.query(Company).filter(company_id == Company.id).first()
    
    invitation = Invitation(
        code_hash=hash_invitation_code(code),
        company_id=company.id,
        expires_at=datetime.utcnow() + timedelta(days=7)
    )
    
    try:
        db.add(invitation)
        db.commit()
        db.refresh(invitation)
        
        return {
            "code": code,
            "expires_at": invitation.expires_at,
            "invitation_id": invitation.id,
            "company_id": company.id
        }
    except Exception:
        db.rollback()
        raise