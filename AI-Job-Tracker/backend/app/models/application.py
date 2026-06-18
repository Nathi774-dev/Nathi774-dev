# This is where the features are stored in the database
from datetime import datetime
from enum import Enum

from sqlalchemy import Date, DateTime, Enum as SQLEnum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class ApplicationStatus(str, Enum):
    # Statuses for the job application
    WISHLIST = "wishlist"
    APPLIED = "applied"
    INTERVIEW = "interview"
    OFFER = "offer"
    REJECTED = "rejected"

# The main application class
class Application(Base):
    __tablename__ = "applications"
    
    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )
    
    role: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )
    
    status: Mapped[ApplicationStatus] = mapped_column(
        SQLEnum(ApplicationStatus),
        default=ApplicationStatus.APPLIED
    )
    
    # Other column that were necessary and added after the first commit
    location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    job_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    notes: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    # company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    user = relationship("User", back_populates="applications")
    # company = relationship("Company", back_populates="applications")