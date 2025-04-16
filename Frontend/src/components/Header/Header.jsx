import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h4>Limited time offer 30% off</h4>
            <h1>Experience pure Sound-<br/>Your perfect headphones awaits!</h1>
            <button>Buy Now</button>
            <img src={assets.header_headphone_image} alt="" />
        </div>
    </div>
  )
}

export default Header