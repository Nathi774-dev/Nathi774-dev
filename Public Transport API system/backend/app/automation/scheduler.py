from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from app.core import SessionLocal
from app.automation import (
    check_trip_delay, 
    check_vehicle_demand, 
    get_overdue_maintenance,
    get_pending_maintenance,
    get_open_incidents
)
from app.automation.stoppage_detector import check_vehicle_stoppage
import logging

scheduler = BackgroundScheduler()
logger = logging.getLogger(__name__)

def run_automation_cycle():
    db: Session = SessionLocal()
    try:
        logger.info("Running delay detector")
        delayed_incidents = check_trip_delay(db)
        logger.info("delay detector finished")
        if delayed_incidents:
            logger.info(
                f"[AUTOMATION]"
                F"Created {len(delayed_incidents)} delayed incident(s)"
            )        
        
        # check if maintenance is required
        overdue_maintenance = get_overdue_maintenance(db)
        if overdue_maintenance:
            logger.info(
                f"[AUTOMATION]"
                f"{len(overdue_maintenance)} maintenance task(s) overdue."
            )
            
        # check for any maintenace tasks and display on the dashboard
        maintenance_results = get_pending_maintenance(db)
        if maintenance_results:
            logger.warning("[AUTOMATION] Maintenance issues detected: %s", len(maintenance_results))
            
        # check for high passenger demand
        demand_incidents = check_vehicle_demand(db)
        if demand_incidents:
            logger.warning(
                "[AUTOMATION] Created %s high demand incident(s)", len(demand_incidents)
            )
            
        open_incidents = get_open_incidents(db)
        logger.info("[AUTOMATION] Incidents in total: %s", len(open_incidents))
        
        # check for any long unexpected vehicle delay
        delayed_rides = check_vehicle_stoppage(db)
        
        if delayed_rides:
            logger.warning(f"[AUTOMATION] Created {len(delayed_incidents)} stoppage incident(s)")
        
    except Exception as error:
        db.rollback()
        logger.error(
            f"[AUTOMATION]"
            f"Automation error: {error}"
        )
    finally:
        db.close()
        
def start_scheduler():
    if scheduler.running:
        logger.warning("Scheduler is running")
        return
    scheduler.add_job(
        run_automation_cycle,
        trigger="interval",
        minutes=1,
        id="transport_automation",
        replace_existing=True
    )
    
    scheduler.start()
    
def stop_scheduler():
    if not scheduler.running:
        logger.warning("Scheduler has now stopped")
        return
    scheduler.shutdown(wait=False)
    logger.info("[AUTOMATION] Scheduler has now stopped.")