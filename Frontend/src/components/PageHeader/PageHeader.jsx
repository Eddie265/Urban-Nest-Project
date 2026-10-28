import React from 'react'
import './PageHeader.css'
import { Link } from 'react-router-dom'

// Shared top banner for inner pages, styled after the home hero
const PageHeader = ({ crumb, eyebrow = "Discover. Shop. Upgrade.", title, accent, text, image, children }) => {
  return (
    <section className={`page-header ${image ? "has-image" : ""}`}>
      <div className="page-header-content">
        <nav className="page-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><span aria-current="page">{crumb}</span>
        </nav>
        <p className="page-eyebrow">{eyebrow}</p>
        <h1>{title} {accent && <span>{accent}</span>}</h1>
        {text && <p className="page-text">{text}</p>}
        {children}
      </div>
      {image && <img className="page-header-img" src={image} alt="" />}
    </section>
  )
}

export default PageHeader
