import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import {
  BadgeIcon, ShieldIcon, StarIcon, TruckIcon,
  XBrand, FacebookBrand, LinkedinBrand, InstagramBrand
} from '../Icons/Icons'

const trust = [
  { Icon: BadgeIcon, title: "Genuine Products", text: "Quality you can trust" },
  { Icon: ShieldIcon, title: "Secure Checkout", text: "Your payments are protected" },
  { Icon: StarIcon, title: "Curated Selection", text: "Trends and tech, hand-picked" },
  { Icon: TruckIcon, title: "Fast Delivery", text: "Delivered to your door" },
]

const shopLinks = [
  { label: "All Products", query: "" },
  { label: "Audio", query: "Audio" },
  { label: "Laptops", query: "Laptop" },
  { label: "Wearables", query: "Watch" },
]

// TODO: replace "#" with UrbanNest's real profile URLs
const socials = [
  { label: "X", href: "#", Icon: XBrand },
  { label: "Facebook", href: "#", Icon: FacebookBrand },
  { label: "LinkedIn", href: "#", Icon: LinkedinBrand },
  { label: "Instagram", href: "#", Icon: InstagramBrand },
]

const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className="trust-bar">
        {trust.map(({ Icon, title, text }) => (
          <div className='trust-item' key={title}>
            <Icon size={24} />
            <div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='footer'>
        <div className="footer-links">
          <div className="footer-col">
            <h2>Shop</h2>
            {shopLinks.map(({ label, query }) => (
              <Link key={label} to={query ? `/Shop?search=${encodeURIComponent(query)}` : '/Shop'}>{label}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h2>About</h2>
            <Link to="/">Home</Link>
            <Link to="/About">About Us</Link>
            <Link to="/Contact">Contact Us</Link>
          </div>
          <div className="footer-col">
            <h2>Support</h2>
            <Link to="/myorders">My Orders</Link>
            <Link to="/Cart">Cart</Link>
            <a href="tel:+265990854388">+265-990-854-388</a>
            <a href="mailto:urbannest@gmail.com">urbannest@gmail.com</a>
          </div>
        </div>

        <div className="footer-social">
          <p>Social Media</p>
          <div className="footer-social-icons">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>Copyright © {new Date().getFullYear()} UrbanNest. All Rights Reserved.</p>
        <p>Where Trends and Tech Call Home</p>
      </div>
    </footer>
  )
}

export default Footer
