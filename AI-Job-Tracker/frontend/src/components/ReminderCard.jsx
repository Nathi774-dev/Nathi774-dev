import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ReminderCard() {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        async function getReminders() {
            const res = await api.get("/reminders");
            setReminders(res.data);
        }
        getReminders();
    }, []);

    return (
        <section className="card section">
            <h2 className="section-title">Upcoming reminders</h2>
            {reminders.length === 0 ? (
                <div className="empty-state">No reminders at this moment.</div>
            ) : (
                <div className="reminder-list">
                    {reminders.map((reminder, idx) => (
                        <div className="reminder-item" key={idx}>
                            <strong>{reminder.title}</strong>
                            <p>{reminder.message}</p>
                            <small>{new Date(reminder.reminder_date).toLocaleString()}</small>
                            <span className={`interview-type ${reminder.interview_type}`}>
                                {reminder.interview_type}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}