import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound page-enter">
      <div className="notfound__code" aria-hidden="true">404</div>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__sub">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="notfound__actions">
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/workshops" className="btn btn-ghost">Browse Workshops</Link>
      </div>
    </div>
  )
}
