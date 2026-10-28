import React, { useContext } from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { HeartIcon, StarIcon } from '../Icons/Icons'

const ProductItem = ({ id, name, description, price, image, category }) => {


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
      <div className="products-item-img-container">
        <span className='heart-icon' aria-hidden="true"><HeartIcon size={16} /></span>
        <Link to={`/product/${id}`} className='product-image-link'>
          <img className='product-item-image' src={url + "/images/" + image} alt={name} loading="lazy" />
        </Link>
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to cart" />
          : <div className='item-container'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove one" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add one" />
          </div>

        }
      </div>
      <div className="product-item-body">
        <div className="product-item-top">
          <Link to={`/product/${id}`} className='name'>{name}</Link>
          {category && <span className='product-category'>{category}</span>}
        </div>
        <p className='disc'>{description.length > 60 ? description.slice(0, 60) + '...' : description}</p>
        <div className="product-item-bottom">
          <p className='price'>MWK {Number(price).toLocaleString()}</p>
          <span className='rate'><StarIcon size={14} /> 4.5</span>
        </div>
        <button onClick={handleBuyNow} >Buy Now</button>
      </div>
    </div>
  )
}

export default ProductItem
