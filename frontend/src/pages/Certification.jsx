import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCertifications } from '../api/certification'
import { Helmet } from 'react-helmet-async'
import { SkeletonCardGrid } from '../components/Skeleton'

function Loader() {
  return <SkeletonCardGrid count={4} minColWidth="340px" imageHeight="220px" />
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      background: 'var(--bg-secondary)', borderRadius: '16px',
      border: '1px dashed var(--border)',
    }}>
      <p style={{ fontFamily: 'Fira Code, monospace', color: 'var(--text-muted)' }}>
        no_certifications_found()
      </p>
    </div>
  )
}

function CertCard({ cert, index }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >

      {/* Certificate image */}
      {cert.image && (
        <img
          src={cert.image_url || cert.image}
          alt={cert.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'contain',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid var(--border)',
          }}
        />
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.3rem',
          }}>
            {cert.title}
          </h3>
          <p style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.8rem',
            color: 'var(--accent-soft)',
            margin: 0,
          }}>
            {cert.issuer}
          </p>
        </div>

        {cert.credential_url && (
          <a
            href={cert.credential_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1.5px solid var(--text-primary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: 'Fira Code, monospace',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
            }}
            onMouseOver={function (e) {
              e.currentTarget.style.background = 'var(--text-primary)'
              e.currentTarget.style.color = 'var(--bg-secondary)'
            }}
            onMouseOut={function (e) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            📄 View
          </a>
        )}
      </div>
    </motion.div>
  )
}


export default function Certification() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function fetchCerts() {
      try {
        const res = await getCertifications()
        setCerts(res.data)
      } catch (err) {
        console.error('Failed to fetch certifications:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCerts()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
    }}>
      <Helmet>
        <title>Certification - Roshan Sharma </title>
      </Helmet>
      <div className="section">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Certifications
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
          print("my certifications and achievements")
        </motion.p>

        {loading ? (
          <Loader />
        ) : certs.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {certs.map(function (cert, index) {
              return (
                <CertCard
                  key={cert.id}
                  cert={cert}
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