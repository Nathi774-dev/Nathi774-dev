import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const emptyForm = {
    application_id: "",
    title: "",
    interview_date: "",
    interview_type: "online",
    status: "scheduled",
    notes: ""
}

function InterviewForm({ applications = [], initialData, onSubmit }) {
    const [form, setForm] = useState(initialData || emptyForm);

    useEffect(() => {
        setForm(initialData || emptyForm);
    }, [initialData]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            ...form,
            application_id: Number(form.application_id)
        });

        if (!initialData) {
            setForm(emptyForm);
        }
    }

    return (
        <form className="grid" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Application</label>
                <select
                    className="form-control"
                    name="application_id"
                    value={form.application_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select application</option>

                    {applications.map((app) => (
                        <option key={app.id} value={app.id}>{app.company_name} - {app.role}</option>
                    ))}
                </select>
            </div>

            <Input 
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Technical Interview"
                required
            />

            <Input 
                label="Interview Date"
                type="datetime-local"
                name="interview_date"
                value={form.interview_date}
                onChange={handleChange}
                required
            />

            <div className="form-group">
                <label>Interview Type</label>
                <select
                    className="form-control"
                    name="interview_type"
                    value={form.interview_type}
                    onChange={handleChange}
                >
                    <option value="online">Online</option>
                    <option value="phone">Phone</option>
                    <option value="on-site">On-Site</option>
                    <option value="technical">Technical</option>
                    <option value="hr">HR</option>
                </select>
            </div>

            <div className="form-group">
                <label>Status</label>
                <select
                    className="form-control"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="form-group">
                <label>Notes</label>
                <textarea 
                    className="form-control"
                    name="notes"
                    rows="4"
                    value={form.notes}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit">
                {initialData ? "Save Changes" : "Create Interview"}
            </Button>
        </form>
    )
}

export default InterviewForm;