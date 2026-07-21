'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, Mail, MapPin, ChevronRight, Check,
  X, Menu, Star, Shield, Clock, Wrench, Award,
  Droplets, ChevronDown, ArrowRight, Zap, Building2,
  Thermometer, RefreshCw, Search, ThumbsUp,
  Filter, Layers, Beaker, Wind, Sparkles, Truck, PenTool,
  HeadphonesIcon, BarChart3, ArrowUp,
} from 'lucide-react'
import {
  BUSINESS_NAME, TAGLINE, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY,
  PHONE_ALT, PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, WHATSAPP_BOOKING,
  WHATSAPP_RO_SERVICE, WHATSAPP_AC_SERVICE, WHATSAPP_COMMERCIAL,
  SERVICE_AREAS, AMC_PLANS, STATS, SERVICES, FAQ_ITEMS, COMMON_PROBLEMS,
  WORKING_HOURS, ADDRESS_LINE, waLink,
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

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = (e) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
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

function FadeInSection({ children, className = '', delay = 0 }) {
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

function SectionHeading({ label, title, subtitle, light, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''} ${light ? 'text-white' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className={`section-title ${center ? 'mx-auto' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle mt-4 ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </div>
  )
}

/* ============= NAVBAR ============= */
function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 60

  const links = [
    { href: '/', label: 'Home' },
    { href: '#services', label: 'RO Services' },
    { href: '/ac-service', label: 'AC Services' },
    { href: '/commercial-ro', label: 'Commercial RO' },
    { href: '/ro-amc', label: 'AMC Plans' },
    { href: '#about', label: 'About Us' },
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
              <a href={`tel:${PHONE_PRIMARY}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Phone size={14} />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">Call Us Anytime</div>
                  <div className="font-semibold text-white">{PHONE_PRIMARY_DISPLAY}</div>
                </div>
              </a>
              <Link href="/book-service" className="btn-aqua text-sm px-5 py-2.5">Book a Service</Link>
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
            <Link href="/book-service" onClick={() => setMenuOpen(false)} className="btn-aqua w-full justify-center py-3.5">Book a Service</Link>
          </div>
        </div>
      )}
    </>
  )
}

/* ============= HERO ============= */
function HeroSection() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#041827]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3CE1EE] opacity-[0.02] blur-[60px]" />
        {!reducedMotion && (
          <>
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-[#20C5D8]/20 animate-bubble" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#3CE1EE]/15 animate-bubble" style={{ animationDuration: '11s', animationDelay: '2s' }} />
            <div className="absolute bottom-[15%] right-[25%] w-2.5 h-2.5 rounded-full bg-[#20C5D8]/15 animate-bubble" style={{ animationDuration: '9s', animationDelay: '4s' }} />
            <div className="absolute bottom-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#3CE1EE]/20 animate-bubble" style={{ animationDuration: '7s', animationDelay: '1s' }} />
          </>
        )}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
              <Zap size={14} /> Professional RO & AC Service Experts
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
              Pure Water.<br /><span className="text-[#20C5D8]">Reliable Service.</span><br />Complete Peace of Mind.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              Expert RO, water purifier and AC installation, repair and maintenance services for homes and businesses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/book-service" className="btn-aqua text-base px-7 py-3.5 justify-center">Book RO Service <ArrowRight size={18} /></Link>
              <a href={`tel:${PHONE_PRIMARY}`} className="btn-outline text-base px-7 py-3.5 justify-center"><Phone size={18} /> Call Now</a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: 'Same-day service' },
                { icon: Wrench, label: 'Trained technicians' },
                { icon: Shield, label: 'Genuine parts' },
                { icon: Award, label: 'Transparent pricing' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/60 text-sm">
                  <item.icon size={16} className="text-[#20C5D8] shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4]">
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#20C5D8]/10 to-transparent blur-3xl" />
              <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl" aria-label="RO Water Purifier">
                <defs>
                  <linearGradient id="ro-body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.97" />
                    <stop offset="100%" stopColor="#f0f4f8" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <ellipse cx="150" cy="390" rx="100" ry="8" fill="#20C5D8" opacity="0.08" />
                <rect x="60" y="40" width="180" height="340" rx="24" fill="url(#ro-body)" stroke="#e2e8f0" strokeWidth="1" />
                <rect x="75" y="55" width="150" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                <circle cx="100" cy="70" r="4" fill="#22c55e" opacity="0.8" />
                <text x="150" y="74" textAnchor="middle" fill="#0B2135" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2">PURE</text>
                <rect x="80" y="105" width="30" height="130" rx="15" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="135" y="105" width="30" height="130" rx="15" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="190" y="105" width="30" height="130" rx="15" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <text x="95" y="260" textAnchor="middle" fill="#607789" fontFamily="Inter, sans-serif" fontSize="7">SED</text>
                <text x="150" y="260" textAnchor="middle" fill="#607789" fontFamily="Inter, sans-serif" fontSize="7">CARBON</text>
                <text x="205" y="260" textAnchor="middle" fill="#607789" fontFamily="Inter, sans-serif" fontSize="7">RO</text>
                <line x1="95" y1="100" x2="95" y2="85" stroke="#20C5D8" strokeWidth="1.5" opacity="0.6" />
                <line x1="150" y1="100" x2="150" y2="85" stroke="#20C5D8" strokeWidth="1.5" opacity="0.6" />
                <line x1="205" y1="100" x2="205" y2="85" stroke="#20C5D8" strokeWidth="1.5" opacity="0.6" />
                <rect x="100" y="280" width="100" height="36" rx="8" fill="#041827" />
                <text x="150" y="303" textAnchor="middle" fill="#20C5D8" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2">TDS 15</text>
                <rect x="110" y="335" width="80" height="16" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
                <rect x="125" y="354" width="50" height="8" rx="2" fill="#e2e8f0" />
                <circle cx="150" cy="370" r="3" fill="#20C5D8" opacity="0.7">
                  {!reducedMotion && <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />}
                </circle>
              </svg>
              <div className="absolute -inset-4 rounded-3xl border border-[#20C5D8]/10 pointer-events-none" style={!reducedMotion ? { animation: 'pulseGlow 4s ease-in-out infinite' } : {}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============= QUICK BOOKING ============= */
function QuickBookingForm() {
  const [service, setService] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = {}
    if (!service) e2.service = 'Select a service'
    if (!name.trim()) e2.name = 'Enter your name'
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) e2.phone = 'Enter a valid 10-digit number'
    if (!area) e2.area = 'Select your area'
    if (!date) e2.date = 'Select a date'
    setErrors(e2)
    if (Object.keys(e2).length > 0) return

    setStatus('loading')
    const msg = [`Hello ${BUSINESS_NAME}, I want to book a service.`, `Service: ${service}`, `Name: ${name.trim()}`, `Phone: ${phone}`, `Area: ${area}`, `Preferred Date: ${date}`].join('\n')
    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section className="relative z-20 -mt-16 px-4 sm:px-6 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-[#20C5D8]/10 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Service *</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none">
                <option value="">Choose service</option>
                <option value="RO Repair">RO Repair</option>
                <option value="RO Installation">RO Installation</option>
                <option value="Filter Replacement">Filter Replacement</option>
                <option value="RO AMC">RO AMC</option>
                <option value="Commercial RO">Commercial RO</option>
                <option value="AC Repair">AC Repair</option>
                <option value="AC Installation">AC Installation</option>
                <option value="AC Service">AC Service</option>
              </select>
              {errors.service && <p className="text-xs text-red-500 mt-0.5">{errors.service}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none" />
              {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Phone *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" className="w-full h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none" />
              {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B2135] mb-1.5">Area *</label>
              <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none">
                <option value="">Select area</option>
                {SERVICE_AREAS.map((a) => (<option key={a} value={a}>{a}</option>))}
              </select>
              {errors.area && <p className="text-xs text-red-500 mt-0.5">{errors.area}</p>}
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={status === 'loading'} className="btn-aqua flex-1 justify-center h-11 text-sm">{status === 'loading' ? 'Booking...' : status === 'success' ? 'Booked!' : 'Book Service'}</button>
              <a href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 px-4 rounded-lg border border-[#20C5D8]/30 text-[#20C5D8] font-semibold text-sm hover:bg-[#20C5D8]/5 transition-colors"><MessageCircle size={18} /></a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ============= SERVICES ============= */
function ServicesSection() {
  return (
    <section id="services" className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="Our Services" title="Comprehensive water purification and air conditioning solutions." /></FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <FadeInSection key={svc.id} delay={i * 80}>
              <div className="card-white p-6 sm:p-7 flex flex-col h-full group">
                <div className="w-12 h-12 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center mb-5 group-hover:bg-[#20C5D8]/20 transition-colors">
                  {svc.id === 'commercial-ro' ? <Building2 size={24} className="text-[#20C5D8]" /> : svc.id === 'ac-service' ? <Wind size={24} className="text-[#20C5D8]" /> : svc.id === 'ro-amc' ? <Shield size={24} className="text-[#20C5D8]" /> : svc.id === 'filter-replacement' ? <Filter size={24} className="text-[#20C5D8]" /> : <Droplets size={24} className="text-[#20C5D8]" />}
                </div>
                <h3 className="font-heading text-xl text-[#0B2135] mb-3">{svc.title}</h3>
                <p className="text-sm text-[#607789] leading-relaxed flex-1 mb-6">{svc.description}</p>
                <Link href={svc.slug} className="inline-flex items-center gap-2 text-sm font-semibold text-[#20C5D8] hover:text-[#3CE1EE] transition-colors">{svc.cta} <ArrowRight size={14} /></Link>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= STATS ============= */
function StatsStrip() {
  return (
    <section className="section-navy section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeInSection key={stat.label} delay={i * 80} className="text-center">
              <div className="text-3xl sm:text-4xl font-heading text-[#20C5D8] mb-2">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= HOW RO WORKS ============= */
function HowROWorks() {
  const stages = [
    { icon: Droplets, title: 'Tap Water', desc: 'Raw water enters the purification system.' },
    { icon: Filter, title: 'Sediment Filter', desc: 'Removes visible dust, sand, dirt, and larger particles.' },
    { icon: Layers, title: 'Carbon Filter', desc: 'Helps reduce chlorine, odor, and unpleasant taste.' },
    { icon: Beaker, title: 'RO Membrane', desc: 'Reduces dissolved impurities and unwanted contaminants.' },
    { icon: Zap, title: 'UV Purification', desc: 'Helps deactivate harmful microorganisms.' },
    { icon: Sparkles, title: 'Mineral Enhancement', desc: 'Improves taste and helps balance essential minerals.' },
    { icon: Droplets, title: 'Pure Water', desc: 'Filtered water ready for use.' },
  ]
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="How RO Works" title="Understanding the water purification process." subtitle="Seven-stage filtration transforms tap water into clean water." /></FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mt-8">
          {stages.map((stage, i) => (
            <FadeInSection key={stage.title} delay={i * 60} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-md border border-[#20C5D8]/20 flex items-center justify-center"><stage.icon size={24} className="text-[#20C5D8]" /></div>
              <h4 className="font-heading text-sm text-[#0B2135] mt-3 mb-1">{stage.title}</h4>
              <p className="text-xs text-[#607789] leading-relaxed max-w-[140px] mx-auto">{stage.desc}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= COMMON PROBLEMS ============= */
function CommonProblems() {
  const [selected, setSelected] = useState(null)
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="Common Problems" title="What problem are you facing?" /></FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMMON_PROBLEMS.map((p, i) => (
            <FadeInSection key={p.label} delay={i * 40}>
              <button onClick={() => setSelected(selected === i ? null : i)} className={`w-full p-4 rounded-xl border text-left transition-all ${selected === i ? 'border-[#20C5D8] bg-[#20C5D8]/5 shadow-sm' : 'border-[rgba(8,53,80,0.12)] bg-white hover:border-[#20C5D8]/40 hover:shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {p.label.startsWith('RO') ? <Droplets size={14} className="text-[#20C5D8] shrink-0" /> : <Thermometer size={14} className="text-[#20C5D8] shrink-0" />}
                  <span className="font-semibold text-sm text-[#0B2135]">{p.label}</span>
                </div>
                <span className="text-xs text-[#607789]">{p.service}</span>
              </button>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection className="mt-8 text-center"><Link href="/book-service" className="btn-aqua px-8 py-3">Diagnose & Book Service</Link></FadeInSection>
      </div>
    </section>
  )
}

/* ============= WHY CHOOSE US ============= */
const BENEFITS = [
  { icon: Wrench, title: 'Trained Technicians', desc: 'Experienced and service-focused professionals.' },
  { icon: Shield, title: 'Genuine Parts', desc: 'Reliable and compatible replacement components.' },
  { icon: Award, title: 'Transparent Pricing', desc: 'Pricing approval before major repair or replacement work.' },
  { icon: Clock, title: 'Quick Response', desc: 'Fast scheduling and local support where available.' },
  { icon: HeadphonesIcon, title: 'Service Support', desc: 'Clear post-service assistance based on service terms.' },
  { icon: Building2, title: 'Home & Commercial', desc: 'Solutions for both residential and business requirements.' },
]

function WhyChooseUs() {
  return (
    <section id="about" className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="Why Choose Us" title="Why Choose Shrig Aqua" subtitle="We focus on quality, transparency, and customer satisfaction." /></FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <FadeInSection key={b.title} delay={i * 60}>
              <div className="card-white p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center shrink-0"><b.icon size={22} className="text-[#20C5D8]" /></div>
                <div><h3 className="font-heading text-base text-[#0B2135] mb-1">{b.title}</h3><p className="text-sm text-[#607789] leading-relaxed">{b.desc}</p></div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= AMC PLANS ============= */
function AMCPlansSection() {
  return (
    <section id="amc" className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="AMC Plans" title="Choose a suitable maintenance plan." subtitle="Regular maintenance keeps your system running efficiently." /></FadeInSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {AMC_PLANS.map((plan, i) => (
            <FadeInSection key={plan.id} delay={i * 80}>
              <div className={`card-white p-6 sm:p-7 flex flex-col h-full relative ${plan.highlighted ? 'ring-2 ring-[#20C5D8] shadow-lg shadow-[#20C5D8]/10' : ''}`}>
                {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#20C5D8] text-white text-xs font-semibold">Recommended</div>}
                <h3 className="font-heading text-xl text-[#0B2135] mb-1">{plan.name}</h3>
                <div className="text-2xl font-heading text-[#20C5D8] mb-5">{plan.priceLabel}</div>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-[#607789]"><Check size={16} className="text-[#20C5D8] shrink-0 mt-0.5" />{f}</li>))}
                </ul>
                <Link href="/book-service" className={`w-full py-2.5 rounded-lg font-semibold text-sm text-center transition-all block ${plan.highlighted ? 'bg-[#20C5D8] text-white hover:bg-[#1ab0c2]' : 'border border-[#20C5D8]/30 text-[#20C5D8] hover:bg-[#20C5D8]/5'}`}>Contact for Plan</Link>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= COMMERCIAL RO ============= */
function CommercialROSection() {
  const industries = ['Hotels', 'Restaurants', 'Schools', 'Hospitals', 'Offices', 'Factories', 'Housing Societies']
  const steps = [
    { step: '1', title: 'Requirement Analysis', desc: 'Understanding your water needs.' },
    { step: '2', title: 'Water Testing', desc: 'Testing source water quality.' },
    { step: '3', title: 'Capacity Recommendation', desc: 'Right-sized system for your needs.' },
    { step: '4', title: 'Installation', desc: 'Professional system setup.' },
    { step: '5', title: 'Maintenance Support', desc: 'Ongoing service and care.' },
  ]
  return (
    <section className="section-padding section-navy">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <span className="section-label">Commercial RO</span>
            <h2 className="section-title text-white mb-4">Commercial RO Solutions for Growing Businesses</h2>
            <p className="text-white/65 leading-relaxed mb-6">Customized commercial RO systems with complete supply, installation and ongoing service.</p>
            <div className="flex flex-wrap gap-2 mb-8">{industries.map((ind) => (<span key={ind} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-medium">{ind}</span>))}</div>
            <div className="space-y-4 mb-8">{steps.map((item) => (<div key={item.step} className="flex items-start gap-3"><div className="w-7 h-7 rounded-full bg-[#20C5D8]/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-xs font-bold text-[#20C5D8]">{item.step}</span></div><div><div className="font-semibold text-white text-sm">{item.title}</div><div className="text-xs text-white/50">{item.desc}</div></div></div>))}</div>
            <Link href="/commercial-ro" className="btn-aqua inline-flex">Request Commercial RO Consultation <ArrowRight size={18} /></Link>
          </FadeInSection>
          <FadeInSection delay={150}>
            <div className="relative flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <rect x="30" y="60" width="340" height="280" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <rect x="60" y="100" width="60" height="180" rx="8" fill="rgba(32,197,216,0.08)" stroke="rgba(32,197,216,0.2)" strokeWidth="1" />
                  <rect x="150" y="100" width="60" height="180" rx="8" fill="rgba(32,197,216,0.08)" stroke="rgba(32,197,216,0.2)" strokeWidth="1" />
                  <rect x="240" y="100" width="60" height="180" rx="8" fill="rgba(32,197,216,0.08)" stroke="rgba(32,197,216,0.2)" strokeWidth="1" />
                  <line x1="90" y1="95" x2="270" y2="95" stroke="rgba(32,197,216,0.3)" strokeWidth="1.5" />
                  <line x1="90" y1="285" x2="270" y2="285" stroke="rgba(32,197,216,0.3)" strokeWidth="1.5" />
                  <text x="330" y="120" textAnchor="end" fill="rgba(255,255,255,0.5)" fontFamily="Inter, sans-serif" fontSize="8">PRE</text>
                  <text x="330" y="200" textAnchor="end" fill="rgba(255,255,255,0.5)" fontFamily="Inter, sans-serif" fontSize="8">RO</text>
                  <text x="330" y="280" textAnchor="end" fill="rgba(255,255,255,0.5)" fontFamily="Inter, sans-serif" fontSize="8">POST</text>
                </svg>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ============= SERVICE PROCESS ============= */
const PROCESS_STEPS = [
  { icon: PenTool, title: 'Book a Service', desc: 'Call, WhatsApp, or use the booking form.' },
  { icon: RefreshCw, title: 'Receive Confirmation', desc: 'We confirm your booking details.' },
  { icon: Truck, title: 'Technician Visit', desc: 'Technician arrives at your location.' },
  { icon: Search, title: 'Inspection & Diagnosis', desc: 'Complete system inspection.' },
  { icon: Award, title: 'Pricing Approval', desc: 'Get pricing approval before work.' },
  { icon: Wrench, title: 'Repair or Installation', desc: 'Professional service performed.' },
  { icon: ThumbsUp, title: 'Final Quality Check', desc: 'Quality check and cleanup.' },
]

function ServiceProcess() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="Service Process" title="How Our Service Works" subtitle="From booking to completion — a seamless experience." /></FadeInSection>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mt-8">
          {PROCESS_STEPS.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 50} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md border border-[#20C5D8]/20 flex items-center justify-center"><step.icon size={22} className="text-[#20C5D8]" /></div>
              <div className="mt-2 text-xs font-bold text-[#20C5D8]">0{i + 1}</div>
              <h4 className="font-heading text-sm text-[#0B2135] mt-1">{step.title}</h4>
              <p className="text-xs text-[#607789] mt-1 max-w-[120px] mx-auto">{step.desc}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= SERVICE AREAS ============= */
function ServiceAreas() {
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState(null)
  const handlePincodeCheck = () => {
    if (!pincode.trim()) { setPincodeResult({ type: 'error', msg: 'Enter a pincode' }); return }
    setPincodeResult({ type: 'info', msg: 'Please contact us to check availability for this area.' })
  }
  return (
    <section id="areas" className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection><SectionHeading label="Service Areas" title="We serve your neighborhood." subtitle="Check if we serve your area or contact us for details." /></FadeInSection>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <FadeInSection>
            <div className="grid grid-cols-2 gap-3">
              {SERVICE_AREAS.map((area) => (<div key={area} className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[rgba(8,53,80,0.08)]"><MapPin size={16} className="text-[#20C5D8] shrink-0" /><span className="text-sm font-medium text-[#0B2135]">{area}</span></div>))}
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="bg-white rounded-2xl border border-[rgba(8,53,80,0.12)] p-6 shadow-sm">
              <label className="block text-sm font-semibold text-[#0B2135] mb-2">Check Pincode Availability</label>
              <div className="flex gap-2">
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter pincode" className="flex-1 h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none" />
                <button onClick={handlePincodeCheck} className="btn-aqua h-11 px-5 text-sm">Check</button>
              </div>
              {pincodeResult && <p className={`mt-2 text-sm ${pincodeResult.type === 'error' ? 'text-red-500' : 'text-[#607789]'}`}>{pincodeResult.msg}</p>}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ============= FAQ ============= */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section id="faq" className="section-padding section-light">
      <div className="container-wide max-w-3xl">
        <FadeInSection><SectionHeading label="FAQ" title="Frequently Asked Questions" /></FadeInSection>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FadeInSection key={i} delay={i * 40}>
              <div className="bg-white rounded-xl border border-[rgba(8,53,80,0.12)] overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left" aria-expanded={openIndex === i}>
                  <span className="font-semibold text-sm sm:text-base text-[#0B2135] pr-4">{item.q}</span>
                  <ChevronDown size={18} className={`text-[#20C5D8] shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-[#607789] leading-relaxed">{item.a}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }) }} />
    </section>
  )
}

/* ============= FINAL CTA ============= */
function FinalCTA() {
  return (
    <section className="section-navy section-padding wave-bg text-center">
      <div className="container-wide max-w-3xl">
        <FadeInSection>
          <h2 className="section-title text-white mb-4">Need RO or AC Service Today?</h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">Book a technician visit or speak with our service team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book-service" className="btn-aqua px-8 py-3.5 text-base justify-center">Book Service <ArrowRight size={18} /></Link>
            <a href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base border border-white/20 text-white hover:bg-white/5 transition-all"><MessageCircle size={18} /> WhatsApp Us</a>
            <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base border border-white/20 text-white hover:bg-white/5 transition-all"><Phone size={18} /> Call Now</a>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ============= FOOTER ============= */
function Footer() {
  return (
    <footer className="bg-[#041827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4"><Droplets size={22} className="text-[#20C5D8]" /><span className="font-heading text-lg">Shrig <span className="text-[#20C5D8]">Aqua</span></span></Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">{TAGLINE}. Professional RO, water purifier and AC services for homes and businesses.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'About Us', 'Services', 'AMC Plans', 'Contact Us'].map((link) => (<li key={link}><Link href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{link}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {['RO Repair', 'RO Installation', 'Filter Replacement', 'AMC Plans', 'AC Services', 'Commercial RO'].map((s) => (<li key={s}><Link href={`/${s.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{s}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Service Areas</h4>
            <ul className="space-y-2.5">{SERVICE_AREAS.map((area) => (<li key={area}><span className="text-sm text-white/50">{area}</span></li>))}</ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Contact Us</h4>
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
              <Link href="/service-warranty" className="hover:text-white/60">Service Warranty Policy</Link>
            </div>
            <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============= FLOATING ACTIONS ============= */
function FloatingActions() {
  return (
    <div className="hidden md:flex fixed right-5 bottom-5 z-40 flex-col gap-3">
      <a href={`tel:${PHONE_PRIMARY}`} className="w-12 h-12 rounded-full bg-[#041827] border border-[#20C5D8]/20 flex items-center justify-center text-[#20C5D8] shadow-lg hover:bg-[#06263D] transition-all" aria-label="Call us"><Phone size={20} /></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#20C5D8] flex items-center justify-center text-[#041827] shadow-lg hover:bg-[#3CE1EE] transition-all" aria-label="WhatsApp"><MessageCircle size={20} /></a>
      <ScrollToTop />
    </div>
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
  return (<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all" aria-label="Scroll to top"><ArrowUp size={20} /></button>)
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

/* ============= MAIN PAGE ============= */
export default function HomePage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <QuickBookingForm />
      <ServicesSection />
      <StatsStrip />
      <HowROWorks />
      <CommonProblems />
      <WhyChooseUs />
      <AMCPlansSection />
      <CommercialROSection />
      <ServiceProcess />
      <ServiceAreas />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}
