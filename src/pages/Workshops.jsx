import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import WorkshopCard from '../components/WorkshopCard'
import { WORKSHOPS } from '../data/workshops'
import './Workshops.css'

const TYPES   = ['All', 'Python', 'Scilab', 'OpenFOAM', 'DWSIM']
const STATES  = ['All States', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'Telangana']
const STATUSES = ['All', 'upcoming', 'completed']

export default function Workshops() {
  const [query,  setQuery]  = useState('')
  const [type,   setType]   = useState('All')
  const [state,  setState]  = useState('All States')
  const [status, setStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return WORKSHOPS.filter(w => {
      const matchQ = w.title.toLowerCase().includes(query.toLowerCase()) ||
                     w.location.toLowerCase().includes(query.toLowerCase()) ||
                     w.instructor.toLowerCase().includes(query.toLowerCase())
      const matchT = type   === 'All'        || w.type   === type
      const matchS = state  === 'All States' || w.state  === state
      const matchSt = status === 'All'       || w.status === status
      return matchQ && matchT && matchS && matchSt
    })
  }, [query, type, state, status])

  const clearFilters = () => {
    setQuery(''); setType('All'); setState('All States'); setStatus('All')
  }

  const hasFilters = query || type !== 'All' || state !== 'All States' || status !== 'All'

  return (
    <div className="workshops-page page-enter">
      {/* Page header */}
      <div className="workshops-header">
        <div className="container">
          <p className="section-eyebrow">Explore</p>
          <h1 className="workshops-header__title">All Workshops</h1>
          <p className="workshops-header__sub">
            Find and book free open-source workshops happening across India.
          </p>
        </div>
      </div>

      <div className="container workshops-body">
        {/* Search + filter bar */}
        <div className="filter-bar">
          <div className="filter-bar__search">
            <Search size={16} aria-hidden="true" className="filter-bar__search-icon" />
            <input
              type="search"
              className="filter-bar__input"
              placeholder="Search by title, location or instructor…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search workshops"
            />
            {query && (
              <button className="filter-bar__clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            className={`btn btn-ghost btn-sm filter-bar__toggle ${showFilters ? 'filter-bar__toggle--active' : ''}`}
            onClick={() => setShowFilters(v => !v)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <SlidersHorizontal size={15} /> Filters
            {hasFilters && <span className="filter-bar__dot" aria-label="Filters active" />}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div id="filter-panel" className="filter-panel" role="region" aria-label="Filter options">
            <div className="filter-group">
              <label className="form-label">Type</label>
              <div className="filter-pills">
                {TYPES.map(t => (
                  <button
                    key={t}
                    className={`filter-pill ${type === t ? 'filter-pill--active' : ''}`}
                    onClick={() => setType(t)}
                    aria-pressed={type === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="state-select" className="form-label">State</label>
              <select
                id="state-select"
                className="form-input filter-select"
                value={state}
                onChange={e => setState(e.target.value)}
              >
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Status</label>
              <div className="filter-pills">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    className={`filter-pill ${status === s ? 'filter-pill--active' : ''}`}
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                  >
                    {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button className="btn btn-ghost btn-sm filter-panel__clear" onClick={clearFilters}>
                <X size={14} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="workshops-count" aria-live="polite">
          {filtered.length === 0
            ? 'No workshops found'
            : `${filtered.length} workshop${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="workshops-grid">
            {filtered.map(w => <WorkshopCard key={w.id} workshop={w} />)}
          </div>
        ) : (
          <div className="workshops-empty">
            <div className="workshops-empty__icon" aria-hidden="true">🔍</div>
            <h3>No workshops match your filters</h3>
            <p>Try broadening your search or clearing some filters.</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
