import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import ScoreCard from "../components/AI-Components/ScoreCard";
import FeedbackList from "../components/AI-Components/FeedbackList";


export default function MockInterview() {
    const [documents, setDocuments] = useState([]);
    const [form, setForm] = useState({
        document_id: "",
        job_title: "",
        company_name: "",
        job_description: "",
        question_type: "mixed"
    });
    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("mixed");
    const [answer, setAnswer] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [questionLoading, setQuestionLoading] = useState(false);
    const [evaluationLoading, setEvaluationLoading] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        async function fetchDocs() {
            try {
                const res = await api.get("/documents");
                setDocuments(Array.isArray(res.data) ? res.data : []);
            }
            catch (e) {
                console.error("Failed to load documents: ", e);
                showToast("Failed to load documents and resumes")
            }
        }
        fetchDocs();
    }, []);

    function handleChange(e) {
        setForm(currentForm => ({
            ...currentForm,
            [e.target.name]: e.target.value
        }));
    }

    async function generateQuestion(e) {
        e.preventDefault();
        if (!form.document_id) {
            showToast("Select a resume first");
            return;
        }

        setQuestionLoading(true);
        setQuestion("");
        setAnswer("");
        setEvaluation(null);

        try {
            const res = await api.post("/ai/mock-interview/question", {
                ...form,
                document_id: Number(form.document_id)
            });
            setQuestion(res.data.question);
            setQuestionType(res.data.question_type);
        } catch (e) {
            console.error("An error has occured: ", e);
            showToast(e.response?.data?.detail || "Failed to generate the question: upgrade your billing");
        } finally {
            setQuestionLoading(false);
        }
    }

    async function evaluateAnswer(e) {
        e.preventDefault();

        if (!answer.trim()) {
            showToast("Enter your answer first");
            return;
        }
        setEvaluationLoading(true);

        try {
            const res = await api.post("/ai/mock-interview/evaluate", {
                question,
                answer,
                job_title: form.job_title,
                company_name: form.company_name
            });
            setEvaluation(res.data);
            showToast("Answer evaluated successfully");
        } catch (e) {
            console.error("Answer evaluation failed: ", e);
        } finally {
            setEvaluationLoading(false);
        }
    }

    function startNextQuestion() {
        setQuestion("");
        setQuestionType("");
        setAnswer("");
        setEvaluation(null);
    }

    return (
        <main className="app-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">Mock interview</h1>
                    <p className="page-subtitle">
                        Practise interview questions and recieve <span>AI</span> feedback.
                    </p>
                </header>
                {!question && (
                    <section className="card-section">
                        <h2 className="section-title">Interview setup</h2>
                        <form className="grid" onSubmit={generateQuestion}>
                            <div className="form-group">
                                <label htmlFor="document_id">Resume</label>
                                <select
                                    id="document_id"
                                    className="form-control"
                                    name="document_id"
                                    value={form.document_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a resume</option>
                                    {documents.map((document) => (
                                        <option
                                            key={document.id} 
                                            value={document.id}
                                        >
                                            {document.filename}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="job_title">Job Title</label>
                                <input 
                                    id="job_title" 
                                    name="job_title" 
                                    value={form.job_title}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g. An entry level developer"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company_name">Company Name</label>
                                <input 
                                    id="company_name"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g. Google"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="question_type">Question Type</label>
                                <select
                                    className="form-control"
                                    name="question_type"
                                    value={form.question_type}
                                    id="question_type"
                                    onChange={handleChange}
                                >
                                    <option value="mixed">Mixed</option>
                                    <option value="technical">Technical</option>
                                    <option value="behavioral">Behavioral</option>
                                    <option value="company">Company</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="job_description">Job Description</label>
                                <textarea 
                                    id="job_description"
                                    className="form-control"
                                    name="job_description"
                                    value={form.job_description}
                                    onChange={handleChange}
                                    rows="8"
                                    placeholder="Paste your job description here..."
                                    required
                                />
                            </div>

                            <button 
                                className="btn btn-primary" 
                                disabled={questionLoading}
                            >
                                {questionLoading ? "Generating question" : "Start mock interview"}
                            </button>
                        </form>
                    </section>
                )}

                {question && (
                    <section className="card section mock-question-card">
                        <div className="mock-question-header">
                            <span className={`interview-type ${questionType}`}>
                                {questionType}
                            </span>
                            <h2 className="section-title">Interview type</h2>
                        </div>
                        <p className="mock-question">{question}</p>

                        <form onSubmit={evaluateAnswer}>
                            <div className="form-group">
                                <label htmlFor="answer">Your Answer</label>

                                <textarea 
                                    id="answer"
                                    name="answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    rows="8"
                                    placeholder="Type your answer here..."
                                    required
                                   className="form-control"
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={evaluationLoading}
                            >
                                {evaluationLoading ? "Evaluating your answer..." : "Evaluate your answer"}
                            </button>
                        </form>
                    </section>
                )}

                {evaluation && (
                    <section className="card section">
                        <h2 className="section-title">Interview Feedback</h2>
                        <div className="mock-score-grid">
                            <ScoreCard title="Overall" value={evaluation.overall_score} />
                            <ScoreCard title="Technical" value={evaluation.technical_score} />
                            <ScoreCard title="Communication" value={evaluation.communication_score} />
                            <ScoreCard title="Confidence" value={evaluation.confidence_score} />
                        </div>

                        <div className="feedback-section">
                            <h3>Feedback</h3>
                            <p>{evaluation.feedback}</p>
                        </div>

                        <FeedbackList title="Strengths" items={evaluation.strengths} />
                        <FeedbackList title="Areas for Improvements" items={evaluation.areas_for_improvement} />

                        <div className="feedback-section">
                            <h3>Improved answer</h3>
                            <p className="improved-answer">{evaluation.improved_answer}</p>
                        </div>

                        <button className="btn btn-primary" onClick={startNextQuestion}>
                            Try Another Question
                        </button>
                    </section>
                )}
            </div>
        </main>
    )
}