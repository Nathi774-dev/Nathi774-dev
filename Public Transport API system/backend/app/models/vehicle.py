from sqlalchemy import Integer, String, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
from datetime import datetime

class Vehicle(Base):
    __tablename__ = "vehicles"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    vehicle_number: Mapped[int] = mapped_column(String(50), unique=True, nullable=True, index=True)
    vehicle_type: Mapped[str] = mapped_column(String(100), nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    passenger_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    current_speed: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    last_seen: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)