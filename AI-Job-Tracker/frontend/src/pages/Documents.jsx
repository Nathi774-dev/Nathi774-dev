import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {showToast} = useToast();

    async function fetchDocuments() {
        try {
            const res = await api.get("/documents");
            
            if (Array.isArray(res.data)) {
                setDocuments(res.data);
            } else if (Array.isArray(res.data.documents)) {
                setDocuments(res.data.documents)
            } else {
                setDocuments([]);     // if the is nothing, initialize an empty array
            }
        } catch (err) {
            showToast("Failed to fetch documents")
            console.error(err);
            setDocuments([]);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    async function uploadDocuments(e) {
        e.preventDefault();

        if (!file) {
            showToast("Please choose a file!");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        setIsLoading(true);

        try {
            await api.post(`/documents/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setFile(null);
            fetchDocuments();
            showToast("Resume successfully uploaded")
        } catch (err) {
            showToast("Error, failed to upload resume")
            console.error("Uploading error: ", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteDocument(id) {
        try {
            await api.delete(`/documents/${id}`);
            fetchDocuments();
            showToast("Successfully deleted resume");
        } catch (err) {
            showToast("Failed to delete resume");
            console.error("Delete error: ", err)
        }
    }

    return (
        <main className="app-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="page-title">Documents</h1>
                    <p className="page-subtitle">
                        Upload and manage resumes, cover letters and certificates
                    </p>
                </header>

                <section className="card section">
                    <h2 className="section-title">Upload resume</h2>
                    <form onSubmit={uploadDocuments} className="upload-form">
                        <input 
                            className="form-control"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <button className="btn btn-primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Uploading..." : "Upload document"}
                        </button>
                    </form>
                </section>

                <section className="card section">
                    <h2 className="section-title">Your Documents</h2>
                    {documents.length === 0 ? (
                        <div className="empty-state">
                            No documents are uploaded yet.
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Type</th>
                                    <th>Uploaded (A date)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id}>
                                        <td>{doc.filename}</td>
                                        <td>{doc.file_type}</td>
                                        <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="btn-small danger"
                                                onClick={() => deleteDocument(doc.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </main>
    );
}
 
export default Documents;