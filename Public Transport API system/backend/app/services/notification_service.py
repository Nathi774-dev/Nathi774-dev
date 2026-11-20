def create_notification(user_id: int, title: str, message: str, severity: str = "info"):
    """
    Temporary notification
    Later this can send geniune notifications
    """
    
    return {
        "user_id": user_id,
        "title": title,
        "message": message,
        "severity": severity
    }