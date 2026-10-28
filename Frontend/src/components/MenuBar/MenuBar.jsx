import React from 'react'
import { NavLink } from 'react-router-dom'
import './MenuBar.css'
import { assets } from '../../assets/assets';
import { CloseIcon } from '../Icons/Icons';

const MenuBar = ({ setShowMenu }) => {

    const close = () => setShowMenu(false);

    return (
        <div className='menu-bar-overlay' onClick={close}>
            <nav className='menu-bar-popup' onClick={(e) => e.stopPropagation()}>
                <div className="cross-icon">
                    <button onClick={close} aria-label="Close menu"><CloseIcon size={22} /></button>
                </div>
                <NavLink to='/' end onClick={close}><img src={assets.home} alt="" />Home</NavLink>
                <NavLink to="/Shop" onClick={close}><img src={assets.shopping} alt="" />Shop</NavLink>
                <NavLink to="/About" onClick={close}><img src={assets.group} alt="" />About Us</NavLink>
                <NavLink to="/Contact" onClick={close}><img src={assets.chat} alt="" />Contact</NavLink>
            </nav>
        </div>
    )
}

export default MenuBar
