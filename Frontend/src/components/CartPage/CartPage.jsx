import React, { useContext } from 'react'
import './CartPage.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {

    const { cartItems, product_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <div className="main-cart">
            <div className='cart'>
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                    {product_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)}>x</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <a href="/Shop">Continue Shopping</a>
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Order Summary</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>$ {getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery fee</p>
                                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        <button onClick={() => navigate('/Order')} >PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have a promo code, Enter it here</p>
                            <div className='cart-promocode-input'>
                                <input type="text" placeholder='Promo code' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="left">
                <div className="text">
                    <h2 className="your-cart">Your <span>Cart</span></h2>
                    <h2 className="items-h2">Items</h2>
                </div>
                <hr />
                <table width="100%" className='cart-items-title'>
                    <thead>
                        <tr>
                            <td>Product Details</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
                

            </div> */}
            {/* <div className="right">
                <h1>Order Summary</h1>
                <hr />
                <div className="order-detail">
                    <p>Items</p>
                    <h5>$5299.96</h5>
                </div>
                <div className="order-detail">
                    <p>Delivery fee</p>
                    <h5>free</h5>
                </div>
                <hr />
                <div className="order-detail">
                    <p>Total</p>
                    <h5>$0</h5>
                </div>
                <button>Place Order</button>
            </div> */}
        </div>
    )
}

export default CartPage