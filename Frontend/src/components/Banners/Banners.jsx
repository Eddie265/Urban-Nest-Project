import React from 'react'
import './Banners.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { ChevronRight } from '../Icons/Icons'

const ideas = [
  { title: "Unparalleled Sound", text: "Premium headphones", image: assets.girl_with_headphone_image, tone: "tone-red" },
  { title: "Stay Connected", text: "Compact earphones", image: assets.girl_with_earphone_image, tone: "tone-dark" },
  { title: "Power in Every Pixel", text: "Work & gaming laptops", image: assets.boy_with_laptop_image, tone: "tone-slate" },
  { title: "Level Up Your Gaming", text: "Consoles & controllers", image: assets.md_controller_image, tone: "tone-violet cutout" },
  { title: "Room-Filling Audio", text: "Portable speakers", image: assets.jbl_soundbox_image, tone: "tone-warm cutout" },
]

const Banners = () => {
  return (
    <section className='Banner'>
      <div className="section-head">
        <h2>Ideas for Your Next Upgrade</h2>
        <Link to='/Shop'>See more ideas</Link>
      </div>
      <div className="banners">
        {ideas.map((idea) => (
          <Link to='/Shop' key={idea.title} className={`idea-card ${idea.tone}`}>
            <img src={idea.image} alt="" loading="lazy" />
            <div className="idea-card-text">
              <h3>{idea.title}</h3>
              <p>{idea.text}</p>
            </div>
            <span className='idea-card-arrow'><ChevronRight size={16} /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Banners
