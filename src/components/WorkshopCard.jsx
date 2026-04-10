import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react'
import './WorkshopCard.css'

const TYPE_COLORS = {
  Python:    'badge-orange',
  Scilab:    'badge-teal',
  DWSIM:     'badge-navy',
  OpenFOAM:  'badge-green',
  Default:   'badge-gray',
}

export default function WorkshopCard({ workshop }) {
  const {
    id, title, type, date, location, instructor,
    seats, seatsLeft, duration, status
  } = workshop

  const badgeClass = TYPE_COLORS[type] || TYPE_COLORS.Default
  const pct = Math.round(((seats - seatsLeft) / seats) * 100)
  const full = seatsLeft === 0

  return (
    <article className="workshop-card card" aria-label={`Workshop: ${title}`}>
      {/* Top color accent */}
      <div className="workshop-card__accent" aria-hidden="true" />

      <div className="workshop-card__body">
        <div className="workshop-card__meta-row">
          <span className={`badge ${badgeClass}`}>{type}</span>
          {status === 'upcoming' && (
            <span className="badge badge-green">Upcoming</span>
          )}
          {status === 'completed' && (
            <span className="badge badge-gray">Completed</span>
          )}
          {full && <span className="badge badge-red">Full</span>}
        </div>

        <h3 className="workshop-card__title">{title}</h3>

        <ul className="workshop-card__info" role="list">
          <li>
            <Calendar size={14} aria-hidden="true" />
            <time dateTime={date}>{date}</time>
          </li>
          <li>
            <MapPin size={14} aria-hidden="true" />
            <span>{location}</span>
          </li>
          <li>
            <Clock size={14} aria-hidden="true" />
            <span>{duration}</span>
          </li>
          <li>
            <Users size={14} aria-hidden="true" />
            <span>{seatsLeft} / {seats} seats left</span>
          </li>
        </ul>

        {/* Seats progress */}
        <div className="workshop-card__seats-bar" role="progressbar"
          aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${pct}% seats filled`}>
          <div
            className="workshop-card__seats-fill"
            style={{ width: `${pct}%`, '--pct': pct }}
          />
        </div>

        <div className="workshop-card__footer">
          <span className="workshop-card__instructor">By {instructor}</span>
          <Link
            to={`/workshops/${id}`}
            className="workshop-card__link btn btn-primary btn-sm"
            aria-label={`View details for ${title}`}
          >
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
