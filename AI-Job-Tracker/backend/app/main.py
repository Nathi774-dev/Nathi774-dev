from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, users, applications, dashboard

app = FastAPI(
    title="AI Job Tracker API",
    version="1.0.0"
)

# middleware setup
# all routes have to go through this in order to access data
# from the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"    # The frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# register routes
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(applications.router, prefix="/applications", tags=["Applications"])
app.include_router(users.router, prefix="/users", tags=["Users"])