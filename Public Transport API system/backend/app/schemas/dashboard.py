from datetime import datetime
from pydantic import BaseModel

# Data that has already happened and stored for later purpose
class VehicleDashboardStats(BaseModel):
    total: int
    active: int
    inactive: int
    maintenance: int
    
class TripDashboardStats(BaseModel):
    active: int
    scheduled: int
    completed: int
    
class IncidentDashboardStats(BaseModel):
    is_open: int
    resolved: int
    
class MaintenanceDashboardStats(BaseModel):
    pending: int
    
class DashboardOverviewResponse(BaseModel):
    vehicles: VehicleDashboardStats
    trips: TripDashboardStats
    maintenances: MaintenanceDashboardStats
    incidents: IncidentDashboardStats
    
# Responses to handle data that is live
class LiveVehicleResponse(BaseModel):
    id: int
    vehicle_number: str
    vehicle_type: str
    capacity: int
    passenger_count: int
    current_speed: float
    latitude: float
    longitude: float
    status: str
    last_seen: datetime | None
    
    model_config = {
        "from_attributes": True
    }
    
class LiveTripResponse(BaseModel):
    id: int
    vehicle_id: int
    route_id: int
    scheduled_start: datetime | None
    actual_start: datetime | None
    scheduled_end: datetime | None
    actual_end: datetime | None
    status: str
    
    model_config = {
        "from_attributes": True
    }

class LiveIncidentResponse(BaseModel):
    id: int
    vehicle_id: int
    trip_id: int
    incident_type: str
    severity: str
    description: str
    status: str
    created_at: datetime | None
    resolved_at: datetime | None
    
    model_config = {
        "from_attributes": True
    }

class PendingMaintenanceResponse(BaseModel):
    id: int
    vehicle_id: int
    maintenance_type: str
    mileage: int | None
    description: str
    scheduled_date: datetime | None
    completed_at: datetime | None
    status: str

    model_config = {
        "from_attributes": True
    }