from datetime import datetime
from pydantic import BaseModel

class ReminderResponse(BaseModel):
    type: str
    title: str
    reminder_date: datetime
    message: str
    
    model_config = {
        "from_attributes": True
    }