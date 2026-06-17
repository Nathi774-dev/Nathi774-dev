from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str
    TEST_DATABASE_URL: str
    
    CLAUDE_API_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()