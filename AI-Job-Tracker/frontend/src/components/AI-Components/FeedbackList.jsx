export default function FeedbackList({ title, items = [] }) {
    return (
        <div className="feedback-section">
            <h3>{title}</h3>
            {items.length === 0 ? (
                <p>No feedback available</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={`${title}-${index}`}></li>
                    ))}
                </ul>
            )}
        </div>
    )
}