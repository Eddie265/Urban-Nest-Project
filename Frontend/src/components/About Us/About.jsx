import React from 'react'
import './About.css'
import { assets } from '../../assets/assets'

const About = () => {
  return (
    <div className='about-container'>
      <div className="about-col">
        <img src={assets.logo} className='logo3' alt="" />
      </div>
      <div className="about-right">
        <h4>" Where Trends and Tech Call Home "</h4>
        <p>At UrbanNest, we're building more than just a platform — we're creating opportunities. Founded in Malawi with a vision for all of Africa, UrbanNest is dedicated to improving the way businesses market themselves online. We understand the challenges many African entrepreneurs face when trying to gain digital visibility, and we're here to change that.

          Our mission is to empower local businesses by providing simple, modern, and effective online marketing tools. Whether you're a small vendor in Lilongwe or a growing startup in Lagos, UrbanNest offers a space where your brand can thrive, connect with customers, and grow beyond borders.

          We're passionate about bridging the digital gap in Africa — making powerful marketing accessible, affordable, and impactful for everyone.</p>
      </div>
    </div>
  )
}

export default About