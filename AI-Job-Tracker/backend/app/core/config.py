from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BASE_DIR / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str
    TEST_DATABASE_URL: str
    
    GEMINI_API_KEY: str
    
    model_config = {
        "env_file": ENV_FILE,
        "extra": "ignore"
    }
        

settings = Settings()