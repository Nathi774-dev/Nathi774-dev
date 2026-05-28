from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class StoryTaskBase(BaseModel):
    theme: str
    
class StoryTaskResponse(BaseModel):
    task_id: str
    status: str
    created_at: datetime
    story_id: Optional[int] = None
    completed_at: Optional[datetime] = None
    error: Optional[str] = None
    
class StoryTaskCreate(StoryTaskBase):
    pass