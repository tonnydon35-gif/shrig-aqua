'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, ArrowUp, X, Menu, Droplets,
} from 'lucide-react'
import {
  BUSINESS_NAME, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY,
  PHONE_ALT, PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, ADDRESS_LINE,
} from '@/lib/business'

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}

function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 60

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[#041827] flex items-center justify-center">
                <Droplets size={20} className="text-[#20C5D8]" />
              </div>
              <div>
                <span className="font-heading text-lg text-white">Shrig</span>
                <span className="font-heading text-lg text-[#20C5D8]"> Aqua</span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/" className="btn-outline text-sm px-5 py-2.5">Back to Home</Link>
            </div>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-white/80 hover:text-white" aria-label="Open menu"><Menu size={22} /></button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#041827] flex flex-col">
          <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Droplets size={20} className="text-[#20C5D8]" />
              <span className="font-heading text-lg text-white">Shrig <span className="text-[#20C5D8]">Aqua</span></span>
            </Link>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-white/80 hover:text-white"><X size={22} /></button>
          </div>
          <div className="flex-1 flex flex-col px-4 py-8 gap-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-lg font-heading text-white/80 hover:text-white hover:bg-white/5 rounded-xl">Home</Link>
            <Link href="/ro-service" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-lg font-heading text-white/80 hover:text-white hover:bg-white/5 rounded-xl">RO Service</Link>
            <Link href="/ac-service" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-lg font-heading text-white/80 hover:text-white hover:bg-white/5 rounded-xl">AC Service</Link>
          </div>
        </div>
      )}
    </>
  )
}

function PolicyLayout({ children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white/70">Terms and Conditions</span>
      </nav>
      <h1 className="font-heading text-3xl sm:text-4xl text-white mb-4">Terms and Conditions</h1>
      <p className="text-white/50 text-sm mb-8">Effective date: 1st January 2024</p>
      <div className="prose prose-sm max-w-none text-white/70 space-y-4 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default function TermsPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <section className="min-h-screen bg-[#041827] pt-24 sm:pt-28 pb-16">
        <PolicyLayout>
          <h2 className="font-heading text-xl text-white mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the {BUSINESS_NAME} website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">2. Services</h2>
          <p>{BUSINESS_NAME} provides RO water purifier and AC repair, installation, and maintenance services. The scope of service will be discussed and agreed upon before any work begins. Service descriptions on our website are for informational purposes and may be subject to change.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">3. Booking and Confirmation</h2>
          <p>Service bookings can be made through our website, phone, or WhatsApp. A booking is confirmed when we acknowledge it. We reserve the right to decline or reschedule bookings based on availability.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">4. Pricing and Payment</h2>
          <p>Prices for services are provided at the time of booking or before work begins. We provide transparent pricing and will obtain approval before any major repair or replacement work. Payment is collected after service completion unless otherwise agreed.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">5. Cancellation and Rescheduling</h2>
          <p>Please refer to our <Link href="/cancellation-policy" className="text-[#20C5D8] hover:underline">Cancellation Policy</Link> for details on cancellation and rescheduling.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">6. Service Warranty</h2>
          <p>Our services are covered by a warranty as described in our <Link href="/service-warranty" className="text-[#20C5D8] hover:underline">Service Warranty Policy</Link>. This warranty does not cover damage caused by misuse, unauthorized modification, or external factors.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">7. Customer Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate information when booking services</li>
            <li>Ensure safe access to equipment and premises</li>
            <li>Inform us of any known issues or hazards</li>
            <li>Settle payments as agreed</li>
          </ul>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">8. Limitation of Liability</h2>
          <p>{BUSINESS_NAME} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">9. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, and branding, is the property of {BUSINESS_NAME} unless otherwise noted.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">10. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">11. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Mathura, Uttar Pradesh.</p>

          <h2 className="font-heading text-xl text-white mt-8 mb-3">12. Contact Us</h2>
          <p>
            Phone: <a href={`tel:${PHONE_PRIMARY}`} className="text-[#20C5D8] hover:underline">{PHONE_PRIMARY_DISPLAY}</a><br />
            Email: <a href={`mailto:${EMAIL}`} className="text-[#20C5D8] hover:underline">{EMAIL}</a>
          </p>
        </PolicyLayout>
      </section>
      <PolicyFooter />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}

function PolicyFooter() {
  return (
    <footer className="bg-[#041827] border-t border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-center">
          <Link href="/" className="btn-outline text-sm px-6 py-2.5">Back to Home</Link>
        </div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all" aria-label="Scroll to top"><ArrowUp size={20} /></button>
  )
}

function FloatingActions() {
  return (
    <div className="hidden md:flex fixed right-5 bottom-5 z-40 flex-col gap-3">
      <a href={`tel:${PHONE_PRIMARY}`} className="w-12 h-12 rounded-full bg-[#041827] border border-[#20C5D8]/20 flex items-center justify-center text-[#20C5D8] shadow-lg hover:bg-[#06263D] transition-all" aria-label="Call us"><Phone size={20} /></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#20C5D8] flex items-center justify-center text-[#041827] shadow-lg hover:bg-[#3CE1EE] transition-all" aria-label="WhatsApp"><MessageCircle size={20} /></a>
      <ScrollToTop />
    </div>
  )
}

function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#041827]/95 backdrop-blur-lg border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        <a href={`tel:${PHONE_PRIMARY}`} className="flex flex-col items-center gap-0.5 px-4 py-2 min-h-[44px]"><Phone size={18} className="text-white/70" /><span className="text-[10px] text-white/50">Call</span></a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 px-4 py-2 min-h-[44px]"><MessageCircle size={18} className="text-[#20C5D8]" /><span className="text-[10px] text-white/50">WhatsApp</span></a>
        <Link href="/" className="btn-outline px-5 py-2 text-sm">Home</Link>
      </div>
    </div>
  )
}
