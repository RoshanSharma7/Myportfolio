// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import axios from 'axios'
// import { FiGithub, FiExternalLink } from 'react-icons/fi'
// import { Helmet } from 'react-helmet-async'
// import { SkeletonCardGrid } from '../components/Skeleton'
// const API = import.meta.env.VITE_API_URL

// function Loader() {
//   return <SkeletonCardGrid count={4} minColWidth="320px" imageHeight="200px" />
// }

// function EmptyState() {
//   return (
//     <div style={{
//       textAlign: 'center', padding: '4rem',
//       background: 'var(--bg-secondary)', borderRadius: '16px',
//       border: '1px dashed var(--border)',
//     }}>
//       <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)' }}>
//         // print("no projects found")
//       </p>
//       <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
//         Add your projects from the admin panel
//       </p>
//     </div>
//   )
// }

// function FilterBtn({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         padding: '6px 18px',
//         borderRadius: '20px',
//         border: '1.5px solid ' + (active ? 'var(--text-primary)' : 'var(--border)'),
//         background: active ? 'var(--text-primary)' : 'transparent',
//         color: active ? 'var(--bg-secondary)' : 'var(--text-muted)',
//         fontFamily: 'Fira Code, monospace',
//         fontSize: '12px',
//         cursor: 'pointer',
//         transition: 'all 0.3s',
//       }}
//     >
//       {label}
//     </button>
//   )
// }

// function ProjectCard({ project, index }) {
//   const techs = project.tech_stack
//     ? project.tech_stack.split(',').map(function (t) { return t.trim() })
//     : []

//   return (
//     <motion.div
//       className="card"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
//     >
//       {/* Status badge */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
//         <span style={{
//           background: project.status === 'completed' ? 'var(--badge-bg)' : 'var(--text-primary)',
//           color: project.status === 'completed' ? 'var(--accent-soft)' : 'var(--bg-secondary)',
//           fontSize: '10px',
//           fontFamily: 'Fira Code, monospace',
//           padding: '2px 10px',
//           borderRadius: '20px',
//         }}>
//           {project.status}
//         </span>
//       </div>

//       {/* Thumbnail image */}
//       {project.thumbnail && (
//         <img
//           src={project.thumbnail_url || project.thumbnail}
//           alt={project.title}
//           style={{
//             width: '100%',
//             height: '200px',
//             objectFit: 'contain',
//             borderRadius: '8px',
//             marginBottom: '1rem',
//             border: '1px solid var(--border)',
//           }}
//         />
//       )}

//       {/* Title */}
//       <h3 style={{
//         fontFamily: 'Space Grotesk, sans-serif',
//         fontSize: '1.1rem',
//         fontWeight: '600',
//         color: 'var(--text-primary)',
//         marginBottom: '0.5rem',
//       }}>
//         {project.title}
//       </h3>

//       {/* Description */}
//       <p style={{
//         color: 'var(--text-secondary)',
//         fontSize: '0.9rem',
//         lineHeight: '1.7',
//         marginBottom: '1rem',
//         flex: 1,
//       }}>
//         {project.description}
//       </p>

//       {/* Tech stack */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
//         {techs.map(function (tech) {
//           return (
//             <span
//               key={tech}
//               style={{
//                 background: 'var(--badge-bg)',
//                 color: 'var(--accent-soft)',
//                 fontSize: '11px',
//                 fontFamily: 'Fira Code, monospace',
//                 padding: '2px 8px',
//                 borderRadius: '4px',
//               }}
//             >
//               {tech}
//             </span>
//           )
//         })}
//       </div>

//       {/* Links */}
//       <div style={{ display: 'flex', gap: '0.8rem' }}>
//         {project.github_url && (
//           <a
//             href={project.github_url}
//             target="_blank"
//             rel="noreferrer"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               color: 'var(--text-primary)',
//               textDecoration: 'none',
//               fontSize: '13px',
//               fontFamily: 'Fira Code, monospace',
//               transition: 'color 0.3s',
//             }}
//             onMouseOver={function (e) { e.currentTarget.style.color = 'var(--accent-soft)' }}
//             onMouseOut={function (e) { e.currentTarget.style.color = 'var(--text-primary)' }}
//           >
//             <FiGithub /> Code
//           </a>
//         )}
//         {project.live_url && (
//           <a
//             href={project.live_url}
//             target="_blank"
//             rel="noreferrer"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               color: 'var(--text-primary)',
//               textDecoration: 'none',
//               fontSize: '13px',
//               fontFamily: 'Fira Code, monospace',
//               transition: 'color 0.3s',
//             }}
//             onMouseOver={function (e) { e.currentTarget.style.color = 'var(--accent-soft)' }}
//             onMouseOut={function (e) { e.currentTarget.style.color = 'var(--text-primary)' }}
//           >
//             <FiExternalLink /> Live
//           </a>
//         )}
//       </div>
//     </motion.div>
//   )
// }

// export default function Projects() {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState('all')

//   useEffect(function () {
//     async function fetchProjects() {
//       try {
//         setLoading(true)
//         const res = await axios.get(API + '/projects/')
//         setProjects(res.data)
//       } catch (err) {
//         console.error('Failed to fetch projects:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProjects()
//   }, [])

//   const filtered = projects.filter(function (p) {
//     if (filter === 'all') return true
//     if (filter === 'completed') return p.status === 'completed'
//     if (filter === 'ongoing') return p.status === 'ongoing'
//     return true
//   })

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
//     }}>
//       <Helmet>
//         <title>Projects - Roshan Sharma </title>
//       </Helmet>
//       <div className="section">

