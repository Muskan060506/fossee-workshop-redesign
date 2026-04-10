import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building, Eye, EyeOff, BookOpen } from 'lucide-react'
import './Auth.css'

const ROLES = ['Coordinator','Instructor']

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', institution: '', role: '',
    password: '', confirm: ''
  })
  const [showPass, setShowPass]  = useState(false)
  const [errors, setErrors]      = useState({})
  const [loading, setLoading]    = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim())          errs.name        = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.institution.trim())   errs.institution = 'Institution is required'
    if (!form.role)                 errs.role        = 'Please select a role'
    if (form.password.length < 8)   errs.password    = 'Minimum 8 characters'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1200)
  }

  return (
    <div className="auth-page page-enter">
      <div className="auth-card card auth-card--wide">
        <div className="auth-logo">
          <div className="auth-logo__icon" aria-hidden="true">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <span className="auth-logo__text">FOSSEE Workshops</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Join as an instructor or coordinator</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="auth-form" aria-label="Registration form">
          <div className="auth-row">
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">Full Name *</label>
              <div className="auth-input-wrap">
                <User size={15} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="reg-name" name="name" type="text"
                  className={`form-input auth-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Your full name"
                  value={form.name} onChange={handleChange} autoComplete="name"
                  aria-invalid={!!errors.name}
                />
              </div>
              {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">Email Address *</label>
              <div className="auth-input-wrap">
                <Mail size={15} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="reg-email" name="email" type="email"
                  className={`form-input auth-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="you@institution.ac.in"
                  value={form.email} onChange={handleChange} autoComplete="email"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
            </div>
          </div>

          <div className="auth-row">
            <div className="form-group">
              <label htmlFor="reg-institution" className="form-label">Institution *</label>
              <div className="auth-input-wrap">
                <Building size={15} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="reg-institution" name="institution" type="text"
                  className={`form-input auth-input ${errors.institution ? 'form-input--error' : ''}`}
                  placeholder="Your college or university"
                  value={form.institution} onChange={handleChange}
                  aria-invalid={!!errors.institution}
                />
              </div>
              {errors.institution && <span className="form-error" role="alert">{errors.institution}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-role" className="form-label">Role *</label>
              <select
                id="reg-role" name="role"
                className={`form-input ${errors.role ? 'form-input--error' : ''}`}
                value={form.role} onChange={handleChange}
                aria-invalid={!!errors.role}
              >
                <option value="">Select role…</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.role && <span className="form-error" role="alert">{errors.role}</span>}
            </div>
          </div>

          <div className="auth-row">
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">Password *</label>
              <div className="auth-input-wrap">
                <Lock size={15} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="reg-password" name="password"
                  type={showPass ? 'text' : 'password'}
                  className={`form-input auth-input auth-input--pass ${errors.password ? 'form-input--error' : ''}`}
                  placeholder="Min 8 characters"
                  value={form.password} onChange={handleChange}
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  className="auth-toggle-pass"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="form-error" role="alert">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm" className="form-label">Confirm Password *</label>
              <div className="auth-input-wrap">
                <Lock size={15} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="reg-confirm" name="confirm"
                  type={showPass ? 'text' : 'password'}
                  className={`form-input auth-input ${errors.confirm ? 'form-input--error' : ''}`}
                  placeholder="Repeat password"
                  value={form.confirm} onChange={handleChange}
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirm}
                />
              </div>
              {errors.confirm && <span className="form-error" role="alert">{errors.confirm}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <><span className="book-spinner" aria-hidden="true" /> Creating account…</> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
