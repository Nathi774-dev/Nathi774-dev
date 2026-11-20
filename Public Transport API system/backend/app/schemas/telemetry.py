from pydantic import BaseModel, Field
from datetime import datetime

class VehicleTelemetryRequest(BaseModel):
    passenger_count: int = Field(ge=0)
    current_speed: float = Field(ge=0)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-90, le=90)
    status: str | None = None
    
class VehicleTelemetryResponse(BaseModel):
    vehicle_id: int
    vehicle_number: str
    passenger_count: int
    current_speed: float
    latitude: float | None
    longitude: float | None
    status: str
    last_seen: datetime