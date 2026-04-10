import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Calendar, MapPin, Clock } from 'lucide-react'
import { WORKSHOPS } from '../data/workshops'
import './BookWorkshop.css'

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Chandigarh','Puducherry',
]

const DESIGNATIONS = ['Student','Faculty','Research Scholar','Industry Professional','Other']

export default function BookWorkshop() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const workshop = WORKSHOPS.find(w => w.id === Number(id))

  const [form, setForm] = useState({
    name: '', email: '', phone: '', institution: '',
    department: '', designation: '', state: '',
    proposedDate: '', comments: '',
  })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  if (!workshop) {
    return (
      <div className="book-not-found page-enter">
        <h2>Workshop not found</h2>
        <Link to="/workshops" className="btn btn-primary">Back to Workshops</Link>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                                  e.email       = 'Valid email is required'
    if (!form.phone.match(/^\d{10}$/))
                                  e.phone       = '10-digit phone number required'
    if (!form.institution.trim()) e.institution = 'Institution name is required'
    if (!form.designation)        e.designation = 'Please select your designation'
    if (!form.state)              e.state       = 'Please select your state'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  if (submitted) {
    return (
      <div className="book-success page-enter">
        <div className="book-success__icon">
          <CheckCircle size={52} />
        </div>
        <h2>Booking Request Submitted!</h2>
        <p>
          Thank you, <strong>{form.name}</strong>. Your booking request for{' '}
          <strong>{workshop.title}</strong> has been sent to the instructor.
          You'll receive a confirmation at <strong>{form.email}</strong> within 48 hours.
        </p>
        <div className="book-success__actions">
          <Link to="/workshops" className="btn btn-primary">Browse More Workshops</Link>
          <Link to="/dashboard" className="btn btn-ghost">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page page-enter">
      <div className="container">
        <button className="btn btn-ghost btn-sm book-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back to Workshop
        </button>

        <div className="book-layout">
          {/* Form */}
          <div className="book-form-wrap">
            <div className="book-form-header">
              <p className="section-eyebrow">Step 1 of 1</p>
              <h1 className="book-form-title">Book Workshop</h1>
              <p className="book-form-sub">
                Fill in your details and the instructor will review your request.
              </p>
            </div>

            <form
              className="book-form card"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Workshop booking form"
            >
              <fieldset className="book-fieldset">
                <legend className="book-legend">Personal Information</legend>
                <div className="book-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="e.g. Rahul Sharma"
                      value={form.name} onChange={handleChange}
                      autoComplete="name"
                      aria-describedby={errors.name ? 'name-err' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span id="name-err" className="form-error" role="alert">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      placeholder="you@institution.ac.in"
                      value={form.email} onChange={handleChange}
                      autoComplete="email"
                      aria-describedby={errors.email ? 'email-err' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span id="email-err" className="form-error" role="alert">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    id="phone" name="phone" type="tel"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={form.phone} onChange={handleChange}
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    aria-describedby={errors.phone ? 'phone-err' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span id="phone-err" className="form-error" role="alert">{errors.phone}</span>}
                </div>
              </fieldset>

              <fieldset className="book-fieldset">
                <legend className="book-legend">Institution Details</legend>
                <div className="form-group">
                  <label htmlFor="institution" className="form-label">Institution Name *</label>
                  <input
                    id="institution" name="institution" type="text"
                    className={`form-input ${errors.institution ? 'form-input--error' : ''}`}
                    placeholder="e.g. NIT Trichy"
                    value={form.institution} onChange={handleChange}
                    aria-describedby={errors.institution ? 'inst-err' : undefined}
                    aria-invalid={!!errors.institution}
                  />
                  {errors.institution && <span id="inst-err" className="form-error" role="alert">{errors.institution}</span>}
                </div>
                <div className="book-row">
                  <div className="form-group">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input
                      id="department" name="department" type="text"
                      className="form-input"
                      placeholder="e.g. Computer Science"
                      value={form.department} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="designation" className="form-label">Designation *</label>
                    <select
                      id="designation" name="designation"
                      className={`form-input ${errors.designation ? 'form-input--error' : ''}`}
                      value={form.designation} onChange={handleChange}
                      aria-describedby={errors.designation ? 'desig-err' : undefined}
                      aria-invalid={!!errors.designation}
                    >
                      <option value="">Select…</option>
                      {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                    {errors.designation && <span id="desig-err" className="form-error" role="alert">{errors.designation}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="state" className="form-label">State *</label>
                  <select
                    id="state" name="state"
                    className={`form-input ${errors.state ? 'form-input--error' : ''}`}
                    value={form.state} onChange={handleChange}
                    aria-describedby={errors.state ? 'state-err' : undefined}
                    aria-invalid={!!errors.state}
                  >
                    <option value="">Select state…</option>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  {errors.state && <span id="state-err" className="form-error" role="alert">{errors.state}</span>}
                </div>
              </fieldset>

              <fieldset className="book-fieldset">
                <legend className="book-legend">Workshop Preferences</legend>
                <div className="form-group">
                  <label htmlFor="proposedDate" className="form-label">Propose Alternative Date (optional)</label>
                  <input
                    id="proposedDate" name="proposedDate" type="date"
                    className="form-input"
                    value={form.proposedDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comments" className="form-label">Additional Comments</label>
                  <textarea
                    id="comments" name="comments"
                    className="form-input book-textarea"
                    placeholder="Any specific requirements, number of participants, etc."
                    value={form.comments} onChange={handleChange}
                    rows={4}
                  />
                </div>
              </fieldset>

              <button
                type="submit"
                className="btn btn-primary btn-lg book-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <><span className="book-spinner" aria-hidden="true" /> Submitting…</>
                ) : 'Submit Booking Request'}
              </button>
            </form>
          </div>

          {/* Summary sidebar */}
          <aside className="book-summary" aria-label="Workshop summary">
            <div className="book-summary-card card">
              <div className="book-summary-card__head">
                <span className="badge badge-orange">{workshop.type}</span>
                <h3>{workshop.title}</h3>
              </div>
              <ul className="book-summary-info">
                <li><Calendar size={14} /><time dateTime={workshop.date}>{workshop.date}</time></li>
                <li><MapPin size={14} /><span>{workshop.location}</span></li>
                <li><Clock size={14} /><span>{workshop.duration}</span></li>
              </ul>
              <div className="book-summary-seats">
                <span>{workshop.seatsLeft} seats left</span>
                <div className="book-summary-bar">
                  <div style={{ width: `${Math.round(((workshop.seats - workshop.seatsLeft)/workshop.seats)*100)}%` }} />
                </div>
              </div>
              <p className="book-summary-note">
                🎉 This workshop is completely <strong>free of charge</strong>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
