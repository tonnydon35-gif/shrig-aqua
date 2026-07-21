'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, ChevronDown, ArrowRight, Check, X, Menu,
  Wind, Wrench, Shield, Award, Clock, Mail, MapPin, ArrowUp,
  Star, ThumbsUp, PenTool, Truck, Search, Thermometer,
  Snowflake, Droplets, Zap, RefreshCw,
} from 'lucide-react'
import {
  BUSINESS_NAME, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY, PHONE_ALT,
  PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, WHATSAPP_AC_SERVICE,
  WHATSAPP_BOOKING, SERVICE_AREAS, WORKING_HOURS, ADDRESS_LINE, waLink,
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

function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 60

  const links = [
    { href: '/', label: 'Home' },
    { href: '/ro-service', label: 'RO Service' },
    { href: '/ac-service', label: 'AC Service' },
    { href: '/ro-installation', label: 'RO Installation' },
    { href: '/ro-amc', label: 'AMC Plans' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[#041827] flex items-center justify-center">
                <Wind size={20} className="text-[#20C5D8]" />
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
                  <div className="text-[10px] uppercase tracking-wider text-white/40">Call Us</div>
                  <div className="font-semibold text-white">{PHONE_PRIMARY_DISPLAY}</div>
                </div>
              </a>
              <Link href="/book-service" className="btn-aqua text-sm px-5 py-2.5">Book AC Service</Link>
            </div>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-white/80 hover:text-white" aria-label="Open menu"><Menu size={22} /></button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#041827] flex flex-col">
          <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Wind size={20} className="text-[#20C5D8]" />
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
            <Link href="/book-service" onClick={() => setMenuOpen(false)} className="btn-aqua w-full justify-center py-3.5">Book AC Service</Link>
          </div>
        </div>
      )}
    </>
  )
}

const AC_SERVICES = [
  { icon: Wrench, title: 'AC Repair', desc: 'Fix all AC issues including cooling problems, compressor faults, and electrical faults.' },
  { icon: Snowflake, title: 'AC Installation', desc: 'Professional split AC installation, mounting, and setup.' },
  { icon: Droplets, title: 'AC Cleaning & Service', desc: 'Deep cleaning, coil cleaning, filter cleaning, and general maintenance.' },
  { icon: Thermometer, title: 'Gas Refill', desc: 'Refrigerant gas refill and pressure check for optimal cooling.' },
  { icon: Zap, title: 'AC Electrical Repair', desc: 'PCB repair, capacitor replacement, and electrical fault diagnosis.' },
  { icon: RefreshCw, title: 'AC Shifting & Reinstallation', desc: 'Safe disconnection, shifting, and reinstallation of AC units.' },
]

const COMMON_PROBLEMS = [
  { icon: Thermometer, label: 'AC Not Cooling', desc: 'Insufficient or no cooling' },
  { icon: Droplets, label: 'Water Leakage', desc: 'Water dripping from indoor unit' },
  { icon: Wind, label: 'Low Air Flow', desc: 'Weak airflow from vents' },
  { icon: Zap, label: 'Not Starting', desc: 'AC not powering on' },
  { icon: Wrench, label: 'Unusual Noise', desc: 'Strange sounds from unit' },
  { icon: Shield, label: 'Gas Leak / Low Gas', desc: 'Insufficient refrigerant' },
  { icon: RefreshCw, label: 'Remote Not Working', desc: 'Remote control issues' },
  { icon: Snowflake, label: 'Ice Formation', desc: 'Ice buildup on coils' },
]

const PROCESS = [
  { icon: PenTool, title: 'Book a Service', desc: 'Call, WhatsApp, or book online' },
  { icon: Truck, title: 'Technician Visits', desc: 'Expert arrives at your location' },
  { icon: Search, title: 'Diagnose Issue', desc: 'Complete AC inspection' },
  { icon: Wrench, title: 'Service & Repair', desc: 'Professional repair performed' },
  { icon: ThumbsUp, title: 'Performance Check', desc: 'Cooling test & quality check' },
]

const BENEFITS = [
  { icon: Wrench, title: 'AC Specialists', desc: 'Trained AC service technicians' },
  { icon: Shield, title: 'Genuine Parts', desc: 'Quality replacement components' },
  { icon: Award, title: 'Transparent Pricing', desc: 'Approval before any work' },
  { icon: Clock, title: 'Quick Service', desc: 'Fast response and timely visits' },
  { icon: Star, title: 'All Brands', desc: 'We service all AC brands' },
  { icon: Truck, title: 'Local Coverage', desc: 'Serving Mathura & nearby areas' },
]

