import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ArrowRight, BagIcon } from '../../components/Icons/Icons';

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setData(response.data.data);


  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])
  return (
    <div className='my-orders'>
      <PageHeader
        crumb="My Orders"
        title="My"
        accent="Orders"
        text="Track your purchases and check the latest status of every delivery."
      />
      <div className="container">
        {!data || data.length === 0
          ? <div className="empty-state">
            <span className="empty-state-icon"><BagIcon size={28} /></span>
            <h3>{token ? "No orders yet" : "Sign in to see your orders"}</h3>
            <p>{token ? "When you place an order, it will show up here." : "Use the Sign in button at the top of the page."}</p>
            <Link to="/Shop" className="btn-red">Start shopping <ArrowRight size={16} /></Link>
          </div>
          : data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
              <span className="order-icon"><img src={assets.parcel_icon} alt="" /></span>
              <p className="order-items">{(order.items || []).map((item,index)=>{
                if (index === (order.items || []).length-1) {
                  return item.name+" x "+item.quantity
                }
                else{
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              <p className="order-amount">${order.amount}.00</p>
              <p className="order-count">Items: {(order.items || []).length}</p>
              <p className="order-status"><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
