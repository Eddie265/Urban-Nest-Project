import React from 'react'
import './About.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import { ArrowRight, BadgeIcon, HeadsetIcon, ReturnIcon, ShieldIcon, TruckIcon } from '../Icons/Icons'

const reasons = [
  { Icon: BadgeIcon, title: "Trusted brands", text: "Wide selection of trusted tech and fashion brands" },
  { Icon: ShieldIcon, title: "Secure payments", text: "Secure payments via Stripe & PayChangu" },
  { Icon: TruckIcon, title: "Fast shipping", text: "Fast shipping and reliable service" },
  { Icon: HeadsetIcon, title: "Real support", text: "Exceptional customer support" },
  { Icon: ReturnIcon, title: "Easy returns", text: "Easy returns and hassle-free experience" },
]

const About = () => {
  return (
    <div className="about-page">
      <PageHeader
        crumb="About Us"
        title="About"
        accent="UrbanNest"
        text="Where Trends and Tech Call Home"
        image={assets.header_headphone_image}
      />

      <section className="about-intro">
        <div className="about-intro-img">
          <img src={assets.boy_with_laptop_image} alt="Shopper using a laptop" />
        </div>
        <div className="about-intro-text">
          <div className="about-section">
            <p className="about-eyebrow">Who We Are</p>
            <h2>Tech and style, <span>in one place</span></h2>
            <p>
              Urban Nest is your go-to online store for the latest in tech and fashion.
              From cutting-edge gadgets to stylish clothing, we bring you the best of both worlds — all in one seamless shopping experience.
            </p>
          </div>
          <div className="about-section">
            <p className="about-eyebrow">What We Offer</p>
            <p>
              We curate top-quality tech products, electronics, and trendy apparel designed to elevate your lifestyle.
              Whether you’re upgrading your setup or refreshing your wardrobe, we’ve got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="about-reasons">
        <div className="section-head">
          <h2>Why Shop With Us?</h2>
        </div>
        <div className="about-reason-grid">
          {reasons.map(({ Icon, title, text }) => (
            <div className="about-reason" key={title}>
              <span><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-mission">
        <div>
          <p className="about-eyebrow">Our Mission</p>
          <h2>
            To empower everyday people with access to premium tech and trendsetting fashion —
            delivered to your door with ease, speed, and confidence.
          </h2>
        </div>
        <Link to="/Shop" className="deals-btn">Shop now <ArrowRight size={16} /></Link>
      </section>
    </div>
  )
}

export default About
