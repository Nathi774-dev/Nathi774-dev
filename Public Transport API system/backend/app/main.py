from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    vehicles,
    routes,
    incidents,
    stops,
    maintenance,
    trips,
    auth,
    dashboard,
    ai,
    telemetry,
    invitation,
    usage,
    billing,
    users
) 
from app.core import setup_logging
from app.automation import start_scheduler, stop_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield
    stop_scheduler()

setup_logging()

app = FastAPI(
    title="Public Transport API",
    description="An AI powered automation system for public transportation",
    version="1.0.0",
    lifespan=lifespan
)

# API routers
app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(telemetry.router)
app.include_router(dashboard.router)
app.include_router(users.router)
app.include_router(vehicles.router)
app.include_router(maintenance.router)
app.include_router(routes.router)
app.include_router(trips.router)
app.include_router(incidents.router)
app.include_router(stops.router)

# admin routes
app.include_router(usage.router)
app.include_router(billing.router)
app.include_router(invitation.router)   # It's not for platform admins though, just for company owners

# CORS middleware to prevent CORS policy restrictions
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "Welcome to the home page"}

@app.get("/health")
def health_check():
    return {"message": "This backend is healthy."}