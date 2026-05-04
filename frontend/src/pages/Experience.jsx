import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

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
        no_experience_found()
      </p>
    </div>
  )
}

function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ display: 'flex', gap: '1.5rem' }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{
          width: '14px', height: '14px',
          borderRadius: '50%',
          background: exp.is_current ? '#1a1a2e' : '#9999bb',
          border: '2px solid #1a1a2e',
          marginTop: '6px', flexShrink: 0,
        }} />
        <div style={{
          width: '2px', flex: 1,
          background: '#e0e0f0',
          marginTop: '6px',
        }} />
      </div>

      <div className="card" style={{ flex: 1, marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap',
          gap: '0.5rem', marginBottom: '0.8rem',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.1rem', fontWeight: '600',
              color: '#1a1a2e', marginBottom: '0.2rem',
            }}>
              {exp.role}
            </h3>
            <p style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.85rem', color: '#4a4a6a', margin: 0,
            }}>
              {exp.company}
              {exp.location ? ' · ' + exp.location : ''}
            </p>
          </div>

          <div style={{
            background: '#f0f0f8', borderRadius: '20px',
            padding: '4px 12px', fontSize: '12px',
            fontFamily: 'Fira Code, monospace',
            color: '#4a4a6a', whiteSpace: 'nowrap',
          }}>
            {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
          </div>
        </div>

        {exp.is_current && (
          <span style={{
            display: 'inline-block', background: '#1a1a2e',
            color: '#fff', fontSize: '11px',
            fontFamily: 'Fira Code, monospace',
            padding: '2px 10px', borderRadius: '20px',
            marginBottom: '0.8rem',
          }}>
            current
          </span>
        )}

        <p style={{
          color: '#6b6b8a', lineHeight: '1.8',
          fontSize: '0.9rem', margin: 0,
        }}>
          {exp.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function() {
    async function fetchExperience() {
      try {
        const res = await axios.get(API + '/experience/')
        setExperiences(res.data)
      } catch (err) {
        console.error('Failed to fetch experience:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop:  '80px',
    }}>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience
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
            marginBottom: '3rem',
            marginTop: '-2rem',
          }}
        >
          // print("my work history")
        </motion.p>

        {loading ? (
          <Loader />
        ) : experiences.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {experiences.map(function(exp, index) {
              return (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
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