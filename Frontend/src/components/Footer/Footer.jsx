import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="left1">
            <img className='logo1' src={assets.logo} alt="" />
            <p>UrbanNest is a modern lifestyle brand that blends cutting-edge<br />technology with the latest trends in home living. From smart home innovations<br/>to stylish décor, UrbanNest creates spaces that are both functional and fashionable.<br/>Where Trends and Tech Call Home</p>
        </div>
        <div className="center2">
            <h2>Company</h2>
            <a href="#">Home</a>
            <a href="#">About us</a>
            <a href="#">Contact us</a>
            <a href="#">Privacy policy</a>
        </div>
        <div className="left3">
            <h2>Get in touch</h2>
            <p>+265-990-854-388</p>
            <p>urbannest@gmail.com</p>
        </div>
    </div>
  )
}

export default Footer