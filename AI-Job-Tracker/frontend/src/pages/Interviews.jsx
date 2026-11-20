import { useEffect, useState } from "react";
import api from "../api/axios";
import InterviewForm from "./InterviewForm";
import { useToast } from "../context/ToastContext";

function Intervew(){
    const [interviews, setInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplications] = useState([]);
    const {showToast} = useToast();
    const [editingInterview, setEditingInterview] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    async function fetchApplications() {
        try {
            const res = await api.get("/applications");
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to fetch applications: ", err);
        }
    }

    // The CRUD funcions

    async function createInterview(interviewData) {
        try {
            await api.post("/interviews", interviewData)
            fetchInterviews();
            showToast("Successfullt created an interview");
        } catch (err) {
            showToast("Something went wrong, we couldn't create an interview")
            console.error("Failed to create Interview")
        }
    }

    async function updateInterview(interviewData) {
        try {
            await api.patch(`/interviews/${editingInterview.id}`, interviewData);
            showToast("Interviews has successfully been updated.");
            setEditingInterview(null);
            setShowForm(false);
            fetchInterviews();    // fetch the interviews after updating one
        } catch (err) {
            console.error("Failed to update interview: ", err);
            showToast("Failed to update interview")
        }
    }

    async function deleteInterview(interviewData) {
        try {
            api.delete(`/interviews/${deleteId}`, interviewData);
            showToast("Interview has successfully been deleted");
            setDeleteId(null);
            fetchInterviews();
        } catch (err) {
            showToast("Could not deleted interview: ", err);
            console.error("Failed to delete interview: ", err);
        }
    }
    
    async function fetchInterviews() {
        setIsLoading(true);
        try {
            const res = await api.get("/interviews");
            setInterviews(res.data);
        } catch (err) {
            console.error("Failed to fetch interviews: ", err)
            showToast("Failed to fetch interviews.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInterviews();
        fetchApplications();
    }, []);

    return (
        <main className="app-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">Interviews</h1>
                    <p className="page-subtitle">Manage your upcoming job interviews here.</p>
                </header>

                {/* The interview form section */}
                <section className="card">
                    <h2>Create an Interview</h2>
                    <InterviewForm applications={applications} onSubmit={createInterview} />
                </section>

                <section className="card">
                    {isLoading ? (
                        <div className="empty-state">Loading interviews...</div>
                    ) : (
                        interviews.length === 0 ? (
                            <div className="empty-state">No interviews have been scheduled yet.</div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interviews.map((interview) => (
                                        <tr key={interview.id}>
                                            <td>{interview.title}</td>
                                            <td>
                                                <div className="interview-date">
                                                    <strong>
                                                        {new Date(interview.interview_date).toLocaleString("en-ZA", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric", 
                                                        })}
                                                    </strong>
                                                    <small>
                                                        {new Date(interview.interview_date).toLocaleString("en-ZA", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </small>
                                                </div>
                                            </td>
                                            <td>{interview.interview_type}</td>
                                            <td>{interview.status}</td>
                                            <td>{interview.notes || "-"}</td>

                                            <td>
                                                <button
                                                    className="btn-small"
                                                    onClick={() => {
                                                        setEditingInterview(interview);
                                                        setShowForm(true);
                                                    }}
                                                >Edit</button>
                                                <button
                                                    className="btn-small danger"
                                                    onClick={() => {
                                                        setDeleteId(interview.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    )}
                </section>
            </div>
        </main>
    )
}

export default Intervew;