from datetime import datetime
from pydantic import BaseModel, Field

class MaintenanceCreate(BaseModel):
    vehicle_id: int = Field(gt=0)
    maintenance_type: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=1000)
    mileage: int | None = Field(default=None, ge=0)
    
class MaintenanceResponse(BaseModel):
    id: int
    vehicle_id: int
    maintenance_type: str
    description: str | None
    mileage: int | None
    status: str
    scheduled_date: datetime | None
    completed_at: datetime | None
    
    model_config = {"from_attributes": True}
    
class MaintenanceComplete(BaseModel):
    completion_note: str | None = Field(default=None, max_length=1000)
    