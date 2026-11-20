from datetime import datetime
from pydantic import BaseModel

class InvitationResponse(BaseModel):
    code: str
    company_id: int
    expires_at: datetime