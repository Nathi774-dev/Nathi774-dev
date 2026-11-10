# for vehicle capacity and passenger limitations
def get_severity(occupancy: float) -> str:
    """Determines incident severity based on passenger severity"""
    if occupancy >= 100:
        return "high"
    
    if occupancy >= 95:
        return "high"
    
    if occupancy >= 80:
        return "medium"
    
    return "low"

# for unexpected vehicle delay
def get_stoppage_severity(minutes_stopped: int) -> str:
    """Determines severity based on how low a vehicle has been stationary"""
    if minutes_stopped >= 20:
        return "critical"
    
    if minutes_stopped >= 10:
        return "high"
    
    if minutes_stopped >= 5:
        return "medium"
    
    return "low"

# this is for trip delay
def get_trip_delay_severity(minutes_delayed: int) -> str:
    """Determines the severity based on how long a scheduled trip has been delayed"""
    if minutes_delayed >= 30:
        return "critical"
    
    if minutes_delayed >= 20:
        return "high",
    
    if minutes_delayed >= 10:
        return "medium"
    
    return "low"