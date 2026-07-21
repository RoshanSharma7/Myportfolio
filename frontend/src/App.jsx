import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Preloader   from './components/Preloader'
import Home          from './pages/Home'
import About         from './pages/About'
import Experience    from './pages/Experience'
import Skills        from './pages/Skills'
import Education     from './pages/Education'
import Certification from './pages/Certification'
import Projects      from './pages/Projects'
import Contact       from './pages/Contact'
import Login         from './pages/Login'
import Admin         from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/experience"     element={<Experience />} />
        <Route path="/skills"         element={<Skills />} />
        <Route path="/education"      element={<Education />} />
        <Route path="/certification"  element={<Certification />} />
        <Route path="/projects"       element={<Projects />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/admin"          element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}