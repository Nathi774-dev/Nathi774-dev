from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin, require_operator
from app.schemas import MaintenanceCreate, MaintenanceResponse
from app.services import (
    create_maintenance_task,
    get_pending_tasks,
    get_vehicle_maintenance,
    complete_maintenance,
    get_vehicle,
    get_maintenance_task
)
from app.models import User

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

router.post("/", response_model=MaintenanceResponse, status_code=status.HTTP_201_CREATED)
def create_task(data: MaintenanceCreate, db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    vehicle = get_vehicle(db, data.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    
    return create_maintenance_task(
        db,
        vehicle.id,
        data.maintenance_type,
        data.description,
        data.mileage
    )
    
@router.get('/', response_model=list[MaintenanceResponse], status_code=status.HTTP_200_OK)
def read_all_tasks(db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    return get_pending_tasks(db)


@router.get("/vehicles/{vehicle_id}", response_model=list[MaintenanceResponse])
def read_vehicle_maintenance(vehicle_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    vehicle = get_vehicle(db, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    return get_vehicle_maintenance(db, vehicle_id)

@router.get('/{maintenance_id}', response_model=MaintenanceResponse, status_code=status.HTTP_200_OK)
def read_task(maintenance_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_operator)):
    task = get_maintenance_task(db, maintenance_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    return task

@router.post("/{maintenance_id}/complete", response_model=MaintenanceResponse)
def complete_existing_task(maintenance_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    maintenance = complete_maintenance(db, maintenance_id)
    if not maintenance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task is not found.")
    return maintenance