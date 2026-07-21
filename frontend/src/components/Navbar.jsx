import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { path: '/',               label: 'Home' },
  { path: '/about',          label: 'About' },
  { path: '/experience',     label: 'Experience' },
  { path: '/skills',         label: 'Skills' },
  { path: '/education',      label: 'Education' },
  { path: '/certification',  label: 'Certification' },
  { path: '/projects',       label: 'Projects' },
  { path: '/contact',        label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [now, setNow]             = useState(new Date())
  const { pathname }              = useLocation()
  const { theme, toggleTheme }    = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <nav style={{
      position:   'fixed',
      top: 0, left: 0, right: 0,
      zIndex:     1000,
      background: scrolled ? 'var(--bg-primary)' : 'transparent',
      opacity:    1,
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'background 0.3s ease, border-color 0.3s ease',
      padding:    '0 2rem',
    }}>
      <div style={{
        maxWidth:       '1200px',
        margin:         '0 auto',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        height:         '70px',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily:  'Orbitron, sans-serif',
          fontSize:    '1.4rem',
          fontWeight:  '700',
          background:  'linear-gradient(135deg, var(--accent), var(--accent-soft))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          textDecoration: 'none',
        }}>
          &lt;RS /&gt;
        </Link>

        {/* Desktop links */}
        <div style={{
          display:    'flex',
          gap:        '1.5rem',
          alignItems: 'center',
        }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              color:          pathname === link.path ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize:       '13px',
              fontWeight:     '500',
              borderBottom:   pathname === link.path ? '1px solid var(--text-primary)' : '1px solid transparent',
              paddingBottom:  '2px',
              transition:     'all 0.2s ease',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Clock + Theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="nav-clock" style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.5px',
          }}>
            {now.toLocaleTimeString('en-US', { hour12: true })}
          </span>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          '34px',
              height:         '34px',
              borderRadius:   '50%',
              border:         '1px solid var(--border)',
              background:     'var(--bg-secondary)',
              color:          'var(--text-primary)',
              cursor:         'pointer',
              fontSize:       '15px',
              transition:     'transform 0.2s ease',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display:    'none',
              background: 'none',
              border:     'none',
              color:      'var(--text-primary)',
              fontSize:   '1.5rem',
              cursor:     'pointer',
            }}
            className="hamburger"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background:   'var(--bg-primary)',
          borderTop:    '1px solid var(--border)',
          padding:      '1rem 2rem',
          display:      'flex',
          flexDirection:'column',
          gap:          '1rem',
        }}>
          {/* Clock + theme toggle (mobile only, lives in the dropdown) */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            paddingBottom:  '0.75rem',
            borderBottom:   '1px solid var(--border)',
          }}>
            <span style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.5px',
            }}>
              {now.toLocaleTimeString('en-US', { hour12: true })}
            </span>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '34px',
                height:         '34px',
                borderRadius:   '50%',
                border:         '1px solid var(--border)',
                background:     'var(--bg-secondary)',
                color:          'var(--text-primary)',
                cursor:         'pointer',
                fontSize:       '15px',
              }}
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
          </div>

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color:          pathname === link.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize:       '14px',
                padding:        '8px 0',
                borderBottom:   '1px solid var(--border)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav     { display: none !important; }
          .hamburger       { display: block !important; }
          .nav-clock       { display: none !important; }
          .theme-toggle-btn{ display: none !important; }
        }
      `}</style>
    </nav>
  )
}