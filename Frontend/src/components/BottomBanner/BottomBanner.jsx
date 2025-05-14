import React from 'react'
import './BottomBanner.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const BottomBanner = () => {
  return (
    <div className='bottom'>
        <div className="left">
            <img src={assets.jbl_soundbox_image} alt="" />
        </div>
        <div className="center">
            <h2>Level Up Your<br />Gaming Experience</h2>
            <p>From immersive sound to precise controls—<br/>everything you need to win</p>
            <button><Link to='/Shop' >Buy Now</Link></button>
        </div>
        <div className="right">
            <img src={assets.md_controller_image} alt="" />
        </div>
    </div>
  )
}

export default BottomBanner