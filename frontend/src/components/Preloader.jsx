import { useState, useEffect } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const minTime = new Promise(resolve => setTimeout(resolve, 700))
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => window.addEventListener('load', resolve, { once: true }))
    const fontsReady = document.fonts?.ready || Promise.resolve()

    Promise.all([minTime, pageLoaded, fontsReady]).then(() => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 450)
    })
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      zIndex:         9999,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     '#f8f9fa',
      opacity:        fadeOut ? 0 : 1,
      transition:     'opacity 0.45s ease',
      pointerEvents:  fadeOut ? 'none' : 'auto',
    }}>
      <div style={{
        fontFamily:    'Space Grotesk, sans-serif',
        fontSize:      '1.6rem',
        fontWeight:    700,
        color:         '#1a1a2e',
        letterSpacing: '2px',
        marginBottom:  '1.2rem',
      }}>
        &lt;RS /&gt;
      </div>
      <div style={{
        width:        '34px',
        height:       '34px',
        border:       '3px solid #e0e0f0',
        borderTopColor: '#1a1a2e',
        borderRadius: '50%',
        animation:    'rs-preloader-spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes rs-preloader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}