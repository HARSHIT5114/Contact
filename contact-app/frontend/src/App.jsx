import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`);
    setContacts(await res.json());
  };
  
  const deleteContact = async id => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  useEffect(() => { fetchContacts(); }, []);

  return (
    <>
      <ContactForm onAdd={fetchContacts} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </>
  );
}
