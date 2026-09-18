import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { SkeletonCardGrid } from '../components/Skeleton'

const API = import.meta.env.VITE_API_URL

// ─── Responsive hook ─────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

// ─── Loader ──────────────────────────────────────────────────────────────────
function Loader() {
  const width = useWindowWidth()
  const minCol = width < 480 ? '100%' : width < 768 ? '280px' : '320px'
  return <SkeletonCardGrid count={4} minColWidth={minCol} imageHeight="180px" />
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '3rem 1rem',
      background: 'var(--bg-secondary)', borderRadius: '16px',
      border: '1px dashed var(--border)',
    }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        // print("no projects found")
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Add your projects from the admin panel
      </p>
    </div>
  )
}

// ─── Filter Button ────────────────────────────────────────────────────────────
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 18px',
        borderRadius: '20px',
        border: '1.5px solid ' + (active ? 'var(--text-primary)' : 'var(--border)'),
        background: active ? 'var(--text-primary)' : 'transparent',
        color: active ? 'var(--bg-secondary)' : 'var(--text-muted)',
        fontFamily: 'Fira Code, monospace',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        // touch-friendly tap target
        minHeight: '36px',
      }}
    >
      {label}
    </button>
  )
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const width = useWindowWidth()
  const isMobile = width < 600
  const techs = project.tech_stack
    ? project.tech_stack.split(',').map(t => t.trim())
    : []

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '0' : '1rem',
          backdropFilter: 'blur(4px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'var(--bg-secondary)',
            borderRadius: isMobile ? '20px 20px 0 0' : '20px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '680px',
            maxHeight: isMobile ? '92vh' : '88vh',
            overflowY: 'auto',
            boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            // on mobile: sheet slides up from bottom
            position: isMobile ? 'absolute' : 'relative',
            bottom: isMobile ? 0 : 'auto',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.2rem 1.2rem 0 1.2rem',
            position: 'sticky', top: 0,
            background: 'var(--bg-secondary)',
            zIndex: 1,
            borderBottom: '1px solid var(--border)',
            paddingBottom: '1rem',
          }}>
            <span style={{
              background: project.status === 'completed' ? 'var(--badge-bg)' : 'var(--text-primary)',
              color: project.status === 'completed' ? 'var(--accent-soft)' : 'var(--bg-secondary)',
              fontSize: '10px', fontFamily: 'Fira Code, monospace',
              padding: '3px 12px', borderRadius: '20px',
            }}>
              {project.status}
            </span>
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '1.3rem',
              display: 'flex', alignItems: 'center',
              padding: '6px', borderRadius: '8px', transition: 'all 0.2s',
              // larger tap target on mobile
              minWidth: '36px', minHeight: '36px', justifyContent: 'center',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--badge-bg)'; e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseOut={e  => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <FiX />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1.2rem' }}>

            {/* Thumbnail */}
            {project.thumbnail && (
              <img
                src={project.thumbnail_url || project.thumbnail}
                alt={project.title}
                style={{
                  width: '100%',
                  height: isMobile ? '180px' : '260px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1.2rem',
                  border: '1px solid var(--border)',
                }}
              />
            )}

            {/* Title */}
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: '0 0 1rem 0',
            }}>
              {project.title}
            </h2>

            {/* Full description */}
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              lineHeight: '1.8',
              marginBottom: '1.5rem',
              whiteSpace: 'pre-line',
            }}>
              {project.description}
            </p>

            {/* Tech stack */}
            {techs.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  fontFamily: 'Fira Code, monospace', fontSize: '11px',
                  color: 'var(--text-muted)', marginBottom: '0.6rem',
                }}>
                  // tech_stack
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {techs.map(tech => (
                    <span key={tech} style={{
                      background: 'var(--badge-bg)', color: 'var(--accent-soft)',
                      fontSize: '12px', fontFamily: 'Fira Code, monospace',
                      padding: '4px 10px', borderRadius: '6px',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div style={{
              display: 'flex', gap: '0.8rem', flexWrap: 'wrap',
            }}>
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px',
                  border: '1.5px solid var(--text-primary)',
                  background: 'var(--text-primary)', color: 'var(--bg-secondary)',
                  textDecoration: 'none', fontSize: '13px',
                  fontFamily: 'Fira Code, monospace', transition: 'opacity 0.2s',
                  // full width on very small screens
                  flex: isMobile ? '1' : 'none',
                  justifyContent: 'center',
                  minHeight: '44px',
                }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                >
                  <FiGithub /> View Code
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px',
                  border: '1.5px solid var(--text-primary)',
                  background: 'transparent', color: 'var(--text-primary)',
                  textDecoration: 'none', fontSize: '13px',
                  fontFamily: 'Fira Code, monospace', transition: 'background 0.2s',
                  flex: isMobile ? '1' : 'none',
                  justifyContent: 'center',
                  minHeight: '44px',
                }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--badge-bg)'}
                  onMouseOut={e  => e.currentTarget.style.background = 'transparent'}
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onReadMore }) {
  const techs = project.tech_stack
    ? project.tech_stack.split(',').map(t => t.trim())
    : []

  const visibleTechs = techs.slice(0, 4)
  const extraCount   = techs.length - 4

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Status badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span style={{
          background: project.status === 'completed' ? 'var(--badge-bg)' : 'var(--text-primary)',
          color: project.status === 'completed' ? 'var(--accent-soft)' : 'var(--bg-secondary)',
          fontSize: '10px', fontFamily: 'Fira Code, monospace',
          padding: '2px 10px', borderRadius: '20px',
        }}>
          {project.status}
        </span>
      </div>

      {/* Thumbnail — fixed height */}
      {project.thumbnail && (
        <img
          src={project.thumbnail_url || project.thumbnail}
          alt={project.title}
          style={{
            width: '100%', height: '180px',
            objectFit: 'cover', borderRadius: '8px',
            marginBottom: '1rem', border: '1px solid var(--border)',
            flexShrink: 0,
          }}
        />
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1rem', fontWeight: '600',
        color: 'var(--text-primary)', marginBottom: '0.5rem',
        flexShrink: 0,
      }}>
        {project.title}
      </h3>

      {/* Description — clamped to 3 lines */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.85rem', lineHeight: '1.6',
        marginBottom: '0.5rem', flexShrink: 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {project.description}
      </p>

      {/* Read more */}
      <button
        onClick={() => onReadMore(project)}
        style={{
          alignSelf: 'flex-start', background: 'none', border: 'none',
          color: 'var(--text-primary)', fontFamily: 'Fira Code, monospace',
          fontSize: '11px', cursor: 'pointer', padding: '0',
          marginBottom: '1rem', textDecoration: 'underline', flexShrink: 0,
          minHeight: '28px',
        }}
      >
        read_more()
      </button>

      {/* Pushes tech + links to bottom */}
      <div style={{ flex: 1 }} />

      {/* Tech stack — max 4 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {visibleTechs.map(tech => (
          <span key={tech} style={{
            background: 'var(--badge-bg)', color: 'var(--accent-soft)',
            fontSize: '11px', fontFamily: 'Fira Code, monospace',
            padding: '2px 8px', borderRadius: '4px',
          }}>
            {tech}
          </span>
        ))}
        {extraCount > 0 && (
          <span style={{
            background: 'var(--text-primary)', color: 'var(--bg-secondary)',
            fontSize: '11px', fontFamily: 'Fira Code, monospace',
            padding: '2px 8px', borderRadius: '4px',
          }}>
            +{extraCount} more
          </span>
        )}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-primary)', textDecoration: 'none',
            fontSize: '13px', fontFamily: 'Fira Code, monospace',
            transition: 'color 0.3s', minHeight: '36px',
          }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-soft)'}
            onMouseOut={e  => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            <FiGithub /> Code
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-primary)', textDecoration: 'none',
            fontSize: '13px', fontFamily: 'Fira Code, monospace',
            transition: 'color 0.3s', minHeight: '36px',
          }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-soft)'}
            onMouseOut={e  => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            <FiExternalLink /> Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects,        setProjects]        = useState([])
  const [loading,         setLoading]         = useState(true)
  const [filter,          setFilter]          = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const width = useWindowWidth()

  useEffect(function () {
    async function fetchProjects() {
      try {
        setLoading(true)
        const res = await axios.get(API + '/projects/')
        setProjects(res.data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filtered = projects.filter(function (p) {
    if (filter === 'all')       return true
    if (filter === 'completed') return p.status === 'completed'
    if (filter === 'ongoing')   return p.status === 'ongoing'
    return true
  })

  // Responsive grid columns
  const gridCols = width < 480
    ? '1fr'
    : width < 768
    ? 'repeat(auto-fill, minmax(280px, 1fr))'
    : 'repeat(auto-fill, minmax(320px, 1fr))'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
    }}>
      <Helmet>
        <title>Projects - Roshan Sharma</title>
      </Helmet>

      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: 'center', fontFamily: 'Fira Code, monospace',
            color: 'var(--text-muted)',
            fontSize: width < 480 ? '0.75rem' : '0.85rem',
            marginBottom: '2rem', marginTop: '-2rem',
          }}
        >
          print("my personal and professional projects")
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex', justifyContent: 'center',
            gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap',
          }}
        >
          <FilterBtn label="all"       active={filter === 'all'}       onClick={() => setFilter('all')}       />
          <FilterBtn label="completed" active={filter === 'completed'} onClick={() => setFilter('completed')} />
          <FilterBtn label="ongoing"   active={filter === 'ongoing'}   onClick={() => setFilter('ongoing')}   />
        </motion.div>

        {loading ? (
          <Loader />
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: gridCols,
            gap: width < 480 ? '1rem' : '1.5rem',
            alignItems: 'start',
          }}>
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onReadMore={setSelectedProject}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  )
}