import React, { useEffect, useState } from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Header = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn more",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (

    <div className='slider-container'>
      <div className='slider-track'
        style={{ transform: `translatex(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div className="slide-wrapper" key={slide.id}
          >
            <div className='slide' key={slide.id} >
              <div className='slide-content' >
                <p className='slide-offer'>{slide.offer}</p>
                <h1 className='slide-title'>{slide.title}</h1>
                <div className='slide-buttons'>
                  <button className='primary-btn'>{slide.buttonText1}</button>
                  <button className='secondary-btn'><Link to="/Shop">
                    {slide.buttonText2}
                   </Link>
                    <img src={assets.arrow_icon} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>
            <div className="slide-image">
            </div>

            <img src={slide.imgSrc} alt={`Slide ${index + 1}`}
              className='slide-img' />
          </div>


        ))}
      </div>
      <div className="slider-dots">
        {sliderData.map((slide, index) => (
          <div key={slide.id} onClick={() => handleSlideChange(index)}
            className={`dot ${currentSlide === index ? "active" : ""}`}></div>
        ))}
      </div>
    </div>
  )
}
export default Header