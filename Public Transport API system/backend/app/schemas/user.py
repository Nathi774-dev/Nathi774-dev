from typing import Literal
from pydantic import EmailStr, BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    email: EmailStr
    password: str = Field(min_length=3, max_length=128)
    # added new fields for the signup page
    account_type: Literal["business_owner", "employee"]
    company_name: str = Field(min_length=3, max_length=200)
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime
    
    model_config = {"from_attributes": True}
    
class UserFullResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
    
class UserUpdate(BaseModel):
    username: str | None = Field(min_length=3, max_length=50, default=None)