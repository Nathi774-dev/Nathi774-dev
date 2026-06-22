import { useEffect, useState } from "react";
import api from "../api/axios";
import ApplicationForm from "./ApplicationForm";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [showForm, setShowForm] = useState(false);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/applications", {
                params: {
                    search,
                    status,
                    sort
                }
            });
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const createApplication = async (applicationData) => {
        try {
            await api.post("/applications", applicationData);
            setShowForm(false);
            fetchApplications();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [search, sort, status]);

    return (
        <main className="app-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">Applications</h1>
                    <p className="page-subtitle">
                        Manage and track your job applications.
                    </p>
                </header>
                <section className="card">
                    <div className="toolbar">
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Search company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All statuses</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="wishlist">Wishlist</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select className="form-control" onChange={(e) => setSort(e.target.value)} value={sort}>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>

                        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                            {showForm ? "Close" : "+ New Application"}
                        </button>
                    </div>

                    {/* Render the Form if user press the add application button */}
                    {showForm && (
                        <section className="card section">
                            <ApplicationForm onSubmit={createApplication} />
                        </section>
                    )}

                    {isLoading ? (
                        <div className="empty-state">Loading applications...</div>
                    ) : applications.length === 0 ? (
                        <div className="empty-state">
                            No applications yet.
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application.id}>
                                        <td>{application.company_name}</td>
                                        <td>{application.role}</td>
                                        <td>
                                            <span className={`badge ${application.status}`}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td>{application.location || "No location provided"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Applications;