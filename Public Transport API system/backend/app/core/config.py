from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Public Transport AI"
    app_version: str = "1.0.0"
    debug: bool = True
    database_url: str
    security_key: str
    access_token_expire_minutes: int = 30
    llm_api_key: str | None = None
    llm_model: str = "gpt-5.6-luna"
    device_key: str
    ai_mode: str = "mock"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )
    
settings = Settings()