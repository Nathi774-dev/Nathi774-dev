import {useState, useEffect} from "react";
import './App.css';
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";

function App(){
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);


  const openEdit = (contact) => {
    setSelectedContact(contact);
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
    setSelectedContact(null);
  }

  const handleSaved = () => {
    closeForm();
    fetchContacts();
  }

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Delete this contact?");
    if (!confirmed) return;

    const res = await fetch(`http://127.0.0.1:5000/delete-contact/${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      let errorMessage = "Could not delete contact.";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = await res.text();
      }
      alert(errorMessage);
      return;
    }

    alert("Contact deleted successfully");
    fetchContacts();
  }

  const fetchContacts = async () => {
    const res = await fetch("http://127.0.0.1:5000/contacts");
    if (!res.ok) {
      console.error("Failed to load contacts", res.status);
      return;
    }

    const data = await res.json();
    setContacts(data.contacts || []);
  }

  const openForm = () => {
    setSelectedContact(null);
    setShowForm(true);
  };

  useEffect(() => {
    const loadContacts = async () => {
      await fetchContacts();
    };

    loadContacts();
  }, []);

  return (
    <div className="app-container">
      <div className="toolbar">
        <button onClick={openForm}>Create new contact</button>
      </div>

      {showForm && (
        <div className="form-panel">
          <ContactForm
            contact={selectedContact}
            onSuccess={handleSaved}
            onCancel={closeForm}
          />
        </div>
      )}

      <ContactList contacts={contacts} onEdit={openEdit} onDelete={handleDelete} />
    </div>
  )
}

export default App;