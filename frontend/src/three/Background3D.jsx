import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const MODELS = [
<<<<<<< HEAD
  { url: '/models/laptop.glb',  desktopSize: 5, mobileSize: 4 },
  { url: '/models/cricket.glb', desktopSize: 6.5, mobileSize: 4.7 },
  { url: '/models/Box_01.glb',  desktopSize: 5, mobileSize: 3.5 },
=======
  { url: '/models/laptop.glb',  desktopSize: 4, mobileSize: 6.5 },
  { url: '/models/cricket.glb', desktopSize: 6, mobileSize: 7 },
  { url: '/models/Box_01.glb',  desktopSize: 5, mobileSize: 7 },
>>>>>>> 6fc5e948d2a37629a9d2ef5ef3b774ab23fbbd0f
]

function SingleModel({ url, size, onComplete }) {
  const { scene } = useGLTF(url)
  const ref       = useRef()
  const rotated   = useRef(0)

  useEffect(() => {
    if (!scene || !ref.current) return

    while (ref.current.children.length) {
      ref.current.remove(ref.current.children[0])
    }

    const clone  = scene.clone(true)
    const box    = new THREE.Box3().setFromObject(clone)
    const s      = new THREE.Vector3()
    box.getSize(s)
    const maxDim = Math.max(s.x, s.y, s.z)
    const scale  = size / maxDim
    clone.scale.setScalar(scale)

    const center = new THREE.Vector3()
    box.getCenter(center)
    clone.position.sub(center.multiplyScalar(scale))

    ref.current.add(clone)
    rotated.current = 0
  }, [scene, size])

  useFrame(() => {
    if (!ref.current) return
    const speed = 0.015
    ref.current.rotation.y += speed
    rotated.current += speed
    if (rotated.current >= Math.PI * 2) {
      rotated.current = 0
      onComplete()
    }
  })

  return <group ref={ref} position={[0, 0, 0]} />
}

export default function Background3D() {
  const [index,    setIndex]    = useState(0)
  const [fade,     setFade]     = useState(1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const switching = useRef(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleComplete = () => {
    if (switching.current) return
    switching.current = true
    setFade(0)
    setTimeout(() => {
      setIndex(i => (i + 1) % MODELS.length)
      setTimeout(() => {
        setFade(1)
        switching.current = false
      }, 100)
    }, 500)
  }

  const currentModel = MODELS[index]
  const currentSize  = isMobile
    ? currentModel.mobileSize
    : currentModel.desktopSize

  return (
    <div style={{
      position:      isMobile ? 'fixed': 'absolute',
      top:           isMobile ? '50%'  : '0',
      left:          isMobile ? '50%'  : 'auto',
      right:         isMobile ? 'auto' : '0',
      transform:     isMobile ? 'translate(-50%, -50%)' : 'none',
      width:         isMobile ? '100%' : '55%',
      height:        isMobile ? '80%'  : '100%',
      zIndex:        0,
      pointerEvents: 'none',
      opacity:       fade,
      transition:    'opacity 0.5s ease',
    }}>
      <Canvas
        camera={{
          position: [0, 1, isMobile ? 6 : 10],
          fov:      isMobile ? 60 : 50,
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isMobile ? 7 : 5} />
        <spotLight position={[10, 10, 10]} intensity={isMobile ? 6 : 4} castShadow />
        <spotLight position={[-10, 8, 5]}  intensity={isMobile ? 5 : 3} />
        <pointLight position={[0, 5, 10]}  intensity={isMobile ? 5 : 3} />
        <pointLight position={[0, -5, 5]}  intensity={isMobile ? 4 : 2} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <SingleModel
            key={currentModel.url + currentSize}
            url={currentModel.url}
            size={currentSize}
            onComplete={handleComplete}
          />
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={5}
            color="#1a1a2e"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/laptop.glb')
useGLTF.preload('/models/cricket.glb')
useGLTF.preload('/models/Box_01.glb')
