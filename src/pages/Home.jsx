import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Users, BookOpen, TrendingUp, ChevronRight } from 'lucide-react'
import WorkshopCard from '../components/WorkshopCard'
import { WORKSHOPS, STATS } from '../data/workshops'
import './Home.css'

/* Counter animation hook */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

function StatCounter({ value, label, suffix = '' }) {
  const count = useCountUp(value)
  return (
    <div className="stat-item">
      <span className="stat-value">{count.toLocaleString()}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

const FEATURES = [
  {
    icon: <BookOpen size={22} />,
    title: 'Expert-Led Workshops',
    desc: 'Learn directly from IIT faculty and industry professionals using 100% open-source tools.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Pan-India Reach',
    desc: 'Workshops across 28 states — bringing quality education to every corner of India.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Free & Accessible',
    desc: 'All FOSSEE workshops are completely free. Just bring your curiosity.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Career Ready Skills',
    desc: 'Python, Scilab, OpenFOAM — tools used in academia and industry worldwide.',
  },
]

export default function Home() {
  const featured = WORKSHOPS.filter(w => w.status === 'upcoming').slice(0, 3)

  return (
    <div className="home page-enter">
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__grid" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="badge badge-orange hero__eyebrow">
              Free &nbsp;·&nbsp; Open Source &nbsp;·&nbsp; IIT Bombay
            </span>
            <h1 id="hero-heading" className="hero__heading">
              Level up with<br />
              <span className="hero__heading-accent">open-source</span><br />
              workshops
            </h1>
            <p className="hero__sub">
              Book Python, Scilab, OpenFOAM and more — directly with FOSSEE instructors.
              Free workshops for students and faculty across India.
            </p>
            <div className="hero__actions">
              <Link to="/workshops" className="btn btn-primary btn-lg">
                Browse Workshops <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn hero__secondary-btn btn-lg">
                Become a Coordinator
              </Link>
            </div>
          </div>

          {/* Hero card preview */}
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__card">
              <div className="hero__card-top">
                <span className="badge badge-orange">Python</span>
                <span className="badge badge-green">Upcoming</span>
              </div>
              <h3>Python for Scientific Computing</h3>
              <p>IIT Bombay · Aug 15, 2025</p>
              <div className="hero__card-bar">
                <div className="hero__card-fill" style={{ width: '64%' }} />
              </div>
              <span>18 / 50 seats left</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-bar" aria-label="Key statistics">
        <div className="container stats-bar__inner">
          <StatCounter value={STATS.totalWorkshops} label="Workshops Conducted" suffix="+" />
          <div className="stats-bar__divider" aria-hidden="true" />
          <StatCounter value={STATS.statesReached} label="States Reached" />
          <div className="stats-bar__divider" aria-hidden="true" />
          <StatCounter value={STATS.studentsImpacted} label="Students Impacted" suffix="+" />
          <div className="stats-bar__divider" aria-hidden="true" />
          <StatCounter value={STATS.activeInstructors} label="Active Instructors" />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features section" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Why FOSSEE</p>
            <h2 id="features-heading" className="section-title">
              Education that's truly free
            </h2>
            <p className="section-subtitle">
              FOSSEE promotes the use of open-source software in science and engineering
              education through workshops, textbook companions, and lab migration projects.
            </p>
          </div>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-card__icon" aria-hidden="true">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Workshops ── */}
      <section className="featured section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header section-header--row">
            <div>
              <p className="section-eyebrow">Upcoming</p>
              <h2 id="featured-heading" className="section-title">Featured Workshops</h2>
            </div>
            <Link to="/workshops" className="btn btn-ghost btn-sm">
              See all <ChevronRight size={15} />
            </Link>
          </div>
          <div className="featured__grid">
            {featured.map(w => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container cta-banner__inner">
          <div>
            <h2 id="cta-heading" className="cta-banner__title">
              Want to host a workshop at your institution?
            </h2>
            <p className="cta-banner__sub">
              Register as a coordinator and connect with FOSSEE instructors to bring
              free workshops to your campus.
            </p>
          </div>
          <Link to="/register" className="btn btn-primary btn-lg cta-banner__btn">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
