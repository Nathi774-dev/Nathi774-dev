import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function ApplicationForm({onSubmit}) {
    const [form, setForm] = useState({
        company_name: "",
        role: "",
        status: "applied",
        location: "",
        job_url: "",
        notes: ""
    });

    function handleChange(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);

        setForm({
            company_name: "",
            role: "",
            status: "applied",
            location: "",
            job_url: "",
            notes: ""
        });
    }

    return (
        <form onSubmit={handleSubmit} className="grid">
            <Input 
                label="Company"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
            />

            <Input 
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
            />

            <div className="form-group">
                <label>Status</label>
                <select className="form-control" name="status" value={form.status} onChange={handleChange}>
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="rejected">Rejected</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                </select>
            </div>

            <Input 
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
            />

            <Input 
                label="Job URL"
                name="job_url"
                value={form.job_url}
                onChange={handleChange}
            />

            <div className="form-group">
                <label>Notes</label>
                <textarea
                    className="form-control"
                    rows="4"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                />
            </div>
            <Button type="submit">
                Save application
            </Button>
        </form>
    )
}

export default ApplicationForm;