import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api/axios";

const locales = {};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchInterviews() {
            const res = await api.get("/interviews");
            const calendarEvents = res.data.map((interview) => ({
                id: interview.id,
                title: interview.title,
                start: new Date(interview.interview_date),
                end: new Date(interview.interview_date),
                resource: interview
            }));
            setEvents(calendarEvents);
        }
        fetchInterviews();
    }, []);

    return (
        <main className="app-page">
            <div className="container">
                <header className="app-header">
                    <h1 className="page-title">Calendar</h1>
                    <p className="page-subtitle">
                        View your interviews and upcoming deadlines.
                    </p>
                </header>

                <section className="card calendar-card">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 800 }}
                    />
                </section>
            </div>
        </main>
    )
}

export default CalendarPage;