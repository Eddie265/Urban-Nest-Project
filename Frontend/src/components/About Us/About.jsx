import React from 'react'
import './About.css'
import { assets } from '../../assets/assets'

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About UrbanNest</h1>
        <p>Where Trends and Tech Call Home</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          Urban Nest is your go-to online store for the latest in tech and fashion.
          From cutting-edge gadgets to stylish clothing, we bring you the best of both worlds — all in one seamless shopping experience.
        </p>
      </div>

      <div className="about-section">
        <h2>What We Offer</h2>
        <p>
          We curate top-quality tech products, electronics, and trendy apparel designed to elevate your lifestyle.
          Whether you’re upgrading your setup or refreshing your wardrobe, we’ve got you covered.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>Wide selection of trusted tech and fashion brands</li>
          <li>Secure payments via Stripe & PayChangu</li>
          <li>Fast shipping and reliable service</li>
          <li>Exceptional customer support</li>
          <li>Easy returns and hassle-free experience</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To empower everyday people with access to premium tech and trendsetting fashion —
          delivered to your door with ease, speed, and confidence.
        </p>
      </div>
    </div>
  )
}

export default About