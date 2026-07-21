'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, ArrowRight, Send, X, Menu,
  Droplets, Mail, MapPin, ArrowUp, Clock,
} from 'lucide-react'
import {
  BUSINESS_NAME, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY, PHONE_ALT,
  PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, WHATSAPP_BOOKING,
  SERVICE_AREAS, WORKING_HOURS, ADDRESS_LINE, MAPS_URL, waLink,
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

  const links = [
    { href: '/', label: 'Home' },
    { href: '/ro-service', label: 'RO Service' },
    { href: '/ac-service', label: 'AC Service' },
    { href: '/ro-amc', label: 'AMC Plans' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

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
            <div className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5">{l.label}</Link>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/book-service" className="btn-aqua text-sm px-5 py-2.5">Book Service</Link>
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
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-3 px-4 text-lg font-heading text-white/80 hover:text-white hover:bg-white/5 rounded-xl">{l.label}</Link>
            ))}
          </div>
          <div className="px-4 pb-8 space-y-3">
            <a href={`tel:${PHONE_PRIMARY}`} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/20 text-white font-semibold"><Phone size={18} /> Call {PHONE_PRIMARY_DISPLAY}</a>
            <Link href="/book-service" onClick={() => setMenuOpen(false)} className="btn-aqua w-full justify-center py-3.5">Book Service</Link>
          </div>
        </div>
      )}
    </>
  )
}

function validatePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '')
  return digits.length === 10 ? digits : null
}

