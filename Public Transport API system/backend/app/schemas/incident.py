from datetime import datetime
from pydantic import BaseModel, Field

class IncidentCreate(BaseModel):
    incident_type: str = Field(min_length=1, max_length=10)
    severity: str = Field(default="medium", min_length=1, max_length=10)
    vehicle_id: int | None = Field(default=None, gt=0)
    trip_id: int | None = Field(default=None, gt=0)
    description: str = Field(default=None, max_length=1000)
    
class IncidentResponse(BaseModel):
    id: int
    vehicle_id: int | None
    trip_id: int | None
    incident_type: str
    severity: str
    description: str | None
    status: str
    created_at: datetime
    resolved_at: datetime | None
    
    model_config = {"from_attributes": True}
    
class IncidentResolve(BaseModel):
    resolution_note: str | None = Field(default=None, max_length=1000)