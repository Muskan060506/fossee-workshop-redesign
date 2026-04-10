import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, ChevronDown } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Workshops', to: '/workshops' },
  { label: 'Dashboard', to: '/dashboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  /* Close mobile menu on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  /* Detect scroll for shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="FOSSEE Workshop Portal home">
          <div className="navbar__logo-icon" aria-hidden="true">
            <BookOpen size={20} strokeWidth={2.2} />
          </div>
          <span className="navbar__logo-text">
            <span className="navbar__logo-fossee">FOSSEE</span>
            <span className="navbar__logo-sep" aria-hidden="true"> · </span>
            <span className="navbar__logo-portal">Workshops</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${pathname.startsWith(to) ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="navbar__actions">
          <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__mobile-link ${pathname.startsWith(to) ? 'navbar__mobile-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <div className="navbar__mobile-actions">
            <Link to="/login" className="btn btn-ghost" style={{ width: '100%' }}>Log in</Link>
            <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Register</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