function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = {}
    if (!name.trim()) e2.name = 'Please enter your name'
    const validPhone = validatePhone(phone)
    if (!validPhone) e2.phone = 'Enter a valid 10-digit mobile number'
    if (!message.trim()) e2.message = 'Please enter your message'
    setErrors(e2)
    if (Object.keys(e2).length > 0) return

    setStatus('loading')
    const msg = [
      `Hello ${BUSINESS_NAME}, I have a query.`,
      `Name: ${name.trim()}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      `Message: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
    setStatus('success')
    setName('')
    setPhone('')
    setEmail('')
    setMessage('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  const fieldClass = 'w-full rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${fieldClass} h-11 ${errors.name ? 'border-red-400' : ''}`} />
          {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Phone *</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" className={`${fieldClass} h-11 ${errors.phone ? 'border-red-400' : ''}`} />
          {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Email <span className="text-[#607789]/60 font-normal">(optional)</span></label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className={`${fieldClass} h-11`} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Message *</label>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message..." className={`${fieldClass} py-2.5 resize-none ${errors.message ? 'border-red-400' : ''}`} />
        {errors.message && <p className="text-xs text-red-500 mt-0.5">{errors.message}</p>}
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn-aqua w-full justify-center py-3 text-base">
        {status === 'loading' ? <><Send size={18} /> Sending...</> : status === 'success' ? <><ArrowRight size={18} /> Message Sent!</> : <><Send size={18} /> Send Message</>}
      </button>
    </form>
  )
}

function ContactInfoCard({ icon: Icon, label, children, href }) {
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="card-white p-5 flex items-start gap-4 hover:border-[#20C5D8] transition-all">
      <div className="w-11 h-11 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center shrink-0">
        <Icon size={22} className="text-[#20C5D8]" />
      </div>
      <div>
        <div className="text-xs font-semibold text-[#607789] uppercase tracking-wider mb-0.5">{label}</div>
        <div className="text-sm text-[#0B2135] font-medium">{children}</div>
      </div>
    </Wrapper>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-[#041827] pt-28 md:pt-36 pb-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/70">Contact Us</span>
        </nav>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
            <Phone size={14} /> Get in Touch
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white">Contact {BUSINESS_NAME}</h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            Have a question or need service? Reach out to us through any of the channels below.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <section className="section-padding section-light -mt-6 relative z-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <ContactInfoCard icon={Phone} label="Call Primary" href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY_DISPLAY}</ContactInfoCard>
              <ContactInfoCard icon={Phone} label="Call Alternate" href={`tel:${PHONE_ALT}`}>{PHONE_ALT_DISPLAY}</ContactInfoCard>
              <ContactInfoCard icon={MessageCircle} label="WhatsApp" href={WHATSAPP_URL}>{PHONE_PRIMARY_DISPLAY}</ContactInfoCard>
              <ContactInfoCard icon={Mail} label="Email" href={`mailto:${EMAIL}`}>{EMAIL}</ContactInfoCard>
              <ContactInfoCard icon={MapPin} label="Address" href={MAPS_URL}>{ADDRESS_LINE}</ContactInfoCard>
              <ContactInfoCard icon={Clock} label="Working Hours">{WORKING_HOURS}</ContactInfoCard>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[rgba(8,53,80,0.12)] p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-xl text-[#0B2135] mb-1">Send us a Message</h2>
                <p className="text-sm text-[#607789] mb-6">We will get back to you via WhatsApp.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding section-navy">
        <div className="container-wide">
          <div className="text-center mb-8">
            <span className="section-label">Service Areas</span>
            <h2 className="section-title text-white mb-2">Areas We Serve</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area) => (
              <div key={area} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm">
                <MapPin size={14} className="inline mr-1.5 text-[#20C5D8]" />{area}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-aqua-tint section-padding text-center">
        <div className="container-wide max-w-3xl">
          <FadeInSectionInner>
            <h2 className="section-title mb-4">Need Service Right Away?</h2>
            <p className="section-subtitle mx-auto mb-8">Book a service online and we will confirm your appointment on WhatsApp.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/book-service" className="btn-aqua px-8 py-3.5 text-base justify-center">Book Service <ArrowRight size={18} /></Link>
              <a href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-dark px-8 py-3.5 text-base justify-center"><MessageCircle size={18} /> WhatsApp Us</a>
            </div>
          </FadeInSectionInner>
        </div>
      </section>
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(entry.target) } },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function FadeInSectionInner({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-[#041827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4"><Droplets size={22} className="text-[#20C5D8]" /><span className="font-heading text-lg">Shrig <span className="text-[#20C5D8]">Aqua</span></span></Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">Professional RO and AC services for homes and businesses in Mathura.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'RO Service', 'RO Installation', 'AMC Plans', 'AC Service', 'About'].map((link) => (
                <li key={link}><Link href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              <li><Link href="/ro-service" className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">RO Service</Link></li>
              <li><Link href="/ro-installation" className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">RO Installation</Link></li>
              <li><Link href="/ro-amc" className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">AMC Plans</Link></li>
              <li><Link href="/ac-service" className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">AC Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Service Areas</h4>
            <ul className="space-y-2.5">{SERVICE_AREAS.map((area) => (<li key={area}><span className="text-sm text-white/50">{area}</span></li>))}</ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${PHONE_PRIMARY}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-[#20C5D8] transition-colors"><Phone size={14} /> {PHONE_PRIMARY_DISPLAY}</a></li>
              <li><a href={`tel:${PHONE_ALT}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-[#20C5D8] transition-colors"><Phone size={14} /> {PHONE_ALT_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-[#20C5D8] transition-colors break-all"><Mail size={14} /> {EMAIL}</a></li>
              <li className="text-sm text-white/50"><span className="flex items-start gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> {ADDRESS_LINE}</span></li>
              <li className="text-sm text-white/50">{WORKING_HOURS}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
              <Link href="/privacy-policy" className="hover:text-white/60">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60">Terms and Conditions</Link>
              <Link href="/cancellation-policy" className="hover:text-white/60">Cancellation Policy</Link>
              <Link href="/service-warranty" className="hover:text-white/60">Service Warranty</Link>
            </div>
            <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          </div>
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
        <Link href="/book-service" className="btn-aqua px-6 py-2.5 text-sm">Book Service</Link>
      </div>
    </div>
  )
}
