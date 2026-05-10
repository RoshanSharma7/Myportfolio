import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCertifications } from '../api/certification'
import { Helmet } from 'react-helmet-async'
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
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #e0e0f0',
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
            color: '#1a1a2e',
            marginBottom: '0.3rem',
          }}>
            {cert.title}
          </h3>
          <p style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.8rem',
            color: '#4a4a6a',
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
              border: '1.5px solid #1a1a2e',
              color: '#1a1a2e',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: 'Fira Code, monospace',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
            }}
            onMouseOver={function (e) {
              e.currentTarget.style.background = '#1a1a2e'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseOut={function (e) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#1a1a2e'
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
      background: 'linear-gradient(135deg, #f8f9fa 0%, #eeeef8 100%)',
      paddingTop: '80px',
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
            color: '#9999bb',
            fontSize: '0.85rem',
            marginBottom: '3rem',
            marginTop: '-2rem',
          }}
        >
          // print("my certifications and achievements")
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