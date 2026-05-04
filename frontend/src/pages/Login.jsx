import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL

export default function Login() {
  const [form,    setForm]    = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()

  function handleChange(e) {
    setForm(function(prev) {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(API + '/userauth/login/', form)
      localStorage.setItem('token',    res.data.access)
      localStorage.setItem('refresh',  res.data.refresh)
      localStorage.setItem('username', res.data.username)
      toast.success('Login successful!')
      navigate('/admin')
    } catch (err) {
      toast.error('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width:        '100%',
    padding:      '12px 16px',
    borderRadius: '8px',
    border:       '1.5px solid #e0e0f0',
    background:   '#fff',
    fontFamily:   'Fira Code, monospace',
    fontSize:     '13px',
    color:        '#1a1a2e',
    outline:      'none',
    transition:   'border-color 0.3s',
    boxSizing:    'border-box',
  }

  const labelStyle = {
    fontFamily:    'Fira Code, monospace',
    fontSize:      '12px',
    color:         '#9999bb',
    marginBottom:  '6px',
    display:       'block',
    letterSpacing: '0.5px',
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '420px' }}
      >

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{
            fontFamily:    'Fira Code, monospace',
            color:         '#9999bb',
            fontSize:      '0.8rem',
            marginBottom:  '0.5rem',
            letterSpacing: '2px',
          }}>
            // Admin access only
          </p>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize:   '2rem',
            fontWeight: '700',
            color:      '#1a1a2e',
            margin:     0,
          }}>
            Admin Login
          </h1>
        </div>

        {/* Form card */}
        <div className="card">
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={inputStyle}
              onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
              onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={inputStyle}
              onFocus={function(e) { e.target.style.borderColor = '#1a1a2e' }}
              onBlur={function(e)  { e.target.style.borderColor = '#e0e0f0' }}
              onKeyDown={function(e) {
                if (e.key === 'Enter') handleSubmit(e)
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width:        '100%',
              padding:      '12px',
              borderRadius: '8px',
              border:       'none',
              background:   loading ? '#9999bb' : '#1a1a2e',
              color:        '#fff',
              fontFamily:   'Fira Code, monospace',
              fontSize:     '14px',
              cursor:       loading ? 'not-allowed' : 'pointer',
              transition:   'all 0.3s',
            }}
          >
            {loading ? 'logging_in...' : 'login()'}
          </button>
        </div>

        <p style={{
          textAlign:  'center',
          fontFamily: 'Fira Code, monospace',
          color:      '#9999bb',
          fontSize:   '11px',
          marginTop:  '1rem',
        }}>
          // This page is for admin only
        </p>

      </motion.div>
    </div>
  )
}