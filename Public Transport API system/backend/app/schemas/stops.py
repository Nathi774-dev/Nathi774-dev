from pydantic import BaseModel, Field

class StopCreate(BaseModel):
    route_id: int = Field(gt=0)
    name: str = Field(min_length=3, max_length=128)
    stop_order: int = Field(gt=0)
    latutide: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-100, le=100)
    
class StopResponse(BaseModel):
    id: int
    route_id: int
    name: str
    stop_order: int
    latitude: float | None
    longitude: float | None
    
    model_config = {"from_attributes": True}
    