import React from 'react'
import './Features.css'
import { TruckIcon, ShieldIcon, ReturnIcon, HeadsetIcon } from '../Icons/Icons'

const features = [
  { Icon: TruckIcon, title: "Nationwide Delivery", text: "Fast delivery across Malawi" },
  { Icon: ShieldIcon, title: "Secure Payments", text: "Safe & secure checkout" },
  { Icon: ReturnIcon, title: "Easy Returns", text: "Hassle-free returns" },
  { Icon: HeadsetIcon, title: "Customer Support", text: "We're here to help" },
]

const Features = () => {
  return (
    <section className='features'>
      {features.map(({ Icon, title, text }) => (
        <div className='feature' key={title}>
          <span className='feature-icon'><Icon size={26} /></span>
          <div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Features
