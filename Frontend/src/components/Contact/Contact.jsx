import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets'

const Contact = () => {
  return (
    <div className='contact'>
      <h1>Get in Touch</h1>
      <p><img src={assets.mail} alt="" />urbannest@gmail.com</p>
      <p><img src={assets.phone} alt="" />+265 990-854-388-calls & Whatsapp Or  +265 899-550-872 calls</p>
    </div>
  )
}

export default Contact