import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function StatusCard({ stats }) {
    const data = [
        {status: "Wishlist", count: stats.wishlist || 0},
        {status: "Applied", count: stats.applied || 0},
        {status: "Rejected", count: stats.rejected || 0},
        {status: "Offer", count: stats.offer || 0},
        {status: "Interview", count: stats.interview || 0},
    ]

    return (
        <div className="card chart-card">
            <h2 className="section-title">Applications by Status</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}