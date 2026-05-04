import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiGlobe,
  FiInstagram,
} from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL

const ICON_MAP = {
  FiGithub:    FiGithub,
  FiLinkedin:  FiLinkedin,
  FiTwitter:   FiTwitter,
  FiInstagram: FiInstagram,
  FiGlobe:     FiGlobe,
  FiMail:      FiMail,
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm(function(prev) {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    try {
      setSending(true)
      await axios.post(API + '/contact/', form)
      toast.success('Message sent successfully!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      toast.error('Failed to send message. Try again.')
    } finally {
      setSending(false)
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
    <div className="card">
      <p style={{
        fontFamily:    'Fira Code, monospace',
        color:         '#9999bb',
        fontSize:      '0.8rem',
        marginBottom:  '1.5rem',
        letterSpacing: '1px',
      }}>
        
        Send Message
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          style={inputStyle}
          onFocus={function(e)  { e.target.style.borderColor = '#1a1a2e' }}
          onBlur={function(e)   { e.target.style.borderColor = '#e0e0f0' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          style={inputStyle}
          onFocus={function(e)  { e.target.style.borderColor = '#1a1a2e' }}
          onBlur={function(e)   { e.target.style.borderColor = '#e0e0f0' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={function(e)  { e.target.style.borderColor = '#1a1a2e' }}
          onBlur={function(e)   { e.target.style.borderColor = '#e0e0f0' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={sending}
        style={{
          width:        '100%',
          padding:      '12px',
          borderRadius: '8px',
          border:       'none',
          background:   sending ? '#9999bb' : '#1a1a2e',
          color:        '#fff',
          fontFamily:   'Fira Code, monospace',
          fontSize:     '14px',
          cursor:       sending ? 'not-allowed' : 'pointer',
          transition:   'all 0.3s',
        }}
      >
        {sending ? 'sending...' : 'Send Message'}
      </button>
    </div>
  )
}

function ContactInfo({ profile, links }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Info */}
      <div className="card">
        <p style={{
          fontFamily:    'Fira Code, monospace',
          color:         '#9999bb',
          fontSize:      '0.8rem',
          marginBottom:  '1rem',
          letterSpacing: '1px',
        }}>
          Contact Info
        </p>

        {profile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {profile.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiMail style={{ color: '#4a4a6a', flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#1a1a2e', fontFamily: 'Fira Code, monospace' }}>
                  {profile.email}
                </p>
              </div>
            )}
            {profile.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiPhone style={{ color: '#4a4a6a', flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#1a1a2e', fontFamily: 'Fira Code, monospace' }}>
                  {profile.phone}
                </p>
              </div>
            )}
            {profile.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiMapPin style={{ color: '#4a4a6a', flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#1a1a2e', fontFamily: 'Fira Code, monospace' }}>
                  {profile.location}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Social links */}
      {links.length > 0 && (
        <div className="card">
          <p style={{
            fontFamily:    'Fira Code, monospace',
            color:         '#9999bb',
            fontSize:      '0.8rem',
            marginBottom:  '1rem',
            letterSpacing: '1px',
          }}>
            Find me on
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {links.map(function(link) {
              const Icon = ICON_MAP[link.icon] || FiGlobe
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    gap:            '8px',
                    padding:        '8px 16px',
                    borderRadius:   '8px',
                    border:         '1.5px solid #1a1a2e',
                    color:          '#1a1a2e',
                    textDecoration: 'none',
                    fontSize:       '13px',
                    fontFamily:     'Fira Code, monospace',
                    transition:     'all 0.3s',
                  }}
                  onMouseOver={function(e) {
                    e.currentTarget.style.background = '#1a1a2e'
                    e.currentTarget.style.color      = '#fff'
                  }}
                  onMouseOut={function(e) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color      = '#1a1a2e'
                  }}
                >
                  <Icon /> {link.name}
                </a>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}

export default function Contact() {
  const [profile, setProfile] = useState(null)
  const [links,   setLinks]   = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(function() {
    function handleResize() { setIsMobile(window.innerWidth < 768) }
    window.addEventListener('resize', handleResize)
    return function() { window.removeEventListener('resize', handleResize) }
  }, [])

  useEffect(function() {
    async function fetchData() {
      try {
        const [profileRes, linksRes] = await Promise.all([
          axios.get(API + '/userauth/profile/'),
          axios.get(API + '/links/'),
        ])
        setProfile(profileRes.data[0] || null)
        setLinks(linksRes.data || [])
      } catch (err) {
        console.error('Failed to fetch contact data:', err)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={{
      minHeight:  '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: '80px',
    }}>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign:    'center',
            fontFamily:   'Fira Code, monospace',
            color:        '#9999bb',
            fontSize:     '0.85rem',
            marginBottom: '3rem',
            marginTop:    '-2rem',
          }}
        >
          // print("get in touch")
        </motion.p>

        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:                 '2rem',
          maxWidth:            '900px',
          margin:              '0 auto',
        }}>
          <ContactForm />
          <ContactInfo profile={profile} links={links} />
        </div>

      </div>
    </div>
  )
}