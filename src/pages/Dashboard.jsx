import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { CheckCircle, XCircle, Clock, Trash2, MessageSquare, TrendingUp, Users, BookOpen, Award } from 'lucide-react'
import { WORKSHOPS, MONTHLY_DATA, TYPE_DATA, STATS } from '../data/workshops'
import './Dashboard.css'

/* Simulated instructor view */
const PENDING = [
  { id: 101, title: 'Python for Scientific Computing', coordinator: 'Dr. Meera Pillai', institution: 'RVCE Bangalore', date: '2025-08-15', proposed: null },
  { id: 102, title: 'Scilab for Signal Processing',   coordinator: 'Prof. Aman Singh',   institution: 'DTU Delhi',        date: '2025-08-22', proposed: '2025-09-01' },
  { id: 103, title: 'Python Data Science Bootcamp',   coordinator: 'Ms. Priya Desai',    institution: 'VJTI Mumbai',       date: '2025-09-05', proposed: null },
]

const STATUS_ICONS = {
  accepted:  <CheckCircle size={15} />,
  rejected:  <XCircle size={15} />,
  pending:   <Clock size={15} />,
}
const STATUS_BADGE = {
  accepted: 'badge-green',
  rejected: 'badge-red',
  pending:  'badge-orange',
}

export default function Dashboard() {
  const [requests, setRequests] = useState(
    PENDING.map(r => ({ ...r, status: 'pending' }))
  )
  const [activeTab, setActiveTab] = useState('overview')

  const handle = (id, action) => {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: action } : r))
  }

  const upcoming = WORKSHOPS.filter(w => w.status === 'upcoming')

  return (
    <div className="dashboard page-enter">
      {/* Top bar */}
      <div className="dash-topbar">
        <div className="container dash-topbar__inner">
          <div>
            <p className="section-eyebrow">Instructor Portal</p>
            <h1 className="dash-topbar__title">Dashboard</h1>
          </div>
          <div className="dash-topbar__user">
            <div className="dash-avatar" aria-hidden="true">PA</div>
            <div>
              <p className="dash-topbar__name">Prof. Amit Setia</p>
              <p className="dash-topbar__role">Python Instructor · IIT Bombay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container dash-body">
        {/* Tabs */}
        <nav className="dash-tabs" role="tablist" aria-label="Dashboard sections">
          {['overview', 'requests', 'workshops'].map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={activeTab === t}
              className={`dash-tab ${activeTab === t ? 'dash-tab--active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="dash-overview" role="tabpanel">
            {/* KPI cards */}
            <div className="kpi-grid">
              {[
                { icon: <BookOpen size={20} />, label: 'Workshops Given',   value: 24 },
                { icon: <Users size={20} />,    label: 'Students Trained',  value: '960+' },
                { icon: <Award size={20} />,    label: 'States Visited',    value: 8 },
                { icon: <TrendingUp size={20} />,label: 'This Month',       value: 3 },
              ].map((k, i) => (
                <div key={i} className="kpi-card card">
                  <div className="kpi-card__icon" aria-hidden="true">{k.icon}</div>
                  <span className="kpi-card__value">{k.value}</span>
                  <span className="kpi-card__label">{k.label}</span>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="dash-charts">
              <div className="dash-chart-card card">
                <h3 className="dash-chart-title">Monthly Workshop Count</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={MONTHLY_DATA} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ border: 'none', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 13 }}
                      cursor={{ fill: 'rgba(244,128,26,0.08)' }}
                    />
                    <Bar dataKey="workshops" fill="#f4801a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="dash-chart-card card">
                <h3 className="dash-chart-title">Workshop Types</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={TYPE_DATA} cx="50%" cy="50%"
                      innerRadius={55} outerRadius={85}
                      paddingAngle={3} dataKey="value"
                    >
                      {TYPE_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ border: 'none', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 13 }}
                      formatter={(v, n) => [`${v}%`, n]}
                    />
                    <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming workshops mini-list */}
            <div className="dash-upcoming card">
              <h3 className="dash-section-title">Upcoming Workshops</h3>
              <ul className="dash-workshop-list">
                {upcoming.map(w => (
                  <li key={w.id} className="dash-workshop-row">
                    <div className="dash-workshop-info">
                      <span className={`badge ${w.type === 'Python' ? 'badge-orange' : 'badge-teal'}`}>{w.type}</span>
                      <span className="dash-workshop-title">{w.title}</span>
                    </div>
                    <div className="dash-workshop-meta">
                      <time className="dash-workshop-date" dateTime={w.date}>{w.date}</time>
                      <span className="dash-workshop-seats">{w.seatsLeft} seats left</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── Requests ── */}
        {activeTab === 'requests' && (
          <div className="dash-requests" role="tabpanel">
            <p className="dash-panel-sub">{requests.filter(r => r.status === 'pending').length} pending approval</p>
            <div className="requests-list">
              {requests.map(req => (
                <div key={req.id} className="request-card card">
                  <div className="request-card__header">
                    <div>
                      <h3 className="request-card__title">{req.title}</h3>
                      <p className="request-card__sub">
                        {req.coordinator} · {req.institution}
                      </p>
                    </div>
                    <span className={`badge ${STATUS_BADGE[req.status]}`}>
                      {STATUS_ICONS[req.status]}
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>

                  <div className="request-card__dates">
                    <span><strong>Requested:</strong> {req.date}</span>
                    {req.proposed && (
                      <span className="request-card__proposed">
                        <Clock size={13} /> Proposed: {req.proposed}
                      </span>
                    )}
                  </div>

                  {req.status === 'pending' && (
                    <div className="request-card__actions">
                      <button
                        className="btn btn-sm"
                        style={{ background: '#059669', color: 'white', borderColor: '#059669' }}
                        onClick={() => handle(req.id, 'accepted')}
                        aria-label={`Accept workshop request from ${req.coordinator}`}
                      >
                        <CheckCircle size={14} /> Accept
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#dc2626', color: 'white', borderColor: '#dc2626' }}
                        onClick={() => handle(req.id, 'rejected')}
                        aria-label={`Reject workshop request from ${req.coordinator}`}
                      >
                        <XCircle size={14} /> Reject
                      </button>
                      <button className="btn btn-ghost btn-sm" aria-label="Add comment">
                        <MessageSquare size={14} /> Comment
                      </button>
                      <button className="btn btn-ghost btn-sm" aria-label="Delete request">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Workshops ── */}
        {activeTab === 'workshops' && (
          <div role="tabpanel">
            <p className="dash-panel-sub">{upcoming.length} upcoming workshops</p>
            <div className="workshops-table-wrap">
              <table className="workshops-table" aria-label="Workshops table">
                <thead>
                  <tr>
                    <th scope="col">Workshop</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Seats</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKSHOPS.map(w => (
                    <tr key={w.id}>
                      <td>
                        <div className="table-cell-title">
                          <span className={`badge ${w.type === 'Python' ? 'badge-orange' : w.type === 'Scilab' ? 'badge-teal' : 'badge-navy'}`}>{w.type}</span>
                          <span>{w.title}</span>
                        </div>
                      </td>
                      <td><time dateTime={w.date}>{w.date}</time></td>
                      <td>{w.location}</td>
                      <td>{w.seatsLeft}/{w.seats}</td>
                      <td>
                        <span className={`badge ${w.status === 'upcoming' ? 'badge-green' : 'badge-gray'}`}>
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
