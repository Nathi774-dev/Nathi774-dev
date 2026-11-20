from datetime import datetime, timezone
from pydantic import BaseModel, Field

class VehicleCreate(BaseModel):
    vehicle_number: str = Field(min_length=1)
    vehicle_type: str
    capacity: int = Field(gt=0)
    
class VehicleTelemetry(BaseModel):
    vehicle_number: str
    passenger_count: int = Field(ge=0)
    current_speed: float = Field(ge=0)
    latitude: float = Field(ge=-1000, le=1000)
    longitude: float = Field(ge=-1000, le=1000)
    status: str
    created_at: datetime | None = datetime.now(timezone.utc)
    
class VehicleTelemetryHistoryResponse(BaseModel):
    id: int
    vehicle_id: int
    passenger_count: int 
    current_speed: float
    latitude: float
    longitude: float
    status: str
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }
    
    
class VehicleUpdate(BaseModel):
    vehicle_type: str | None = None
    capacity: int = Field(default=None, gt=0)
    status: str | None = None
    
class VehicleResponse(BaseModel):
    id: int
    vehicle_number: str
    vehicle_type: str
    capacity: int
    passenger_count: int
    current_speed: float
    latitude: float | None
    longitude: float | None
    status: str
    
    model_config = {
        "from_attributes": True
    }