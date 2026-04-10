import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Github, Mail, ExternalLink } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon" aria-hidden="true">
              <BookOpen size={18} strokeWidth={2.2} />
            </div>
            <span className="footer__logo-text">FOSSEE Workshops</span>
          </div>
          <p className="footer__tagline">
            Free &amp; Open Source Software for Science &amp; Engineering Education
            — IIT Bombay
          </p>
          <div className="footer__social">
            <a href="https://github.com/FOSSEE/workshop_booking" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="mailto:pythonsupport@fossee.in" aria-label="Email FOSSEE">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h3 className="footer__col-title">Portal</h3>
            <ul>
              <li><Link to="/workshops">Browse Workshops</Link></li>
              <li><Link to="/register">Become a Coordinator</Link></li>
              <li><Link to="/login">Instructor Login</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Resources</h3>
            <ul>
              <li><a href="https://fossee.in" target="_blank" rel="noopener noreferrer">FOSSEE Website <ExternalLink size={12} /></a></li>
              <li><a href="https://spoken-tutorial.org" target="_blank" rel="noopener noreferrer">Spoken Tutorials <ExternalLink size={12} /></a></li>
              <li><a href="https://github.com/FOSSEE/workshop_booking/blob/master/docs/Getting_Started.md" target="_blank" rel="noopener noreferrer">Getting Started <ExternalLink size={12} /></a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">Support</h3>
            <ul>
              <li><a href="mailto:pythonsupport@fossee.in">Python Support</a></li>
              <li><a href="https://github.com/FOSSEE/workshop_booking/issues" target="_blank" rel="noopener noreferrer">Report an Issue <ExternalLink size={12} /></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} FOSSEE, IIT Bombay. Released under GPL-3.0.</span>
          <span className="footer__bottom-made">Made with ♥ for open source education</span>
        </div>
      </div>
    </footer>
  )
}
