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
        no_skills_found()
      </p>
    </div>
  )
}

function LevelBadge({ level }) {
  const colors = {
    beginner: { bg: 'var(--badge-bg)', color: 'var(--accent-soft)' },
    intermediate: { bg: '#e8f4fd', color: '#1a5276' },
    expert: { bg: 'var(--text-primary)', color: 'var(--bg-secondary)' },
  }
  const style = colors[level] || colors.beginner

  return (
    <span style={{
      background: style.bg,
      color: style.color,
      fontSize: '10px',
      fontFamily: 'Fira Code, monospace',
      padding: '2px 8px',
      borderRadius: '20px',
    }}>
      {level}
    </span>
  )
}

function SkillChip({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s',
        cursor: 'default',
      }}
      onMouseOver={function(e) {
        e.currentTarget.style.borderColor = 'var(--text-primary)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'
      }}
      onMouseOut={function(e) {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      <p style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: 'var(--text-primary)',
        margin: 0,
      }}>
        {skill.name}
      </p>
      <LevelBadge level={skill.level} />
    </motion.div>
  )
}

function CategorySection({ category, skills, catIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
      style={{ marginBottom: '2.5rem' }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1rem',
      }}>
        <p style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          margin: 0,
        }}>
          {'//'} {category.toLowerCase()}
        </p>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '11px',
          color: 'var(--text-muted)',
          background: 'var(--badge-bg)',
          padding: '2px 8px',
          borderRadius: '20px',
        }}>
          {skills.length}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '0.8rem',
      }}>
        {skills.map(function(skill, index) {
          return (
            <SkillChip
              key={skill.id}
              skill={skill}
              index={index}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function() {
    async function fetchSkills() {
      try {
        const res = await axios.get(API + '/skills/')
        setSkills(res.data)
      } catch (err) {
        console.error('Failed to fetch skills:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const grouped = skills.reduce(function(acc, skill) {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
    }}>
      <Helmet>
        <title>Skills - Roshan Sharma </title>
      </Helmet>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
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
          print("my technologies and tools")
        </motion.p>

        {loading ? (
          <Loader />
        ) : skills.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {Object.keys(grouped).map(function(category, catIndex) {
              return (
                <CategorySection
                  key={category}
                  category={category}
                  skills={grouped[category]}
                  catIndex={catIndex}
                />
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}