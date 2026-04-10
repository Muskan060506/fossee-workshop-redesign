import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Calendar, MapPin, Users, Clock, Mail,
  CheckCircle, ArrowLeft, BookOpen, AlertCircle
} from 'lucide-react'
import { WORKSHOPS } from '../data/workshops'
import './WorkshopDetail.css'

const TYPE_COLORS = {
  Python:   'badge-orange',
  Scilab:   'badge-teal',
  DWSIM:    'badge-navy',
  OpenFOAM: 'badge-green',
}

export default function WorkshopDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const workshop   = WORKSHOPS.find(w => w.id === Number(id))

  if (!workshop) {
    return (
      <div className="detail-not-found page-enter">
        <AlertCircle size={48} />
        <h2>Workshop not found</h2>
        <p>The workshop you're looking for doesn't exist or has been removed.</p>
        <Link to="/workshops" className="btn btn-primary">Browse Workshops</Link>
      </div>
    )
  }

  const {
    title, type, date, location, instructor, contactEmail,
    seats, seatsLeft, duration, status, description,
    prerequisites, topics
  } = workshop

  const pct  = Math.round(((seats - seatsLeft) / seats) * 100)
  const full  = seatsLeft === 0
  const badge = TYPE_COLORS[type] || 'badge-gray'

  return (
    <div className="detail-page page-enter">
      {/* Back */}
      <div className="container detail-back">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <div className="container detail-layout">
        {/* Main content */}
        <article className="detail-main">
          <div className="detail-meta-row">
            <span className={`badge ${badge}`}>{type}</span>
            {status === 'upcoming' && <span className="badge badge-green">Upcoming</span>}
            {status === 'completed' && <span className="badge badge-gray">Completed</span>}
            {full && <span className="badge badge-red">Fully Booked</span>}
          </div>

          <h1 className="detail-title">{title}</h1>

          <ul className="detail-info-grid" role="list">
            <li className="detail-info-item">
              <Calendar size={16} aria-hidden="true" />
              <div>
                <span className="detail-info-label">Date</span>
                <time className="detail-info-value" dateTime={date}>{date}</time>
              </div>
            </li>
            <li className="detail-info-item">
              <MapPin size={16} aria-hidden="true" />
              <div>
                <span className="detail-info-label">Location</span>
                <span className="detail-info-value">{location}</span>
              </div>
            </li>
            <li className="detail-info-item">
              <Clock size={16} aria-hidden="true" />
              <div>
                <span className="detail-info-label">Duration</span>
                <span className="detail-info-value">{duration}</span>
              </div>
            </li>
            <li className="detail-info-item">
              <BookOpen size={16} aria-hidden="true" />
              <div>
                <span className="detail-info-label">Instructor</span>
                <span className="detail-info-value">{instructor}</span>
              </div>
            </li>
          </ul>

          <section className="detail-section">
            <h2 className="detail-section-title">About this Workshop</h2>
            <p className="detail-description">{description}</p>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Topics Covered</h2>
            <ul className="detail-topics" role="list">
              {topics.map((t, i) => (
                <li key={i} className="detail-topic">
                  <CheckCircle size={15} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Prerequisites</h2>
            <ul className="detail-prereqs" role="list">
              {prerequisites.map((p, i) => (
                <li key={i} className="detail-prereq">
                  <span className="detail-prereq-dot" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="detail-sidebar" aria-label="Booking information">
          <div className="booking-card card">
            <div className="booking-card__head">
              <h3>Workshop Booking</h3>
              <p className="booking-card__free">Free of Charge</p>
            </div>

            <div className="booking-card__body">
              {/* Seats */}
              <div className="booking-seats">
                <div className="booking-seats__row">
                  <span className="booking-seats__label">
                    <Users size={14} aria-hidden="true" />
                    Seats Available
                  </span>
                  <span className={`booking-seats__count ${full ? 'booking-seats__count--full' : ''}`}>
                    {seatsLeft} / {seats}
                  </span>
                </div>
                <div
                  className="booking-seats__bar"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${pct}% seats taken`}
                >
                  <div
                    className="booking-seats__fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="booking-seats__note">
                  {full
                    ? 'This workshop is fully booked.'
                    : `${seatsLeft} seat${seatsLeft !== 1 ? 's' : ''} remaining — book now!`}
                </p>
              </div>

              {/* CTA */}
              {status === 'upcoming' && !full && (
                <Link
                  to={`/workshops/${id}/book`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Book This Workshop
                </Link>
              )}
              {full && (
                <button className="btn btn-ghost" disabled style={{ width: '100%', opacity: 0.6 }}>
                  Workshop Full
                </button>
              )}
              {status === 'completed' && (
                <button className="btn btn-ghost" disabled style={{ width: '100%', opacity: 0.6 }}>
                  Workshop Completed
                </button>
              )}

              {/* Contact */}
              <a href={`mailto:${contactEmail}`} className="booking-contact">
                <Mail size={14} aria-hidden="true" />
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Propose date card */}
          {status === 'upcoming' && (
            <div className="propose-card card">
              <h4 className="propose-card__title">Different date?</h4>
              <p>Coordinators can propose alternative dates if the listed date doesn't work.</p>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ marginTop: 4 }}>
                Propose a Date
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