const FAQ_ITEMS = [
  { q: 'How long does an AC service take?', a: 'Standard AC service typically takes 45 minutes to 1.5 hours depending on the issue.' },
  { q: 'How often should AC be serviced?', a: 'We recommend servicing your AC at least once a year, preferably before summer.' },
  { q: 'Do you repair all AC brands?', a: 'Yes, we service all major AC brands including split, window, and inverter ACs.' },
  { q: 'Is gas refill included in AC service?', a: 'Gas refill is an additional service. Our technician will check gas pressure and advise if refill is needed.' },
  { q: 'Do you provide AC installation?', a: 'Yes, we provide professional split AC installation, mounting, and setup.' },
  { q: 'What areas do you serve?', a: 'We serve Mathura, Vrindavan, Kosi Kalan, Gokul, Govardhan, Barsana, and nearby areas.' },
]

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#041827]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3CE1EE] opacity-[0.02] blur-[60px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20 md:pt-36 md:pb-24">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/70">AC Service</span>
        </nav>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
              <Wind size={14} /> Professional AC Service
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white">
              AC Repair, Service &<br /><span className="text-[#20C5D8]">Installation</span><br />in Mathura
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              Expert AC repair, installation, cleaning, gas refill, and maintenance services for homes and businesses. Stay cool all year round.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/book-service" className="btn-aqua text-base px-7 py-3.5 justify-center">Book AC Service <ArrowRight size={18} /></Link>
              <a href={`tel:${PHONE_PRIMARY}`} className="btn-outline text-base px-7 py-3.5 justify-center"><Phone size={18} /> Call Now</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#20C5D8]" /> All AC brands</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#20C5D8]" /> Trained technicians</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#20C5D8]" /> Transparent pricing</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8">
              <Wind size={120} className="text-[#20C5D8]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="AC Services" title="Complete AC care under one roof." subtitle="From repair to installation — we handle all your AC needs." />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AC_SERVICES.map((s, i) => (
            <FadeInSection key={s.title} delay={i * 60}>
              <div className="card-white p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center shrink-0">
                  <s.icon size={22} className="text-[#20C5D8]" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-[#0B2135] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#607789] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommonProblemsSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="Common AC Problems" title="Having AC trouble?" subtitle="Tell us the issue and we will fix it." />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMON_PROBLEMS.map((p, i) => (
            <FadeInSection key={p.label} delay={i * 40}>
              <div className="card-white p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center shrink-0">
                  <p.icon size={20} className="text-[#20C5D8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#0B2135]">{p.label}</h3>
                  <p className="text-xs text-[#607789] mt-0.5">{p.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection className="mt-8 text-center">
          <Link href="/book-service" className="btn-aqua px-8 py-3">Book AC Service</Link>
        </FadeInSection>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="Our Process" title="How our AC service works." subtitle="Simple, professional process from booking to completion." />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 60} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md border border-[#20C5D8]/20 flex items-center justify-center">
                <step.icon size={22} className="text-[#20C5D8]" />
              </div>
              <div className="mt-2 text-xs font-bold text-[#20C5D8]">0{i + 1}</div>
              <h3 className="font-heading text-sm text-[#0B2135] mt-1">{step.title}</h3>
              <p className="text-xs text-[#607789] mt-1 max-w-[140px] mx-auto">{step.desc}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section className="section-padding section-navy">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="Why Choose Us" title="Why choose Shrig Aqua for AC service." subtitle="Cooling experts you can rely on." light />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <FadeInSection key={b.title} delay={i * 60}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center shrink-0">
                  <b.icon size={22} className="text-[#20C5D8]" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-white/60">{b.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="section-padding section-light">
      <div className="container-wide max-w-3xl">
        <FadeInSection><SectionHeading label="FAQ" title="AC Service FAQs" /></FadeInSection>
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
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-navy section-padding wave-bg text-center">
      <div className="container-wide max-w-3xl">
        <FadeInSection>
          <h2 className="section-title text-white mb-4">AC Acting Up? Need Installation?</h2>
          <p className="text-white/65 text-lg mb-8">Book a technician visit or speak with our AC service team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book-service" className="btn-aqua px-8 py-3.5 text-base justify-center">Book AC Service <ArrowRight size={18} /></Link>
            <a href={WHATSAPP_AC_SERVICE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base border border-white/20 text-white hover:bg-white/5 transition-all"><MessageCircle size={18} /> WhatsApp</a>
            <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base border border-white/20 text-white hover:bg-white/5 transition-all"><Phone size={18} /> Call Now</a>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#041827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4"><Wind size={22} className="text-[#20C5D8]" /><span className="font-heading text-lg">Shrig <span className="text-[#20C5D8]">Aqua</span></span></Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">Professional RO, water purifier and AC services for homes and businesses in Mathura.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'RO Service', 'AC Service', 'RO Installation', 'AMC Plans', 'Contact'].map((link) => (
                <li key={link}><Link href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['AC Repair', 'AC Installation', 'AC Cleaning', 'Gas Refill', 'RO Service'].map((s) => (
                <li key={s}><Link href={`/${s.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{s}</Link></li>
              ))}
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
        <Link href="/book-service" className="btn-aqua px-6 py-2.5 text-sm">Book AC Service</Link>
      </div>
    </div>
  )
}

export default function ACServicePage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CommonProblemsSection />
      <ProcessSection />
      <BenefitsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}
