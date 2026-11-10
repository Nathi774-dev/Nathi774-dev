from pydantic import BaseModel, Field

class RouteCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    route_number: str = Field(min_length=1, max_length=50)
    start_location: str = Field(min_length=1, max_length=150)
    end_location: str = Field(min_length=1, max_length=150),
    status: str = Field(min_length=3, max_length=20, default="inactive")
    
class RouteUpdate(BaseModel):
    name: str | None = None
    route_number: str | None = None
    start_location: str | None = None
    end_location: str | None = None
    status: str | None = None
    
class RouteResponse(BaseModel):
    id: int
    name: str
    route_number: str
    start_location: str
    end_location: str
    status: str
    
    model_config = {"from_attributes": True}