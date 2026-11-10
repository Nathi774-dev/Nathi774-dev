from fastapi import Header, HTTPException
from app.core import settings

def authenticate_device(device_key: str | None = Header(default=None)):
    if not device_key:
        raise HTTPException(
            status_code=401,
            detail="Device key is not recognized or is missing"
        )
        
    if device_key != settings.device_key:
        raise HTTPException(
            status_code=401,
            detail="Invalid device key"
        )
    return True