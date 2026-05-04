import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

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
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position:   'fixed',
      top: 0, left: 0, right: 0,
      zIndex:     1000,
      background: scrolled ? 'rgba(248,249,250,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid #e0e0f0' : 'none',
      transition: 'all 0.3s ease',
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
          background:  'linear-gradient(135deg, #1a1a2e, #4a4a6a)',
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
              color:          pathname === link.path ? '#1a1a2e' : '#9999bb',
              textDecoration: 'none',
              fontSize:       '13px',
              fontWeight:     '500',
              borderBottom:   pathname === link.path ? '1px solid #1a1a2e' : '1px solid transparent',
              paddingBottom:  '2px',
              transition:     'all 0.2s ease',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display:    'none',
            background: 'none',
            border:     'none',
            color:      '#000000',
            fontSize:   '1.5rem',
            cursor:     'pointer',
          }}
          className="hamburger"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background:   'rgba(248,249,250,0.98)',
          borderTop:    '1px solid #1a1a3a',
          padding:      '1rem 2rem',
          display:      'flex',
          flexDirection:'column',
          gap:          '1rem',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color:          pathname === link.path ? '#00d4ff' : '#8888aa',
                textDecoration: 'none',
                fontSize:       '14px',
                padding:        '8px 0',
                borderBottom:   '1px solid #1a1a3a',
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
          .desktop-nav { display: none !important; }
          .hamburger   { display: block !important; }
        }
      `}</style>
    </nav>
  )
}