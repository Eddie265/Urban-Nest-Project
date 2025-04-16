import React from 'react'
import './ShopTop.css'
import { assets } from '../../assets/assets'

const ShopTop = ({ id, userId, name, description, price, offerPrice, image, category, date }) => {
    return (

        <div className="all">
            <div className='main'>
                <img src={assets.Apple_AirPods_Pro_2nd_gen} width="100%" alt="" />
                <div className="more">
                    <div className="small">
                        <img src={assets.Apple_AirPods_Pro_2nd_gen} width="100%" alt="" />
                    </div>
                    <div className="small">
                        <img src={assets.product_details_page_apple_earphone_image2} width="100%" alt="" />
                    </div>
                    <div className="small">
                        <img src={assets.product_details_page_apple_earphone_image3} width="100%" alt="" />
                    </div>
                    <div className="small">
                        <img src={assets.product_details_page_apple_earphone_image4} width="100%" alt="" />
                    </div>
                </div>
            </div>
            <div className="left">
                <h3 className='head'>Apple AirPods Pro 2nd gen</h3>

                <div className="star">
                    <div className="stars">
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_dull_icon} alt="" />
                    </div>
                    <p>(4.5)</p>
                </div>

                <p className='desc'>Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience</p>
                <h2>$399.99</h2>
                <hr />
                <div className="button1">
                    <button className='btn1'>Add to Cart</button>
                    <button className='btn2'>Buy Now</button>
                </div>
            </div>
        </div>

    )
}

export default ShopTop