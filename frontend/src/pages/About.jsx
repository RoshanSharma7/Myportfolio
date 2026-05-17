import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FiDownload } from 'react-icons/fi'
import {
  FiGithub, FiLinkedin, FiTwitter,
  FiInstagram, FiYoutube, FiGlobe,
  FiMail, FiMapPin, FiPhone, FiCode,
} from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

const API = import.meta.env.VITE_API_URL

const ICON_MAP = {
  FiGithub: FiGithub,
  FiLinkedin: FiLinkedin,
  FiTwitter: FiTwitter,
  FiInstagram: FiInstagram,
  FiYoutube: FiYoutube,
  FiGlobe: FiGlobe,
  FiCode: FiCode,
  FiMail: FiMail,
}

function Avatar({ name, imageUrl }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'RS'

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(26,26,46,0.2)',
          border: '3px solid #1a1a2e',
        }}
      />
    )
  }

  return (
    <div style={{
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #1a1a2e, #4a4a6a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      fontSize: '2.5rem',
      color: '#fff',
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: '700',
      boxShadow: '0 8px 32px rgba(26,26,46,0.2)',
    }}>
      {initials}
    </div>
  )
}

function SectionLabel({ text }) {
  return (
    <p style={{
      fontFamily: 'Fira Code, monospace',
      color: '#9999bb',
      fontSize: '0.8rem',
      marginBottom: '1rem',
      letterSpacing: '1px',
    }}>
      {text}
    </p>
  )
}

function InfoCard({ profile }) {
  const items = [
    { id: 1, Icon: FiMapPin, label: 'Location', value: profile.location },
    { id: 2, Icon: FiMail, label: 'Email', value: profile.email },
    { id: 3, Icon: FiPhone, label: 'Phone', value: profile.phone },
  ]

  return (
    <div className="card">
      <SectionLabel text="Personal Info" />

      {items.map(function(item) {
        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f8',
            }}
          >
            <item.Icon style={{ color: '#4a4a6a', fontSize: '1rem', flexShrink: 0 }} />
            <div>
              <p style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '11px',
                color: '#9999bb',
                margin: 0,
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#1a1a2e',
                fontWeight: '500',
                margin: 0,
              }}>
                {item.value || '—'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function LinksCard({ links }) {
  if (!links || links.length === 0) return null

  return (
    <div className="card">
      <SectionLabel text="Find Me On" />
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>

        {links.map(function(link) {
          const Icon = ICON_MAP[link.icon] || FiGlobe
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1.5px solid #1a1a2e',
                color: '#1a1a2e',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'Fira Code, monospace',
                transition: 'all 0.3s',
              }}
              onMouseOver={function(e) {
                e.currentTarget.style.background = '#1a1a2e'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseOut={function(e) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#1a1a2e'
              }}
            >
              <Icon /> {link.name}
            </a>
          )
        })}

      </div>
    </div>
  )
}

function StatsCard({ profile }) {
  const stats = [
    { id: 1, num: profile.projects_count, label: 'Projects Built' },
    { id: 2, num: profile.experience_years, label: 'Years Experience' },
    { id: 3, num: profile.certifications_count, label: 'Certifications' },
    { id: 4, num: profile.technologies_count, label: 'Technologies' },
  ]

  return (
    <div className="card">
      <SectionLabel text="Quick Stats" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
      }}>
        {stats.map(function(stat) {
          return (
            <div
              key={stat.id}
              style={{
                textAlign: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#1a1a2e',
                margin: 0,
              }}>
                {stat.num}
              </p>
              <p style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '11px',
                color: '#9999bb',
                margin: 0,
              }}>
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Loader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    }}>
      <p style={{
        fontFamily: 'Fira Code, monospace',
        color: '#9999bb',
        fontSize: '0.9rem',
      }}>
        loading...
      </p>
    </div>
  )
}

export default function About() {
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(function() {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return function() {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(function() {
    async function fetchData() {
      try {
        setLoading(true)

        const [profileRes, linksRes] = await Promise.all([
          axios.get(API + '/userauth/profile/'),
          axios.get(API + '/links/'),
        ])

        setProfile(profileRes.data[0] || null)
        setLinks(linksRes.data || [])
      } catch (err) {
        console.error('Failed to fetch about data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return (
    
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Loader />
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: isMobile ? '30px':'50px',
    }}>
      <Helmet>
        <title>Home - Roshan Sharma </title>
      </Helmet>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Avatar with image or initials */}
            <Avatar 
              name={profile ? profile.name : 'RS'} 
              imageUrl={profile.avatar}
            />

            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#1a1a2e',
              marginBottom: '0.5rem',
            }}>
              {profile ? profile.name : 'Your Name'}
            </h3>

            <p style={{
              fontFamily: 'Fira Code, monospace',
              color: '#9999bb',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
              {profile ? profile.title : 'Your Job Title'}
            </p>

            <p style={{
              color: '#6b6b8a',
              lineHeight: '1.9',
              fontSize: '0.95rem',
              marginBottom: '2rem',
            }}>
              {profile ? profile.bio : 'Add your bio from the admin panel.'}
            </p>

            {/* Resume download button */}
            {profile?.resume && (
              <a
                href={'https://drive.google.com/drive/folders/18mZxOcbcGlVDdXRp8GAunpN7BnSayMp8?usp=sharing'}
                target='_blank'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1.5px solid #1a1a2e',
                  background: '#1a1a2e',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseOver={function(e) {
                  e.currentTarget.style.opacity = '0.85'
                }}
                onMouseOut={function(e) {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Download Resume <FiDownload />
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {profile && <InfoCard profile={profile} />}
            <LinksCard links={links} />
            {profile && <StatsCard profile={profile} />}
          </motion.div>

        </div>
      </div>
    </div>
  )
}