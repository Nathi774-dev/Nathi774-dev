from datetime import datetime
from pydantic import BaseModel

class DocumentResponse(BaseModel):
    id: int
    filename: str
    file_type: str
    user_id: int
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }