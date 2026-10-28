import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import ShopProducts from '../ShopProducts/ShopProducts'
import { ArrowRight, CartIcon, ReturnIcon, ShieldIcon, StarIcon, TruckIcon } from '../Icons/Icons'


const Product = () => {

  const { product_list, addToCart, cartItems } = useContext(StoreContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();


  const handleAddCart = () => {
    addToCart(productData._id);
  };

  const handleBuyNow = () => {
    addToCart(productData._id);
    navigate('/Cart')
  }

 useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top when this page loads

  const item = product_list.find(item => item._id === productId);
  if (item) {
    setProductData(item);
  }
}, [productId, product_list]);

  if (!productData) return <div className='verify'><div className="spinner"></div></div>;


  return productData ? (
    <>
      <nav className="page-crumbs product-crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><Link to="/Shop">Shop</Link><span>/</span><span aria-current="page">{productData.name}</span>
      </nav>
      <div className="product-page">
        <div className="product-gallery">
          <img src={`https://urban-nest-backend-pvvj.onrender.com/images/${productData.image}`} alt={productData.name} />
        </div>
        <div className="product-details">
          <span className="product-chip">{productData.category || 'Accessory'}</span>
          <h2>{productData.name}</h2>
          <div className="product-rating">
            {[1, 2, 3, 4].map((n) => <StarIcon key={n} size={16} />)}
            <StarIcon size={16} className="dull" />
            <span>4.5</span>
          </div>
          <div className="product-price">
            <span className="current-price">MWK {Number(productData.price).toLocaleString()}</span>
          </div>
          <p className="product-description">{productData.description}</p>
          <div className="product-buttons">
            <button className="add-cart" onClick={handleAddCart} >
              <CartIcon size={18} /> Add to Cart{cartItems[productData._id] ? ` (${cartItems[productData._id]})` : ""}
            </button>
            <button className="buy-now" onClick={handleBuyNow} >Buy now <ArrowRight size={18} /></button>
          </div>
          <ul className="product-perks">
            <li><TruckIcon size={20} /><div><b>Fast delivery</b><span>Delivered across Malawi</span></div></li>
            <li><ShieldIcon size={20} /><div><b>Secure payment</b><span>Card or mobile money</span></div></li>
            <li><ReturnIcon size={20} /><div><b>Easy returns</b><span>Hassle-free experience</span></div></li>
          </ul>
        </div>
      </div>
      <ShopProducts />
    </>

  ) : <div className='down'></div>
}

export default Product
