import { motion } from "framer-motion";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your request has been submitted successfully.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper-premium">

      {/* LEFT PANEL */}
      <motion.div
        className="contact-left-premium"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-left-inner">

          <div className="institution-badge">
            UNIVERSITY PLACEMENT SYSTEM
          </div>

          <h1>Strategic Placement Collaboration</h1>

          <p>
            Engage with our academic and analytics division for institutional
            onboarding, integration strategy, and readiness intelligence.
          </p>

          <div className="contact-meta-premium">
            <div>
              <span>Support Email</span>
              <strong>support@placementportal.com</strong>
            </div>

            <div>
              <span>Operational Hours</span>
              <strong>Mon – Fri | 09:00 – 18:00 IST</strong>
            </div>
          </div>

        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="contact-right-premium"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form className="contact-form-premium" onSubmit={handleSubmit}>

          <div className="input-group-premium">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-premium">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-premium">
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="contact-btn-premium">
            Submit Strategic Inquiry
          </button>

        </form>
      </motion.div>

    </div>
  );
}

export default Contact;