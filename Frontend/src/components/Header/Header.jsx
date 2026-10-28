import React, { useEffect, useState } from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, TruckIcon, ShieldIcon, ReturnIcon } from '../Icons/Icons';

const sliderData = [
  {
    id: 1,
    eyebrow: "Limited Time Offer 30% Off",
    title: "Experience",
    accent: "Pure Sound",
    text: "Your perfect headphones await. Immersive audio that upgrades every moment.",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: assets.header_headphone_image,
  },
  {
    id: 2,
    eyebrow: "Hurry up, only a few left!",
    title: "Next-Level",
    accent: "Gaming",
    text: "Discover PlayStation 5 today and bring home the next generation of play.",
    buttonText1: "Shop now",
    buttonText2: "Explore Deals",
    imgSrc: assets.header_playstation_image,
  },
  {
    id: 3,
    eyebrow: "Exclusive Deal 40% Off",
    title: "Power Meets",
    accent: "Elegance",
    text: "Apple MacBook Pro is here for you. Performance for work, study and play.",
    buttonText1: "Order Now",
    buttonText2: "Learn more",
    imgSrc: assets.header_macbook_image,
  },
];

const Header = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    setCurrentSlide((index + sliderData.length) % sliderData.length);
  };

  return (
    <section className='hero'>
      <div className='slider-container'>
        <div className='slider-track'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderData.map((slide, index) => (
            <div className="slide-wrapper" key={slide.id} aria-hidden={currentSlide !== index}>
              <div className='slide-content' >
                <p className='slide-offer'>{slide.eyebrow}</p>
                <h1 className='slide-title'>{slide.title}<br /><span>{slide.accent}</span></h1>
                <p className='slide-text'>{slide.text}</p>
                <div className='slide-buttons'>
                  <Link to="/Shop" className='btn-red' tabIndex={currentSlide === index ? 0 : -1}>
                    {slide.buttonText1} <ArrowRight size={18} />
                  </Link>
                  <Link to="/Shop" className='btn-outline' tabIndex={currentSlide === index ? 0 : -1}>
                    {slide.buttonText2}
                  </Link>
                </div>
              </div>
              <div className="slide-image">
                <div className="slide-backdrop"></div>
                <img src={slide.imgSrc} alt={`${slide.title} ${slide.accent}`} className='slide-img' />
                <div className="slide-badge">New<br />Arrivals</div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button onClick={() => handleSlideChange(currentSlide - 1)} aria-label="Previous slide"><ChevronLeft size={18} /></button>
          <div className="slider-dots">
            {sliderData.map((slide, index) => (
              <button key={slide.id} onClick={() => handleSlideChange(index)} aria-label={`Go to slide ${index + 1}`}
                className={`dot ${currentSlide === index ? "active" : ""}`}></button>
            ))}
          </div>
          <button onClick={() => handleSlideChange(currentSlide + 1)} aria-label="Next slide"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="hero-perks">
        <span><TruckIcon size={18} /> Fast delivery</span>
        <span><ShieldIcon size={18} /> Secure checkout</span>
        <span><ReturnIcon size={18} /> Easy returns</span>
      </div>
    </section>
  )
}
export default Header
