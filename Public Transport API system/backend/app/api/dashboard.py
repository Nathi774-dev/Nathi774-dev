from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.core import get_db, require_operator
from app.schemas import (
    DashboardOverviewResponse, 
    LiveVehicleResponse,
    LiveIncidentResponse,
    PendingMaintenanceResponse,
    LiveTripResponse
)
from app.models import User
from app.services import (
    get_dashboard_overview, 
    get_live_vehicle_updates,
    get_live_incidents,
    get_live_trips,
    pending_maintenances
)


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/overview", response_model=DashboardOverviewResponse, status_code=status.HTTP_200_OK)
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    return get_dashboard_overview(db)

@router.get("/vehicles", response_model=list[LiveVehicleResponse], status_code=status.HTTP_200_OK)
def get_vehicle_updates(
    status: str | None = Query(default=None),
    vehicle_number: str | None = Query(default=None),
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    return get_live_vehicle_updates(db, status, vehicle_number)

@router.get("/trips/live", response_model=list[LiveTripResponse])
def get_active_trips(
    route_id: int | None = Query(default=None),
    vehicle_id: int | None = Query(default=None),
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    return get_live_trips(db, route_id, vehicle_id)

@router.get("/incidents/active", response_model=list[LiveIncidentResponse])
def get_open_incidents(
    vehicle_id: int | None = Query(default=None),
    severity: str | None = Query(default=None),
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    return get_live_incidents(db, vehicle_id, severity)

@router.get("/maintenance/pending", response_model=list[PendingMaintenanceResponse])
def get_pending_tasks(
    vehicle_id: int | None = Query(default=None),
    maintenance_type: str | None = Query(default=None),
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    return pending_maintenances(db, vehicle_id, maintenance_type)
