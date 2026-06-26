export const ContactList = ({contacts, onEdit, onDelete}) => {
    return (
        <div>
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length === 0 ? (
                        <tr>
                            <td colSpan="4">No contacts found.</td>
                        </tr>
                    ) : (
                        contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button
                                        onClick={() => onEdit(contact)}
                                    >Update</button>
                                    <button onClick={() => onDelete(contact.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}