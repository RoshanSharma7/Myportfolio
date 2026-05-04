import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background:   '#0d0d1a',
      borderTop:    '1px solid #1a1a3a',
      padding:      '2rem',
      textAlign:    'center',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin:   '0 auto',
        display:  'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize:   '1.2rem',
          background: 'linear-gradient(135deg, #00d4ff, #7b2fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
        }}>
          &lt;RS /&gt;
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com/RoshanSharma7" target="_blank" rel="noreferrer"
            style={{ color: '#8888aa', fontSize: '1.2rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color='#00d4ff'}
            onMouseOut={e  => e.target.style.color='#8888aa'}
          ><FiGithub /></a>
          <a href="https://linkedin.com/in/RoshanSharma7" target="_blank" rel="noreferrer"
            style={{ color: '#8888aa', fontSize: '1.2rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color='#00d4ff'}
            onMouseOut={e  => e.target.style.color='#8888aa'}
          ><FiLinkedin /></a>
          <a href="mailto:roshan.amlai96@email.com"
            style={{ color: '#8888aa', fontSize: '1.2rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color='#00d4ff'}
            onMouseOut={e  => e.target.style.color='#8888aa'}
          ><FiMail /></a>
        </div>

        <p style={{ color: '#8888aa', fontSize: '12px' }}>
          © {new Date().getFullYear()} — Built with React & Django. All rights reserved by Roshan Sharma.
        </p>
      </div>
    </footer>
  )
}