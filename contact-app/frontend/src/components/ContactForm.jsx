import { useState } from "react";
import "../styles/contact.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const err = {};

    if (!form.name.trim()) {
      err.name = "Name is required";
    }

    if (!form.phone.trim()) {
      err.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      err.phone = "Phone must be exactly 10 digits";
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Invalid email format";
    }

    if (form.message.length > 300) {
      err.message = "Message cannot exceed 300 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrors({ api: data.error || "Submission failed" });
        return;
      }

      setForm(initialState);
      setErrors({});
      setSuccess("Contact submitted successfully!");
      onAdd();
    } catch {
      setErrors({ api: "Server not reachable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>

      {success && <p className="success">{success}</p>}
      {errors.api && <p className="error">{errors.api}</p>}

      <form onSubmit={submit}>
        <div className="form-group">
          <input
            placeholder="Name *"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <textarea
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />
          {errors.message && (
            <p className="error">{errors.message}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
