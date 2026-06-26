import { useEffect, useState } from "react";

export const ContactForm = ({ contact, onSuccess, onCancel }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setFirstName(contact?.firstName || "");
        setLastName(contact?.lastName || "");
        setEmail(contact?.email || "");
    }, [contact]);

    const isEdit = Boolean(contact?.id)

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email
        };
        const url = isEdit
            ? `http://127.0.0.1:5000/update-contact/${contact.id}`
            : `http://127.0.0.1:5000/create-contact`;
        const options = {
            method: isEdit ? "PATCH" : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const res = await fetch(url, options);

            if (!res.ok) {
                let errorMessage = 'Request failed';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    errorMessage = await res.text();
                }
                alert(errorMessage);
                return;
            }

            alert(isEdit ? 'Contact updated successfully' : 'Contact created successfully');
            setFirstName("");
            setLastName("");
            setEmail("");
            onSuccess?.();
        } catch (error) {
            alert('Unable to create contact. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="contact-form">
            <h2>{isEdit ? "Update Contact" : "Create Contact"}</h2>
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="actions">
                    <button type="submit">
                        {isEdit ? "Update Details" : "Submit Details"}
                    </button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
