import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Capabilities from './sections/Capabilities'
import Spatial from './sections/Spatial'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import Login from './pages/Login'
import FloatingPhone from './components/FloatingPhone'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={
        <>
          <Preloader />
          <Header scrollRef={scrollRef} />
          <main>
            <Spatial />
            <Philosophy />
            <Works scrollRef={scrollRef} />
            <Capabilities />
            <Hero />
          </main>
          <Footer />
          <FloatingPhone />
        </>
      } />
    </Routes>
  )
}

export default App
