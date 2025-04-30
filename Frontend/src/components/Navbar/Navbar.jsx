import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin, setShowMenu }) => {

    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken,getTotalQuantity } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <div>
            <div className="navbar" data-theme="darks">
                <Link to='/'><img className='logo' src={assets.logo} alt="Web logo" /></Link>
                <ul className='navbar-menu'>
                    <Link to='/' onClick={() => setMenu("Home")} className={menu === "home" ? "active" : ""} >Home</Link>
                    <Link to="/Shop" onClick={() => setMenu("Shop")} className={menu === "Shop" ? "active" : ""} >Shop</Link>
                    <Link to="/About" onClick={() => setMenu("About")} className={menu === "About" ? "active" : ""} >About Us</Link>
                    <Link to="/Contact" onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</Link>
                    {/* <button>Seller dashboard</button> */}
                </ul>
                <div className="navbar-right">
                    <img src={assets.menu} className='menu-bar' onClick={() => setShowMenu(true)} />
                    <img src={assets.search_icon} className='img' alt="" />
                    <div className="search-icon">
                        <Link to='/Cart'><img src={assets.cart_icon} className='img' alt="cart icon" /></Link>
                        {getTotalQuantity() > 0 && (
                            <div className="dot">{getTotalQuantity()}</div>)
                        }
                    </div>
                    {/* <div className="search-icon">
                        <Link to='/Cart'><img src={assets.cart_icon} className='img' alt="cart icon" /></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div> */}
                    {!token ? <button onClick={() => setShowLogin(true)} >Sign in</button>
                        : <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>}

                </div>
            </div>
        </div>
    )
}

export default Navbar