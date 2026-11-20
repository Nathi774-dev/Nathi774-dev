import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export default function Quiz({ lesson, onComplete, onExit }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState("");
    const [checked, setChecked] = useState(false);
    const [score, setScore] = useState(0);

    const question = lesson.questions[current];
    const correct = selected === question.answer;
    const finished = current === lesson.questions.length - 1;

    function checkAnswer() {
        if (!selected || checked) return;

        setChecked(true);
        if (correct) {
            setScore(prevScore => prevScore + 1);
        }
    }

    function nextQuestion() {
        if (!checked) return;

        if (finished) {
            onComplete(score);
            return;
        }
        setCurrent(prev => prev + 1);
        setChecked(false);
        setSelected("");
    }

    return (
        <div className="quiz-overlay">
            <div className="quiz-box">
                <button className="exit-button" onClick={onExit}>
                    X
                </button>
                <div className="quiz-progress">
                    <div 
                        style={{width: `${((current + 1) / lesson.questions.length) * 100}%`}}
                    />

                </div>
                <p className="quiz-counter">
                    QUESTION {current + 1} of {lesson.questions.length}
                </p>
                <h2>{question.question}</h2>
                <div className="answer-options">
                    {question.options.map((option) => (
                        <button 
                            type="button"
                            disabled={checked}
                            className={
                                `answer-option ${selected === option ? "selected" : ""} ${
                                    checked && option === question.answer ? "correct" : ""
                                } ${checked && selected === option && !correct ? "incorrect" : ""}`
                            }
                            onClick={() => setSelected(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {checked && (
                    <div className={`answer-feedback ${correct ? 'success' : 'error'}`}>
                        {correct ? <CheckCircle /> : <XCircle />}
                        <div>
                            <strong>
                                {correct ? "Excellent!" : "Not quite!"}
                            </strong>
                            <p>{question.explanation}</p>
                        </div>
                    </div>
                )}
                <button 
                    className="primary-button quiz-submit" 
                    onClick={checked ? nextQuestion : checkAnswer} 
                    disabled={!selected && checked}
                >
                    {checked ?
                        finished ? "Finish lesson" : "Continue"
                        : "Check answer"
                    }
                    <ArrowRight size={19} />
                </button>
            </div>
        </div>
    )
}