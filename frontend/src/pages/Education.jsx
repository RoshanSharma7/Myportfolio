import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
const API = import.meta.env.VITE_API_URL

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)' }}>loading...</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      background: 'var(--bg-secondary)', borderRadius: '16px',
      border: '1px dashed var(--border)',
    }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)' }}>
        no_education_found()
      </p>
    </div>
  )
}

function EducationCard({ edu, index }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ marginBottom: '1.5rem' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.8rem',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.2rem',
          }}>
            {edu.degree} in {edu.field}
          </h3>
          <p style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.85rem',
            color: 'var(--accent-soft)',
            margin: 0,
          }}>
            {edu.institution}
          </p>
        </div>

        <div style={{
          background: 'var(--badge-bg)',
          borderRadius: '20px',
          padding: '4px 12px',
          fontSize: '12px',
          fontFamily: 'Fira Code, monospace',
          color: 'var(--accent-soft)',
        }}>
          {edu.start_year} — {edu.is_current ? 'Present' : edu.end_year}
        </div>
      </div>

      {edu.is_current && (
        <span style={{
          display: 'inline-block',
          background: 'var(--text-primary)',
          color: 'var(--bg-secondary)',
          fontSize: '11px',
          fontFamily: 'Fira Code, monospace',
          padding: '2px 10px',
          borderRadius: '20px',
          marginBottom: '0.5rem',
        }}>
          current
        </span>
      )}

      {edu.grade && (
        <p style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          margin: 0,
        }}>
          Grade: {edu.grade}
        </p>
      )}
    </motion.div>
  )
}

export default function Education() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function() {
    async function fetchEducation() {
      try {
        const res = await axios.get(API + '/education/')
        setEducation(res.data)
      } catch (err) {
        console.error('Failed to fetch education:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
      paddingTop: '80px',
    }}>
      <Helmet>
        <title>Education - Roshan Sharma </title>
      </Helmet>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Education
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
            marginTop: '-2rem',
          }}
        >
          // print("my academic background")
        </motion.p>

        {loading ? (
          <Loader />
        ) : education.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {education.map(function(edu, index) {
              return (
                <EducationCard
                  key={edu.id}
                  edu={edu}
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