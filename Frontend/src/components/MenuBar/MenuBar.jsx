import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuBar.css'
import { assets } from '../../assets/assets';

const MenuBar = ({ setShowMenu }) => {

    const [menu, setMenu] = useState("home");
    
    return (
        <div className='menu-bar-popup'>
            <div className="cross-icon">
                <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""} ><img src={assets.home} />Home</Link>
            <Link to="/Shop" onClick={() => setMenu("Shop")} className={menu === "Shop" ? "active" : ""}><img src={assets.shopping} />Shop</Link>
            <Link to="/About" onClick={() => setMenu("About")} className={menu === "About" ? "active" : ""}><img src={assets.group} />About Us</Link>
            <Link to="/Contact" onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}><img src={assets.chat} />Contact</Link>
        </div>
    )
}

export default MenuBar