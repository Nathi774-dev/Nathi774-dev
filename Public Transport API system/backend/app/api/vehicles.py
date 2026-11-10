from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import get_db, require_admin, require_operator, authenticate_device
from app.schemas import VehicleCreate, VehicleResponse, VehicleTelemetry, VehicleTelemetryHistoryResponse
from app.services import (
    create_vehicle,
    get_vehicle,
    get_vehicle_by_number,
    get_all_vehicles, 
    update_vehicle_telemetry,
    get_vehicle_telemetry_history
)
from app.models import User

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

@router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
def create_new_vehicle(
    vehicle_data: VehicleCreate, 
    db: Session = Depends(get_db), 
    current_admin: User = Depends(require_admin)
):
    existing_vehicle = get_vehicle_by_number(db, vehicle_data.vehicle_number)
    if existing_vehicle:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A vehicle with this number already exists")
    vehicle = create_vehicle(
        db,
        vehicle_data.vehicle_number,
        vehicle_data.vehicle_type,
        vehicle_data.capacity
    )
    
    return vehicle

@router.get("/", response_model=list[VehicleResponse], status_code=status.HTTP_200_OK)
def read_all_vehicles(
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    return get_all_vehicles(db)

@router.get("/{vehicle_id}", response_model=VehicleResponse, status_code=status.HTTP_200_OK)
def read_vehicle(
    vehicle_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    vehicle = get_vehicle(db, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    
    return vehicle

@router.get("/number/{vehicle_number}", response_model=VehicleResponse, status_code=status.HTTP_200_OK)
def read_vehicle_by_number(
    vehicle_number: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(require_operator)
):
    vehicle = get_vehicle_by_number(db, vehicle_number)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    return vehicle

@router.post("/telemetry", response_model=VehicleResponse)
def recieve_vehicle_telemetry(
    telemetry: VehicleTelemetry, 
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    vehicle = get_vehicle_by_number(db, telemetry.vehicle_number)
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found.")
    updated_vehicle = update_vehicle_telemetry(
        db=db, 
        vehicle_id=vehicle.id,
        passenger_count=telemetry.passenger_count,
        current_speed=telemetry.current_speed,
        latitude=telemetry.latitude,
        longitude=telemetry.longitude,
        status=telemetry.status
    )
    
    return updated_vehicle
    
@router.get("/telemetry/{vehicle_id}/history", response_model=list[VehicleTelemetryHistoryResponse])
def read_vehicle_history(
    vehicle_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_operator)
):
    history = get_vehicle_telemetry_history(db, vehicle_id)
    if not history:
        raise HTTPException(status_code=404, detail="Vehicle history is not found.")
    return history or []

@router.post("/device-telemetry", response_model=VehicleResponse)
def respond_to_device_telemetry(
    telemetry: VehicleTelemetry,
    db: Session = Depends(get_db),
    _: bool = Depends(authenticate_device)
):
    vehicle = get_vehicle_by_number(db, telemetry.vehicle_number)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found.")
    updated_vehicle = update_vehicle_telemetry(
        db,
        vehicle.id,
        telemetry.passenger_count,
        telemetry.current_speed,
        telemetry.latitude,
        telemetry.longitude,
        telemetry.status
    )
    
    return updated_vehicle