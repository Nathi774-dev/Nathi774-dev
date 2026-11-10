import logging
import os
from logging.handlers import RotatingFileHandler

LOG_DIR = "../logs"
os.makedirs(LOG_DIR, exist_ok=True)
def setup_logging():
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    app_handler = RotatingFileHandler(
        f"{LOG_DIR}/app.log",
        maxBytes=5_000_000,
        backupCount=5,
        encoding="utf-8"
    )
    
    app_handler.setFormatter(formatter)
    app_handler.setLevel(logging.INFO)
    
    
    schedule_handler = RotatingFileHandler(
        f"{LOG_DIR}/app.log",
        maxBytes=5_000_000,
        backupCount=5,
        encoding="utf-8"
    )
    
    schedule_handler.setFormatter(formatter)
    schedule_handler.setLevel(logging.INFO)
    
    error_handler = RotatingFileHandler(
        f"{LOG_DIR}/error.log",
        maxBytes=5_000_000,
        backupCount=5,
        encoding="utf-8"
    )
    
    error_handler.setFormatter(formatter)
    error_handler.setLevel(logging.ERROR)
    
    root_handler = logging.getLogger()
    root_handler.setLevel(logging.INFO)
    
    if not root_handler.handlers:
        root_handler.addHandler(app_handler)
        root_handler.addHandler(error_handler)
        root_handler.addHandler(schedule_handler)
        
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    
    if not any(isinstance(handler, logging.StreamHandler) for handler in root_handler.handlers):
        root_handler.addHandler(console_handler)
    