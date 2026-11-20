import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

export default function StatusPieChart({ stats }) {
    const data = [
        {name: "Wishlist", value: stats.wishlist || 0, color: "#f59e0b"},
        {name: "Applied", value: stats.applied || 0, color: "#3b82f6"},
        {name: "Interview", value: stats.interview || 0, color: "#8b5cf6"},
        {name: "Offer", value: stats.offer || 0, color: "#10b981"},
        {name: "Rejected", value: stats.rejected || 0, color: "#ef4444"}
    ].filter(item => item.value > 0);

    if (data.length === 0) {
        return (
            <div className="card">
                <h2>Status Distribution</h2>
                <p>No applications data available yet...</p>
            </div>
        )
    } else {
        return (
            <div className="card chart-card">
                <h2 className="section-title">Status Distribution</h2>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={({ name }) => name}
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}