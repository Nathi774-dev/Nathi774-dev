from pydantic import BaseModel
from pydantic import EmailStr

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    
    model_config = {
        "from_attributes": True
    }