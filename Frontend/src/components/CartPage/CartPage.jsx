import React, { useContext } from 'react'
import './CartPage.css'
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import { ArrowRight, CartIcon, ChevronLeft, ShieldIcon, CloseIcon } from '../Icons/Icons'

const CartPage = () => {

    const { cartItems, product_list, addToCart, removeFromCart, getTotalCartAmount, getTotalQuantity, url } = useContext(StoreContext);

    const navigate = useNavigate();

    const itemsInCart = product_list.filter((item) => cartItems[item._id] > 0);

    const removeAll = (itemId) => {
        for (let i = 0; i < cartItems[itemId]; i++) {
            removeFromCart(itemId);
        }
    }

    return (
        <div className="main-cart">
            <PageHeader
                crumb="Cart"
                title="Your Shopping"
                accent="Cart"
                text={getTotalQuantity() > 0 ? `You have ${getTotalQuantity()} item${getTotalQuantity() === 1 ? "" : "s"} in your cart.` : "Your cart is waiting to be filled."}
            />
            <div className='cart page-layout'>
                <div className="cart-items">
                    {itemsInCart.length === 0
                        ? <div className="empty-state">
                            <span className="empty-state-icon"><CartIcon size={28} /></span>
                            <h3>Your cart is empty</h3>
                            <p>Explore our latest gadgets and add something you love.</p>
                            <Link to="/Shop" className="btn-red">Start shopping <ArrowRight size={16} /></Link>
                        </div>
                        : <>
                            <div className="cart-items-title">
                                <p>Product</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Total</p>
                                <p></p>
                            </div>
                            {itemsInCart.map((item) => (
                                <div key={item._id} className='cart-items-title cart-items-item'>
                                    <div className="cart-product">
                                        <Link to={`/product/${item._id}`}><img src={url + "/images/" + item.image} alt={item.name} /></Link>
                                        <div>
                                            <Link to={`/product/${item._id}`} className="cart-product-name">{item.name}</Link>
                                            {item.category && <p className="cart-product-cat">{item.category}</p>}
                                        </div>
                                    </div>
                                    <p className="cart-cell" data-label="Price">${item.price}</p>
                                    <div className="cart-qty" data-label="Quantity">
                                        <button onClick={() => removeFromCart(item._id)} aria-label={`Remove one ${item.name}`}>−</button>
                                        <span>{cartItems[item._id]}</span>
                                        <button onClick={() => addToCart(item._id)} aria-label={`Add one ${item.name}`}>+</button>
                                    </div>
                                    <p className="cart-cell cart-line-total" data-label="Total">${item.price * cartItems[item._id]}</p>
                                    <button className="cart-remove" onClick={() => removeAll(item._id)} aria-label={`Remove ${item.name}`}><CloseIcon size={16} /></button>
                                </div>
                            ))}
                        </>}
                    <Link to="/Shop" className="cart-continue"><ChevronLeft size={16} /> Continue Shopping</Link>
                </div>

                <div className="cart-bottom">
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <p>Subtotal</p>
                            <p>$ {getTotalCartAmount()}</p>
                        </div>
                        <div className="summary-row">
                            <p>Delivery fee</p>
                            <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <div className="summary-row total">
                            <b>Total</b>
                            <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                        <button className="btn-red" onClick={() => navigate('/Order')} disabled={getTotalCartAmount() === 0} >Proceed to checkout <ArrowRight size={16} /></button>
                        <p className="summary-note"><ShieldIcon size={16} /> Secure checkout with Stripe & PayChangu</p>
                    </div>
                    <div className="cart-promocode">
                        <p>Have a promo code? Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='Promo code' />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
