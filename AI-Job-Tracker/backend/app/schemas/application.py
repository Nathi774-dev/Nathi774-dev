from datetime import datetime
from pydantic import BaseModel

from app.models.application import ApplicationStatus

class ApplicationCreate(BaseModel):
    company_name: str
    role: str
    status: ApplicationStatus = ApplicationStatus.APPLIED
    location: str | None = None
    job_url: str | None = None
    notes: str | None = None

class ApplicationUpdate(BaseModel):
    company_name: str | None = None
    role: str | None = None
    status: ApplicationStatus | None = None
    location: str | None = None
    job_url: str | None = None
    notes: str | None = None

class ApplicationResponse(BaseModel):
    id: int
    company_name: str
    role: str
    status: ApplicationStatus
    location: str | None = None
    job_url: str | None = None
    notes: str | None = None
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = {
        "from_attributes": True
    }