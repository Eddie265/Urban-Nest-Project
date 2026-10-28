import React, { useState } from 'react'
import './BottomBanner.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { ArrowRight, GiftIcon, MailIcon } from '../Icons/Icons'

const BottomBanner = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // No newsletter endpoint exists yet, so this only confirms on the client
  const onSubscribe = (event) => {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <section className='bottom'>
      <div className="deals-card">
        <span className='deals-icon'><GiftIcon size={34} /></span>
        <div className="deals-text">
          <h2>Level Up Your<br />Gaming Experience</h2>
          <p>From immersive sound to precise controls — everything you need to win.</p>
          <Link to='/Shop' className='deals-btn'>Buy Now <ArrowRight size={16} /></Link>
        </div>
        <img className='deals-img' src={assets.md_controller_image} alt="" />
      </div>

      <div className="newsletter-card">
        <div className="newsletter-text">
          <h2>Get the Latest Tech & Deals</h2>
          <p>Join our newsletter and never miss an update.</p>
          {subscribed
            ? <p className='newsletter-thanks'>Thanks for subscribing!</p>
            : <form className='newsletter-form' onSubmit={onSubscribe}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' aria-label="Email address" />
              <button type='submit' className='btn-red'>Subscribe</button>
            </form>}
        </div>
        <div className="newsletter-art" aria-hidden="true">
          <span className='newsletter-blob'></span>
          <MailIcon size={70} />
          <img src={assets.jbl_soundbox_image} alt="" />
        </div>
      </div>
    </section>
  )
}

export default BottomBanner
