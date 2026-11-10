from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.core import settings

ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Returns the encoded access token, basically encryption"""    

    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.security_key, ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> dict | None:
    """Decodes the encrypted access token"""
    try:
        payload = jwt.decode(token, settings.security_key, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    