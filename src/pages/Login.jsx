import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1000)
  }

  return (
    <div className="auth-page page-enter">
      <div className="auth-card card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo__icon" aria-hidden="true">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <span className="auth-logo__text">FOSSEE Workshops</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to manage your workshops</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="auth-form" aria-label="Login form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={15} className="auth-input-icon" aria-hidden="true" />
              <input
                id="email" name="email" type="email"
                className={`form-input auth-input ${errors.email ? 'form-input--error' : ''}`}
                placeholder="you@institution.ac.in"
                value={form.email} onChange={handleChange}
                autoComplete="email"
                aria-describedby={errors.email ? 'login-email-err' : undefined}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && <span id="login-email-err" className="form-error" role="alert">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="auth-label-row">
              <label htmlFor="password" className="form-label">Password</label>
              <a href="/forgot-password" className="auth-forgot">Forgot password?</a>
            </div>
            <div className="auth-input-wrap">
              <Lock size={15} className="auth-input-icon" aria-hidden="true" />
              <input
                id="password" name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input auth-input auth-input--pass ${errors.password ? 'form-input--error' : ''}`}
                placeholder="••••••••"
                value={form.password} onChange={handleChange}
                autoComplete="current-password"
                aria-describedby={errors.password ? 'login-pass-err' : undefined}
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
            {errors.password && <span id="login-pass-err" className="form-error" role="alert">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <><span className="book-spinner" aria-hidden="true" /> Signing in…</> : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}
