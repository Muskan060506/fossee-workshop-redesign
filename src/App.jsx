import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Workshops from './pages/Workshops'
import WorkshopDetail from './pages/WorkshopDetail'
import BookWorkshop from './pages/BookWorkshop'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/workshops"         element={<Workshops />} />
          <Route path="/workshops/:id"     element={<WorkshopDetail />} />
          <Route path="/workshops/:id/book" element={<BookWorkshop />} />
          <Route path="/dashboard"         element={<Dashboard />} />
          <Route path="/login"             element={<Login />} />
          <Route path="/register"          element={<Register />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
