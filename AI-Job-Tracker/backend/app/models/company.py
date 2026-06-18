from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.application import Application

class Company(Base):
    __tablename__ = "companies"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    company_name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    website: Mapped[str | None] = mapped_column(String(500), nullable=True)
    # applications: Mapped[list["Application"]] = relationship(back_populates="company")