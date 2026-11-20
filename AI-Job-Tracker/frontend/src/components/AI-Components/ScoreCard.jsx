export default function ScoreCard({ title, value }) {
    const safeValue = Math.max(0, Math.min(100, value || 0));

    return (
        <article className="mock-score-card">
            <span>{title}</span>
            <strong>{safeValue}%</strong>

            <div className="score-progress">
                <div className="score-progress-value" style={{ width: `${safeValue}%`}}></div>
            </div>
        </article>
    )
}