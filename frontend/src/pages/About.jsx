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
import { SkeletonBox, SkeletonCircle, SkeletonCardGrid } from '../components/Skeleton'

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
          border: '3px solid var(--text-primary)',
        }}
      />
    )
  }

  return (
    <div style={{
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--text-primary), var(--accent-soft))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      fontSize: '2.5rem',
      color: 'var(--bg-secondary)',
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
      color: 'var(--text-muted)',
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
              borderBottom: '1px solid var(--badge-bg)',
            }}
          >
            <item.Icon style={{ color: 'var(--accent-soft)', fontSize: '1rem', flexShrink: 0 }} />
            <div>
              <p style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '11px',
                color: 'var(--text-muted)',
                margin: 0,
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-primary)',
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
                border: '1.5px solid var(--text-primary)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'Fira Code, monospace',
                transition: 'all 0.3s',
              }}
              onMouseOver={function(e) {
                e.currentTarget.style.background = 'var(--text-primary)'
                e.currentTarget.style.color = 'var(--bg-secondary)'
              }}
              onMouseOut={function(e) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--text-primary)'
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
                background: 'var(--bg-primary)',
                borderRadius: '8px',
              }}
            >
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                {stat.num}
              </p>
              <p style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: '11px',
                color: 'var(--text-muted)',
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
     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <SkeletonCircle size="140px" style={{ marginBottom: '2rem' }} />
      <SkeletonBox width="260px" height="2.2rem" style={{ marginBottom: '0.75rem' }} />
      <SkeletonBox width="160px" height="1rem" style={{ marginBottom: '2rem' }} />
      <SkeletonBox width="100%" height="0.9rem" style={{ marginBottom: '0.5rem' }} />
      <SkeletonBox width="90%" height="0.9rem" style={{ marginBottom: '0.5rem' }} />
      <SkeletonBox width="70%" height="0.9rem" style={{ marginBottom: '2rem' }} />
      <SkeletonBox width="180px" height="2.8rem" radius="8px" style={{ marginBottom: '2.5rem' }} />

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SkeletonBox width="140px" height="1rem" />
        {[1, 2, 3].map(function(i) {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <SkeletonBox width="80px" height="0.7rem" />
              <SkeletonBox width="200px" height="1rem" />
            </div>
          )
        })}
      </div>
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
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
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
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
      // paddingTop: isMobile ? '30px':'50px',
    }}>
      <Helmet>
        <title>About - Roshan Sharma </title>
      </Helmet>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '0.75rem' }}
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Fira Code, monospace',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '3rem',
            marginTop: 0,
          }}
        >
          print("my about information, and links")
        </motion.p>

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
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              {profile ? profile.name : 'Your Name'}
            </h3>

            <p style={{
              fontFamily: 'Fira Code, monospace',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
              {profile ? profile.title : 'Your Job Title'}
            </p>

            <p style={{
              color: 'var(--text-secondary)',
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
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--text-primary)',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-secondary)',
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