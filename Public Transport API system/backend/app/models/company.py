from app.models import Base
from sqlalchemy import ForeignKey, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class Company(Base):
    __tablename__ = "company"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[int] = mapped_column(String(255), nullable=False)
    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)