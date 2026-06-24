from pydantic import BaseModel
from datetime import datetime

from app.models.interview import InterviewType, InterviewStatus

class InterviewBase(BaseModel):
    title: str
    interview_date: datetime
    interview_type: InterviewType = InterviewType.ONLINE   # Default interview is an online interview
    status: InterviewStatus = InterviewStatus.SCHEDULED    # Automatically schedules an interview
    notes: str | None = None
    
class InterviewCreate(InterviewBase):
    application_id: int

class InterviewResponse(InterviewBase):
    id: int
    application_id: int
    created_at: datetime
    updated_at: datetime
    model_config = {
        "from_attributes": True
    }

class InterviewUpdate(InterviewBase):
    title: str | None = None
    interview_date: datetime | None = None
    interview_type: InterviewType | None = None
    status: InterviewStatus | None = None
    notes: str = None