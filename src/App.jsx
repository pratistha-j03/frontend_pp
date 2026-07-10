import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs'
import FeaturesSection from './components/landingpage/Features'
import ServiceSection from './components/landingpage/OurServices'
import AboutSection from './components/landingpage/AboutSection'
import HeroSection from './components/landingpage/Hero'
import AdminPanel from './pages/AdminPanel'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import FloatingActions from './components/landingpage/FloatingActions'
import CTAButtons from './components/landingpage/CtaBtns'

const App = () => {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <CTAButtons/>
            <ServiceSection />
            <FeaturesSection />
            <AboutSection />
          </>
        }/>
        <Route path="/about" element={
          <>
            <HeroSection />
            <AboutSection />
          </>
        }/>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<ServiceSection />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App