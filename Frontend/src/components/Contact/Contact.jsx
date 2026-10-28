import React, { useState } from 'react'
import './Contact.css'
import { assets } from '../../assets/assets'
import PageHeader from '../PageHeader/PageHeader'
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from '../Icons/Icons'

const Contact = () => {
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  // No contact endpoint exists, so hand the message to the visitor's email app
  const onSubmit = (event) => {
    event.preventDefault();
    const body = `${form.message}\n\n— ${form.name}`;
    window.location.href = `mailto:urbannest@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="contact-page">
      <PageHeader
        crumb="Contact"
        title="Get in"
        accent="Touch"
        text="We'd love to hear from you. Reach out anytime."
        image={assets.header_playstation_image}
      />

      <div className="contact-layout">
        <div className="contact-methods">
          <a className="contact-item" href="mailto:urbannest@gmail.com">
            <span className="contact-icon"><MailIcon size={22} /></span>
            <div>
              <h3>Email us</h3>
              <p>urbannest@gmail.com</p>
            </div>
          </a>
          <a className="contact-item" href="tel:+265990854388">
            <span className="contact-icon"><PhoneIcon size={22} /></span>
            <div>
              <h3>Calls & WhatsApp</h3>
              <p>+265 990-854-388</p>
            </div>
          </a>
          <a className="contact-item" href="tel:+265899550872">
            <span className="contact-icon"><PhoneIcon size={22} /></span>
            <div>
              <h3>Calls</h3>
              <p>+265 899-550-872</p>
            </div>
          </a>
          <div className="contact-item">
            <span className="contact-icon"><PinIcon size={22} /></span>
            <div>
              <h3>Delivery</h3>
              <p>Delivering across Malawi</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <h2>Send us a message</h2>
          <p>Fill this in and we'll open your email app with the message ready to send.</p>
          <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" />
          <input name="subject" value={form.subject} onChange={onChange} required placeholder="Subject" />
          <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="How can we help?" />
          <button type="submit" className="btn-red">Send message <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  )
}

export default Contact
