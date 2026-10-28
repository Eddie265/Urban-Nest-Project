import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import {
    SearchIcon, CartIcon, UserIcon, MenuIcon, BagIcon, LogoutIcon,
    GadgetIcon, HomeIcon, AudioIcon, WatchIcon, PlugIcon, TagIcon, PinIcon
} from '../Icons/Icons'

const categoryLinks = [
    { label: "Gadgets", query: "", Icon: GadgetIcon },
    { label: "Smart Home", query: "Smart Home", Icon: HomeIcon },
    { label: "Audio", query: "Audio", Icon: AudioIcon },
    { label: "Wearables", query: "Watch", Icon: WatchIcon },
    { label: "Accessories", query: "Accessories", Icon: PlugIcon },
    { label: "Deals", query: "", Icon: TagIcon },
]

const Navbar = ({ setShowLogin, setShowMenu }) => {

    const { token, setToken, getTotalQuantity } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    const onSearch = (event) => {
        event.preventDefault();
        const term = search.trim();
        navigate(term ? `/Shop?search=${encodeURIComponent(term)}` : '/Shop');
    }

    const activeCategory = searchParams.get("search") || "";

    return (
        <header className="site-header">
            <div className="navbar">
                <Link to='/' className='logo-link'><img className='logo' src={assets.logo} alt="UrbanNest logo" /></Link>

                <form className="nav-search" onSubmit={onSearch} role="search">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for tech gadgets, ideas and more"
                        aria-label="Search products"
                    />
                    <button type="submit" aria-label="Search"><SearchIcon size={18} /></button>
                </form>

                <nav className='navbar-menu'>
                    <NavLink to='/' end>Home</NavLink>
                    <NavLink to="/Shop">Shop</NavLink>
                    <NavLink to="/About">About Us</NavLink>
                    <NavLink to="/Contact">Contact</NavLink>
                </nav>

                <div className="navbar-right">
                    <Link to='/Cart' className="nav-icon-btn cart-btn" aria-label="Cart">
                        <CartIcon size={22} />
                        {getTotalQuantity() > 0 && (
                            <span className="dot">{getTotalQuantity()}</span>)
                        }
                    </Link>
                    {!token ? <button className="sign-in-btn" onClick={() => setShowLogin(true)} ><UserIcon size={18} /><span>Sign in</span></button>
                        : <div className='navbar-profile'>
                            <button className="nav-icon-btn" aria-label="Account"><UserIcon size={22} /></button>
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate('/myorders')} ><BagIcon size={18} /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout} ><LogoutIcon size={18} /><p>Logout</p></li>
                            </ul>
                        </div>}
                    <button className="nav-icon-btn menu-bar" onClick={() => setShowMenu(true)} aria-label="Open menu"><MenuIcon size={22} /></button>
                </div>
            </div>

            <div className="category-bar">
                <div className="category-links">
                    {categoryLinks.map(({ label, query, Icon }) => (
                        <Link
                            key={label}
                            to={query ? `/Shop?search=${encodeURIComponent(query)}` : '/Shop'}
                            className={(query ? activeCategory === query : label === "Gadgets" && !activeCategory) ? "active" : ""}
                        >
                            <Icon size={17} />{label}
                        </Link>
                    ))}
                </div>
                <div className="category-meta">
                    <PinIcon size={16} /> Delivering across Malawi
                </div>
            </div>
        </header>
    )
}

export default Navbar
