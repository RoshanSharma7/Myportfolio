import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Background3D from '../three/Background3D.jsx'
import { FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
const API = import.meta.env.VITE_API_URL

const roles = [
  'Full Stack Developer',
  'Python Developer',
  'Web Developer',
  'Cricketer & Boxer', 
]

function Typewriter({ words }) {
  const [index,    setIndex]    = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1500)
      return
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false)
      setIndex(prev => (prev + 1) % words.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (deleting ? -1 : 1))
    }, deleting ? 60 : 100)
    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, words])

  return (
    <span style={{ color: '#4a4a6a', fontFamily: 'Fira Code, monospace' }}>
      {words[index].substring(0, subIndex)}
      <span style={{ animation: 'blink 1s infinite' }}>_</span>
    </span>
  )
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [projectIndex, setProjectIndex] = useState(0)
  const [expIndex, setExpIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch profile data
  useEffect(function() {
    async function fetchProfile() {
      try {
        const res = await axios.get(API + '/userauth/profile/')
        if (res.data && res.data.length > 0) {
          setProfile(res.data[0])
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    }
    fetchProfile()
  }, [])

  // Fetch projects
  useEffect(function() {
    async function fetchProjects() {
      try {
        const res = await axios.get(API + '/projects/')
        setProjects(res.data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      }
    }
    fetchProjects()
  }, [])

  // Fetch experiences
  useEffect(function() {
    async function fetchExperiences() {
      try {
        const res = await axios.get(API + '/experience/')
        setExperiences(res.data)
      } catch (err) {
        console.error('Failed to fetch experiences:', err)
      }
    }
    fetchExperiences()
  }, [])

  const nextProject = () => setProjectIndex((prev) => (prev + 1) % projects.length)
  const prevProject = () => setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  const nextExp = () => setExpIndex((prev) => (prev + 1) % experiences.length)
  const prevExp = () => setExpIndex((prev) => (prev - 1 + experiences.length) % experiences.length)

  return (
    <div style={{
      position:   'relative',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      overflowX:  'hidden',
      width:      '100%',
    }}>
      <Helmet>
        <title>Home - Roshan Sharma </title>
      </Helmet>

      {/* Hero stage: holds the 3D model, overlay and heading. Sized to its
          own content on mobile so it doesn't stretch the model area down
          across the cards below it. */}
      <div style={{
        minHeight:      'auto',
        position:       'relative',
        display:        'flex',
        alignItems:     isMobile ? 'flex-start' : 'center',
        justifyContent: isMobile ? 'flex-start' : 'center',
        overflow:       'hidden',
      }}>
      {/* 3D Background */}
      <Background3D />

      {/* Overlay */}
      <div style={{
        position:      'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background:    isMobile
          ? 'rgba(248,249,250,0.62)'
          : isTablet
            ? 'linear-gradient(90deg, rgba(248,249,250,0.98) 50%, rgba(248,249,250,0.1) 100%)'
            : 'linear-gradient(90deg, rgba(248,249,250,0.98) 45%, rgba(248,249,250,0.0) 75%)',
        zIndex:        1,
        pointerEvents: 'none',
      }} />

      {/* Hero content */}
      <div style={{
        position: 'relative',
        zIndex:   2,
        maxWidth: '1250px',
        margin:   '0 auto',
        padding:  isMobile ? '5.5rem 1rem 2rem' : '130px 2rem 1rem',
        width:    '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily:   'Fira Code, monospace',
              color:        '#9999bb',
              fontSize:     isMobile ? 'clamp(0.75rem, 3.2vw, 1rem)' : '0.95rem',
              marginBottom: '0.8rem',
              letterSpacing:'2px',
            }}
          >
            Hello world, i am
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontFamily:   'Space Grotesk, sans-serif',
              fontSize:     isMobile ? 'clamp(2rem, 9.5vw, 3.2rem)' : 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight:   '600',
              color:        '#1a1a2e',
              lineHeight:   '1.1',
              marginBottom: '0.5rem',
            }}
          >
            {profile?.name || 'Roshan Sharma'}
          </motion.h1>

          {/* Typewriter */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily:   'Fira Code, monospace',
              fontSize:     isMobile ? 'clamp(1.05rem, 5vw, 1.5rem)' : 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight:   '500',
              color:        '#9999bb',
              marginBottom: '1.2rem',
            }}
          >
            &gt; <Typewriter words={roles} />
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              color:        '#6b6b8a',
              fontSize:     isMobile ? 'clamp(0.85rem, 3.5vw, 1.05rem)' : '1rem',
              maxWidth:     isMobile ? '100%' : '480px',
              lineHeight:   '1.5',
              marginBottom: '2rem',
            }}
          >
            {profile?.bio || 'Passionate developer building modern web applications with clean code and creative solutions. Based in Indore, MP.'}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{
              display:   'flex',
              gap:       '1rem',
              flexWrap:  'wrap',
              marginTop:  isMobile ? '' : '-0.5rem',
            }}
          >
            {profile?.resume && (
              <a
                href={'https://drive.google.com/drive/folders/18mZxOcbcGlVDdXRp8GAunpN7BnSayMp8?usp=sharing'}
                target='_blank'
                style={{
                  padding:        isMobile ? '10px 18px' : '11px 26px',
                  borderRadius:   '8px',
                  background:     '#1a1a2e',
                  color:          '#fff',
                  fontFamily:     'Fira Code, monospace',
                  fontSize:       isMobile ? '12px' : '13px',
                  fontWeight:     '500',
                  textDecoration: 'none',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '8px',
                  boxShadow:      '0 4px 16px rgba(26,26,46,0.2)',
                  transition:     'all 0.3s',
                }}
                onMouseOver={function(e) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(71, 66, 66, 0.3)'
                }}
                onMouseOut={function(e) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,26,46,0.2)'
                }}
              >
                Download Resume <FiDownload />
              </a>
            )}

            <Link to="/contact" style={{
              padding:        isMobile ? '10px 18px' : '11px 26px',
              borderRadius:   '8px',
              background:     'transparent',
              border:         '1.5px solid #9999bb',
              color:          '#4a4a6a',
              fontFamily:     'Fira Code, monospace',
              fontSize:       isMobile ? '12px' : '13px',
              fontWeight:     '500',
              textDecoration: 'none',
              display:        'flex',
              alignItems:     'center',
              gap:            '8px',
              transition:     'all 0.3s',
            }}
              onMouseOver={function(e) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(71, 66, 66, 0.3)'
                }}
                onMouseOut={function(e) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,26,46,0.2)'
                }}
              >
              Hire ME 🙋🏻
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              display:   'flex',
              gap:       isMobile ? '1.5rem' : '3rem',
              marginTop: isMobile ? '2rem' : '1rem',
              flexWrap:  'wrap',
            }}
          >
            {(profile ? [
              { num: profile.projects_count,       label: 'Projects Built'   },
              { num: profile.experience_years,     label: 'Years Experience' },
              { num: profile.certifications_count, label: 'Certifications'   },
            ] : [
              { num: '10+', label: 'Projects Built' },
              { num: '2+',  label: 'Years Experience' },
              { num: '5+',  label: 'Certifications' },
            ]).map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize:   isMobile ? '1.8rem' : '2.2rem',
                  fontWeight: '700',
                  color:      '#1a1a2e',
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: 'Fira Code, monospace',
                  color:      '#9999bb',
                  fontSize:   '11px',
                }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
      </div>
      {/* End hero stage */}

      {/* Cards - pinned to hero bottom on desktop, flows naturally below on mobile */}
      {(projects.length > 0 || experiences.length > 0) && (
        <div style={{
          // position:  isMobile ? 'relative' : 'absolute',
          // bottom:    isMobile ? 'auto' : '0',
          // left:      isMobile ? 'auto' : '50%',
          // transform: isMobile ? 'none' : 'translateX(-50%)',
          // width:     '100%',
          // maxWidth:  '1250px',
          // margin:    isMobile ? '0 auto' : 0,
          // padding:   isMobile ? '0.5rem 1rem 3rem' : '5rem 2rem 0 2rem',
          // zIndex: 3,
          // pointerEvents: 'auto',

          position:  'relative',
          width:     '100%',
          maxWidth:  '1250px',
          margin:    '0 auto',
          padding:   isMobile ? '0.5rem 1rem 3rem' : '1rem 2rem 4rem',
          zIndex: 3,
          pointerEvents: 'auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
              gap: isMobile ? '1.25rem' : '2rem',
            }}
          >
            {/* Project Card */}
            {projects.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <h3 style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#9999bb', margin: 0, letterSpacing: '1px' }}>
                   Latest Project
                  </h3>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button onClick={prevProject} style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e0e0f0', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#9999bb', transition: 'all 0.3s' }}>
                      <FiChevronLeft size={14} />
                    </button>
                    <button onClick={nextProject} style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e0e0f0', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#9999bb', transition: 'all 0.3s' }}>
                      <FiChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <motion.div
                  key={projectIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '1.2rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e0e0f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    minHeight: '215px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    background: projects[projectIndex]?.status === 'completed' ? '#f0f0f8' : '#1a1a2e',
                    color: projects[projectIndex]?.status === 'completed' ? '#4a4a6a' : '#fff',
                    fontSize: '9px',
                    fontFamily: 'Fira Code, monospace',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    marginBottom: '0.6rem',
                  }}>
                    {projects[projectIndex]?.status}
                  </span>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '0.4rem', margin: 0 }}>
                    {projects[projectIndex]?.title}
                  </h3>
                  <p style={{ color: '#6b6b8a', fontSize: '0.8rem', lineHeight: '1.5', margin: '0.4rem 0 0 0' }}>
                    {projects[projectIndex]?.description?.substring(0, 80)}
                    {projects[projectIndex]?.description?.length > 80 ? '...' : ''}
                  </p>
                  <Link to="/projects" style={{
                    marginTop: 'auto',
                    paddingTop: '0.8rem',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '11px',
                    color: '#1a1a2e',
                    fontWeight: '600',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}>
                    Show more &rarr;
                  </Link>
                </motion.div>
                <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#9999bb', textAlign: 'center', marginTop: '0.5rem' }}>
                  {projectIndex + 1} / {projects.length}
                </p>
              </div>
            )}

            {/* Experience Card */}
            {experiences.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <h3 style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#9999bb', margin: 0, letterSpacing: '1px' }}>
                    Work Experience
                  </h3>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button onClick={prevExp} style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e0e0f0', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#9999bb', transition: 'all 0.3s' }}>
                      <FiChevronLeft size={14} />
                    </button>
                    <button onClick={nextExp} style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e0e0f0', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#9999bb', transition: 'all 0.3s' }}>
                      <FiChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <motion.div
                  key={expIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '1.2rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e0e0f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    minHeight: '215px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {experiences[expIndex]?.is_current && (
                    <span style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      background: '#1a1a2e',
                      color: '#fff',
                      fontSize: '9px',
                      fontFamily: 'Fira Code, monospace',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      marginBottom: '0.6rem',
                    }}>
                      Current
                    </span>
                  )}
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '0.2rem', margin: 0 }}>
                    {experiences[expIndex]?.role}
                  </h3>
                  <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#4a4a6a', marginBottom: '0.4rem', margin: '0.2rem 0 0.4rem 0' }}>
                    {experiences[expIndex]?.company}
                  </p>
                  <p style={{ color: '#6b6b8a', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>
                    {experiences[expIndex]?.description?.substring(0, 80)}
                    {experiences[expIndex]?.description?.length > 80 ? '...' : ''}
                  </p>
                  <Link to="/experience" style={{
                    marginTop: 'auto',
                    paddingTop: '0.8rem',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '11px',
                    color: '#1a1a2e',
                    fontWeight: '600',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}>
                    Show more &rarr;
                  </Link>
                </motion.div>
                <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#9999bb', textAlign: 'center', marginTop: '0.5rem' }}>
                  {expIndex + 1} / {experiences.length}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}