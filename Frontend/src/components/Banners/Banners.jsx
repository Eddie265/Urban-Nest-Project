import React from 'react'
import './Banners.css'
import { assets } from '../../assets/assets'

const Banners = () => {
  return (
    <div className='Banner'>
        <h4>Featured Products</h4>
        <div className="banners">
          <div id="banner1">
            <div className="banner1">
                <img src={assets.girl_with_headphone_image} alt="" />
                <h3>Unparalleled Sound</h3>
                <p>Experience crystal-clear audio with premium headphones</p>
                <button>Buy now</button>
            </div>
          </div>
          <div id="banner2">
              <div className="banner2">
                <img src={assets.girl_with_earphone_image} alt="" />
                <h3>Stay Connected</h3>
                <p>Compact and stylish earphones for every occasion.</p>
                <button>Buy now</button>
              </div>
          </div>
          <div id="banner3">
              <div className="banner3">
                <img src={assets.boy_with_laptop_image} alt="" />
                <h3>Power in Every Pixeled Sound</h3>
                <p>Shop the latest laptops for work, gaming, and more</p>
                <button>Buy now</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Banners