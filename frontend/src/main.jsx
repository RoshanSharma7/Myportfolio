import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/global.css'
import Background3D from './three/Background3D.jsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111122',
            color: '#e0e0ff',
            border: '1px solid #1a1a3a',
          },
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
)