//         <motion.h2
//           className="section-title"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Projects
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           style={{
//             textAlign: 'center',
//             fontFamily: 'Fira Code, monospace',
//             color: 'var(--text-muted)',
//             fontSize: '0.85rem',
//             marginBottom: '2rem',
//             marginTop: '-2rem',
//           }}
//         >
//           print("my personal and professional projects")
//         </motion.p>

//         {/* Filter buttons */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '0.8rem',
//             marginBottom: '3rem',
//             flexWrap: 'wrap',
//           }}
//         >
//           <FilterBtn label="all" active={filter === 'all'} onClick={function () { setFilter('all') }} />
//           <FilterBtn label="completed" active={filter === 'completed'} onClick={function () { setFilter('completed') }} />
//           <FilterBtn label="ongoing" active={filter === 'ongoing'} onClick={function () { setFilter('ongoing') }} />
//         </motion.div>

//         {loading ? (
//           <Loader />
//         ) : projects.length === 0 ? (
//           <EmptyState />
//         ) : (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//             gap: '1.5rem',
//           }}>
//             {filtered.map(function (project, index) {
//               return (
//                 <ProjectCard
//                   key={project.id}
//                   project={project}
//                   index={index}
//                 />
//               )
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { SkeletonCardGrid } from '../components/Skeleton'
const API = import.meta.env.VITE_API_URL

function Loader() {
  return <SkeletonCardGrid count={4} minColWidth="320px" imageHeight="200px" />
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      background: 'var(--bg-secondary)', borderRadius: '16px',
      border: '1px dashed var(--border)',
    }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)' }}>
        // print("no projects found")
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
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
        border: '1.5px solid ' + (active ? 'var(--text-primary)' : 'var(--border)'),
        background: active ? 'var(--text-primary)' : 'transparent',
        color: active ? 'var(--bg-secondary)' : 'var(--text-muted)',
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

function ProjectModal({ project, onClose }) {
  const techs = project.tech_stack
    ? project.tech_stack.split(',').map(function (t) { return t.trim() })
    : []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        zIndex: 1000,
      }}
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={function (e) { e.stopPropagation() }}
        style={{
          maxWidth: '600px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--badge-bg)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
        >
          <FiX size={18} />
        </button>

        {/* Status badge */}
        <span style={{
          background: project.status === 'completed' ? 'var(--badge-bg)' : 'var(--text-primary)',
          color: project.status === 'completed' ? 'var(--accent-soft)' : 'var(--bg-secondary)',
          fontSize: '10px',
          fontFamily: 'Fira Code, monospace',
          padding: '2px 10px',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '1rem',
        }}>
          {project.status}
        </span>

        {/* Thumbnail */}
        {project.thumbnail && (
          <img
            src={project.thumbnail_url || project.thumbnail}
            alt={project.title}
            style={{
              width: '100%',
              maxHeight: '260px',
              objectFit: 'contain',
              borderRadius: '8px',
              marginBottom: '1.2rem',
              border: '1px solid var(--border)',
            }}
          />
        )}

        {/* Title */}
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.8rem',
          paddingRight: '2rem',
        }}>
          {project.title}
        </h3>

        {/* Full description */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: '1.8',
          marginBottom: '1.2rem',
          whiteSpace: 'pre-line',
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        {techs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {techs.map(function (tech) {
              return (
                <span
                  key={tech}
                  style={{
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-soft)',
                    fontSize: '11px',
                    fontFamily: 'Fira Code, monospace',
                    padding: '3px 10px',
                    borderRadius: '4px',
                  }}
                >
                  {tech}
                </span>
              )
            })}
          </div>
        )}

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'Fira Code, monospace',
              }}
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
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'Fira Code, monospace',
              }}
            >
              <FiExternalLink /> Live
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpen }) {
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
          background: project.status === 'completed' ? 'var(--badge-bg)' : 'var(--text-primary)',
          color: project.status === 'completed' ? 'var(--accent-soft)' : 'var(--bg-secondary)',
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
            objectFit: 'contain',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid var(--border)',
          }}
        />
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
      }}>
        {project.title}
      </h3>

      {/* Description (truncated, click to see full) */}
      <p
        onClick={function () { onOpen(project) }}
        title="Click to read full description"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: '1.7',
          marginBottom: '0.3rem',
          flex: 1,
          cursor: 'pointer',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.description}
      </p>

      {/* Read more hint */}
      <span
        onClick={function () { onOpen(project) }}
        style={{
          color: 'var(--accent-soft)',
          fontSize: '12px',
          fontFamily: 'Fira Code, monospace',
          cursor: 'pointer',
          marginBottom: '1rem',
          display: 'inline-block',
        }}
      >
        read more →
      </span>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {techs.map(function (tech) {
          return (
            <span
              key={tech}
              style={{
                background: 'var(--badge-bg)',
                color: 'var(--accent-soft)',
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
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Fira Code, monospace',
              transition: 'color 0.3s',
            }}
            onMouseOver={function (e) { e.currentTarget.style.color = 'var(--accent-soft)' }}
            onMouseOut={function (e) { e.currentTarget.style.color = 'var(--text-primary)' }}
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
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'Fira Code, monospace',
              transition: 'color 0.3s',
            }}
            onMouseOver={function (e) { e.currentTarget.style.color = 'var(--accent-soft)' }}
            onMouseOut={function (e) { e.currentTarget.style.color = 'var(--text-primary)' }}
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
  const [activeProject, setActiveProject] = useState(null)

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
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
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
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '2rem',
            marginTop: '-2rem',
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
                  onOpen={setActiveProject}
                />
              )
            })}
          </div>
        )}

      </div>

      {/* Full project popup */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={function () { setActiveProject(null) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}