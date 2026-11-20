from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
from datetime import datetime

class Route(Base):
    __tablename__ = "route"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    route_number: Mapped[str] = mapped_column(String(50), nullable=False)
    start_location: Mapped[str] = mapped_column(String(255), nullable=False)
    end_location: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)