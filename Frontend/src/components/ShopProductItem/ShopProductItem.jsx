import { useContext, useEffect, useState } from 'react'
import './ShopProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

const ShopProductItem = ({ id, userId, name, description, price, offerPrice, image, category, date }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();



  const handleBuyNow = () => {
    addToCart(id);
    setTimeout(() => {
      navigate('/cart');
    }, 100); // short delay to ensure cart updates
  };



  return (
    <div className='product-item'>
      <div className="products-item-img-container1">
        <img className='heart-icon' src={assets.heart_icon} alt="" />
        <Link to={`/product/${id}`}><img className='product-image' src={url + "/images/" + image} alt="" /></Link>
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <p className='name1'>{name}</p>
      <p className='disc'>{description.length > 60 ? description.slice(0, 60) + '...' : description}</p>
      <div className="product-info1">
        <p className='rate1'>4.5</p>
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_dull_icon} alt="" />
      </div>
      <button onClick={handleBuyNow}>Buy Now</button>
      <p className='price1'>MWK {price}</p>
    </div>
  )
}

export default ShopProductItem