from datetime import datetime
from pydantic import BaseModel, Field

class TripCreate(BaseModel):
    vehicle_id: int = Field(gt=0)
    route_id: int = Field(gt=0)
    scheduled_start: datetime
    scheduled_end: datetime | None = None,
    status: str = Field(min_length=3, max_length=20)
    
class TripResponse(BaseModel):
    id: int
    vehicle_id: int
    route_id: int
    scheduled_start: datetime
    actual_start: datetime | None = None
    scheduled_end: datetime | None = None
    actual_end: datetime | None = None
    status: str
    
    model_config = {"from_attributes": True}
    
class TripActionResponse(BaseModel):
    message: str
    trip: TripResponse