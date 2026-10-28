import React from 'react'
import './CategoryCards.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { ArrowRight } from '../Icons/Icons'

const categories = [
  { title: "Audio", text: "Premium sound", image: assets.bose_headphone_image, query: "Audio" },
  { title: "Laptops", text: "Power to create", image: assets.macbook_image, query: "Laptop" },
  { title: "Wearables", text: "Track. Achieve.", image: assets.venu_watch_image, query: "Watch" },
  { title: "Gaming", text: "Play next-level", image: assets.playstation_image, query: "Gaming" },
  { title: "Cameras", text: "Capture it all", image: assets.cannon_camera_image, query: "Camera" },
]

const CategoryCards = () => {
  return (
    <section className='category-cards'>
      {categories.map((cat) => (
        <Link key={cat.title} to={`/Shop?search=${encodeURIComponent(cat.query)}`} className='category-card'>
          <img src={cat.image} alt="" />
          <div className="category-card-text">
            <h3>{cat.title}</h3>
            <p>{cat.text}</p>
          </div>
          <span className='category-card-arrow'><ArrowRight size={14} /></span>
        </Link>
      ))}
    </section>
  )
}

export default CategoryCards
