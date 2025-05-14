import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Get in Touch</h1>
        <p className="contact-subtitle">We'd love to hear from you. Reach out anytime.</p>
        <div className="contact-methods">
          <div className="contact-item">
            <img src={assets.mail} alt="Email Icon" />
            <span>urbannest@gmail.com</span>
          </div>
          <div className="contact-item">
            <img src={assets.phone} alt="Phone Icon" />
            <span>
              +265 990-854-388 (Calls & WhatsApp)<br />
              +265 899-550-872 (Calls)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact