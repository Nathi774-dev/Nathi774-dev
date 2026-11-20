import { BookOpen, Lock, CheckCircle, Play } from "lucide-react";

export default function LessonCard({ lesson, completed, locked, onClick }) {
    return (
        <button
            className={`lesson-card ${locked ? "locked" : ""}`}
            disabled={locked}
            onClick={onClick}
        >
            <div className="lesson">
                {locked ? <Lock /> : completed ? <CheckCircle /> : <BookOpen />}
            </div>
            <div className="lesson-content">
                <span>{lesson.unit}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
            </div>
            <div className="lesson-action">
                {completed ? <CheckCircle /> : <Play />}
            </div>
        </button>
    )
}