import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
const API = import.meta.env.VITE_API_URL

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>loading...</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      background: '#fff', borderRadius: '16px',
      border: '1px dashed #e0e0f0',
    }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: '#9999bb' }}>
        // print("no projects found")
      </p>
      <p style={{ color: '#9999bb', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Add your projects from the admin panel
      </p>
    </div>
  )
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 18px',
        borderRadius: '20px',
        border: '1.5px solid ' + (active ? '#1a1a2e' : '#e0e0f0'),
        background: active ? '#1a1a2e' : 'transparent',
        color: active ? '#fff' : '#9999bb',
        fontFamily: 'Fira Code, monospace',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      {label}
    </button>
  )
}

function ProjectCard({ project, index }) {
  const techs = project.tech_stack
    ? project.tech_stack.split(',').map(function (t) { return t.trim() })
    : []

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Status badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
        <span style={{
          background: project.status === 'completed' ? '#f0f0f8' : '#1a1a2e',
          color: project.status === 'completed' ? '#4a4a6a' : '#fff',
          fontSize: '10px',
          fontFamily: 'Fira Code, monospace',
          padding: '2px 10px',
          borderRadius: '20px',
        }}>
          {project.status}
        </span>
      </div>

      {/* Thumbnail image */}
      {project.thumbnail && (
        <img
          src={project.thumbnail_url || project.thumbnail}
          alt={project.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #e0e0f0',
          }}
        />
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: '0.5rem',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        color: '#6b6b8a',
        fontSize: '0.9rem',
        lineHeight: '1.7',
        marginBottom: '1rem',
        flex: 1,
      }}>
        {project.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {techs.map(function (tech) {
          return (
            <span
              key={tech}
              style={{
                background: '#f0f0f8',
                color: '#4a4a6a',
                fontSize: '11px',
                fontFamily: 'Fira Code, monospace',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {tech}
            </span>
          )
        })}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1a1a2e',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Fira Code, monospace',
              transition: 'color 0.3s',
            }}
            onMouseOver={function (e) { e.currentTarget.style.color = '#4a4a6a' }}
            onMouseOut={function (e) { e.currentTarget.style.color = '#1a1a2e' }}
          >
            <FiGithub /> Code
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1a1a2e',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Fira Code, monospace',
              transition: 'color 0.3s',
            }}
            onMouseOver={function (e) { e.currentTarget.style.color = '#4a4a6a' }}
            onMouseOut={function (e) { e.currentTarget.style.color = '#1a1a2e' }}
          >
            <FiExternalLink /> Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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
    if (filter === 'all') return true
    if (filter === 'completed') return p.status === 'completed'
    if (filter === 'ongoing') return p.status === 'ongoing'
    return true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: '80px',
    }}>
      <Helmet>
        <title>Projects - Roshan Sharma </title>
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
            textAlign: 'center',
            fontFamily: 'Fira Code, monospace',
            color: '#9999bb',
            fontSize: '0.85rem',
            marginBottom: '2rem',
            marginTop: '-2rem',
          }}
        >
          // print("things I have built")
        </motion.p>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <FilterBtn label="all" active={filter === 'all'} onClick={function () { setFilter('all') }} />
          <FilterBtn label="completed" active={filter === 'completed'} onClick={function () { setFilter('completed') }} />
          <FilterBtn label="ongoing" active={filter === 'ongoing'} onClick={function () { setFilter('ongoing') }} />
        </motion.div>

        {loading ? (
          <Loader />
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map(function (project, index) {
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}