import StatusCard from "../components/StatusChart";
import StatCard from "../components/Dashboard/StatsBar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import StatusPieChart from "../components/StatusPieChart";
import ReminderCard from "../components/ReminderCard";

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
        wishlist: 0
    });

    useEffect(() => {
        async function fetchStats() {
            const res = await api.get("/dashboard/stats");
            setStats(res.data);
        }

        fetchStats();
    }, []);

    return (
        <main className="app-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">
                        Tracker your job search progress in one place.
                    </p>
                </header>

                <section className="grid grid-4">
                    <StatCard title="Offers" value={stats.offer} />
                    <StatCard title="Applied" value={stats.applied} />
                    <StatCard title="Interview" value={stats.interview} />
                    <StatCard title="Total" value={stats.total} />
                    <StatCard title="Wishlist" value={stats.wishlist} />
                    <StatCard title="Rejected" value={stats.rejected} />
                </section>
                {/* The graph layout underneath the stat cards */}
                <StatusCard stats={stats} />
                <StatusPieChart stats={stats} />

                {/* Reminders for job applications and interviews */}
                <ReminderCard />

                <section className="section card">
                    <h2 className="section-title">
                        Recent Applications
                    </h2>
                    <div className="empty-state">
                        No applications yet. Create your first one soon.
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Dashboard;