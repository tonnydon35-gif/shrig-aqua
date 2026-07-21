'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, Mail, MapPin, ChevronRight, Check,
  X, Menu, Shield, Award, Wrench, Clock, Building2,
  Droplets, ArrowRight, ArrowUp, HeadphonesIcon,
  UtensilsCrossed, GraduationCap, School, Hotel, HeartPulse,
  Building, Factory, Package, Store, Home, Beaker,
  Filter, Star, Zap, BarChart3, Settings,
} from 'lucide-react'
import {
  BUSINESS_NAME, TAGLINE, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY,
  PHONE_ALT, PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_COMMERCIAL,
  WHATSAPP_URL, SERVICE_AREAS, WORKING_HOURS, ADDRESS_LINE, waLink,
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
    { href: '/#services', label: 'RO Services' },
    { href: '/ac-service', label: 'AC Services' },
    { href: '/commercial-ro', label: 'Commercial RO' },
    { href: '/ro-amc', label: 'AMC Plans' },
    { href: '/#about', label: 'About Us' },
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
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#041827]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#3CE1EE] opacity-[0.02] blur-[60px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-white/30" />
            <span className="text-[#20C5D8] font-medium">Commercial RO</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
            <Building2 size={14} /> Commercial & Industrial RO Systems
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
            High-Capacity RO Systems<br /><span className="text-[#20C5D8]">for Your Business.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            From 250 LPH compact units to 3000+ LPH industrial plants — we design, install, and maintain commercial RO systems for businesses across Mathura.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className="btn-aqua text-base px-7 py-3.5 justify-center"><MessageCircle size={18} /> Discuss Your Requirement</a>
            <a href={`tel:${PHONE_PRIMARY}`} className="btn-outline text-base px-7 py-3.5 justify-center"><Phone size={18} /> Call {PHONE_PRIMARY_DISPLAY}</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            {['Free site survey', 'Custom configurations', 'Ongoing AMC support', 'Mathura-wide service'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                <Check size={16} className="text-[#20C5D8] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============= CAPACITIES ============= */
const CAPACITIES = [
  {
    range: '250 – 500 LPH',
    label: 'Compact Commercial',
    description: 'Perfect for small offices, restaurants, cafés, clinics, and coaching institutes that need a reliable purified water supply.',
    features: ['Compact skid-mounted design', 'Low power consumption', 'Fully automatic operation', 'Easy maintenance'],
    popular: false,
    waMsg: 'Hello Shrig Aqua, I want to enquire about the 250-500 LPH Commercial RO system.',
  },
  {
    range: '1000 – 2000 LPH',
    label: 'High-Demand Commercial',
    description: 'Built for schools, hotels, banquet halls, hospitals, and housing societies with higher water consumption needs.',
    features: ['Heavy-duty FRP / SS vessels', 'Automatic control valves', 'Anti-scalant dosing system', 'Multi-stage filtration'],
    popular: true,
    waMsg: 'Hello Shrig Aqua, I want to enquire about the 1000-2000 LPH Commercial RO system.',
  },
  {
    range: '3000+ LPH',
    label: 'Industrial Custom',
    description: 'Custom-engineered large-capacity plants for manufacturing units, mineral water packaging, and industrial processing.',
    features: ['Custom multi-stage filtration', 'Industrial softeners & sand filters', 'High-capacity RO membranes', 'Full piping & integration'],
    popular: false,
    waMsg: 'Hello Shrig Aqua, I want to enquire about the 3000+ LPH Industrial RO system.',
  },
]

function CapacitiesSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading
            label="Capacities"
            title="Choose the right capacity for your business."
            subtitle="Three tiers covering every need — from compact commercial to full-scale industrial."
          />
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-6">
          {CAPACITIES.map((cap, i) => (
            <FadeInSection key={cap.range} delay={i * 80}>
              <div className={`card-white p-6 sm:p-7 flex flex-col h-full relative group ${cap.popular ? 'ring-2 ring-[#20C5D8] shadow-lg shadow-[#20C5D8]/10' : ''}`}>
                {cap.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#20C5D8] text-white text-xs font-semibold whitespace-nowrap">Most Popular</div>
                )}
                <div className="text-[10px] uppercase tracking-wider text-[#607789] font-semibold mb-1">{cap.label}</div>
                <div className="font-heading text-3xl text-[#0B2135] mb-3">{cap.range}</div>
                <p className="text-sm text-[#607789] leading-relaxed mb-5">{cap.description}</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {cap.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0B2135]">
                      <Check size={16} className="text-[#20C5D8] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(cap.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm text-center transition-all block ${cap.popular ? 'bg-[#20C5D8] text-white hover:bg-[#1ab0c2]' : 'border border-[#20C5D8]/30 text-[#20C5D8] hover:bg-[#20C5D8]/5'}`}
                >
                  <MessageCircle size={16} className="inline mr-1.5" />
                  Enquire Now
                </a>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= PROCESS ============= */
const PROCESS_STEPS = [
  { icon: Beaker, title: 'Requirement Analysis & Water Testing', desc: 'We test your source water and understand your capacity needs.' },
  { icon: Filter, title: 'System Design & Configuration', desc: 'Custom system designed with right vessels, membranes, and media.' },
  { icon: Settings, title: 'Installation & Ongoing Support', desc: 'Professional installation, commissioning, and AMC support.' },
]

function ProcessSection() {
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading
            label="Our Process"
            title="From requirement to installation."
            subtitle="Every system is configured to your source water, capacity, and application."
          />
        </FadeInSection>
        <div className="grid sm:grid-cols-3 gap-8 mt-8">
          {PROCESS_STEPS.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 80} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-md border border-[#20C5D8]/20 flex items-center justify-center">
                <step.icon size={28} className="text-[#20C5D8]" />
              </div>
              <div className="mt-3 text-xs font-bold text-[#20C5D8]">STEP 0{i + 1}</div>
              <h3 className="font-heading text-lg text-[#0B2135] mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-[#607789] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= APPLICATIONS ============= */
const APPLICATIONS = [
  { label: 'Offices & Corporate', Icon: Building2 },
  { label: 'Restaurants & Cafés', Icon: UtensilsCrossed },
  { label: 'Schools & Colleges', Icon: School },
  { label: 'Coaching Institutes', Icon: GraduationCap },
  { label: 'Hotels & Resorts', Icon: Hotel },
  { label: 'Hospitals & Clinics', Icon: HeartPulse },
  { label: 'Banquet Halls', Icon: Building },
  { label: 'Housing Societies', Icon: Home },
  { label: 'Manufacturing Plants', Icon: Factory },
  { label: 'Packaging Units', Icon: Package },
  { label: 'Shopping Malls', Icon: Store },
  { label: 'Gyms & Spas', Icon: Droplets },
]

function ApplicationsSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading
            label="Applications"
            title="Serving businesses across Mathura."
            subtitle="We provide commercial RO solutions for a wide range of industries and establishments."
          />
        </FadeInSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {APPLICATIONS.map((app, i) => (
            <FadeInSection key={app.label} delay={i * 40}>
              <div className="card-white p-4 flex flex-col items-center text-center gap-2 hover:border-[#20C5D8]/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center">
                  <app.Icon size={20} className="text-[#20C5D8]" />
                </div>
                <span className="text-xs font-medium text-[#0B2135] leading-tight">{app.label}</span>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= WHY ============= */
const WHY_BENEFITS = [
  { icon: Award, title: 'Custom Engineered', desc: 'Every system designed around your source water and capacity needs.' },
  { icon: Wrench, title: 'Professional Installation', desc: 'Expert installation with proper piping, testing, and commissioning.' },
  { icon: Shield, title: 'Ongoing AMC Support', desc: 'Preventive maintenance plans to keep your system running efficiently.' },
  { icon: Clock, title: 'Quick Service in Mathura', desc: 'Local support team for fast response across Mathura and nearby areas.' },
  { icon: BarChart3, title: 'Water Quality Testing', desc: 'We test TDS, hardness, and contaminants before recommending a system.' },
  { icon: HeadphonesIcon, title: 'End-to-End Support', desc: 'From site survey to installation and annual maintenance — we handle it all.' },
]

function WhySection() {
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading
            label="Why Shrig Aqua"
            title="Why choose us for your commercial RO needs?"
            subtitle="We combine technical expertise with local service to deliver reliable water treatment solutions."
          />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_BENEFITS.map((b, i) => (
            <FadeInSection key={b.title} delay={i * 60}>
              <div className="card-white p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#20C5D8]/10 flex items-center justify-center shrink-0">
                  <b.icon size={22} className="text-[#20C5D8]" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-[#0B2135] mb-1">{b.title}</h3>
                  <p className="text-sm text-[#607789] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============= CTA ============= */
function CTASection() {
  return (
    <section className="section-navy section-padding wave-bg text-center">
      <div className="container-wide max-w-3xl">
        <FadeInSection>
          <h2 className="section-title text-white mb-4">Ready to discuss your commercial RO requirements?</h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">Get a free consultation and site survey for your business in Mathura.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className="btn-aqua px-8 py-3.5 text-base justify-center">
              <MessageCircle size={18} /> Enquire on WhatsApp
            </a>
            <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base border border-white/20 text-white hover:bg-white/5 transition-all">
              <Phone size={18} /> Call {PHONE_PRIMARY_DISPLAY}
            </a>
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
            <p className="text-sm text-white/50 leading-relaxed mb-4">{TAGLINE}. Professional RO, water purifier and AC services for homes and businesses in Mathura.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'About Us', 'Services', 'AMC Plans', 'Contact Us'].map((link) => (
                <li key={link}><Link href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {['RO Repair', 'RO Installation', 'Filter Replacement', 'AMC Plans', 'AC Services', 'Commercial RO'].map((s) => (
                <li key={s}><Link href={`/${s.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/50 hover:text-[#20C5D8] transition-colors">{s}</Link></li>
              ))}
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
      <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#20C5D8] flex items-center justify-center text-[#041827] shadow-lg hover:bg-[#3CE1EE] transition-all" aria-label="WhatsApp"><MessageCircle size={20} /></a>
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
        <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 px-4 py-2 min-h-[44px]"><MessageCircle size={18} className="text-[#20C5D8]" /><span className="text-[10px] text-white/50">WhatsApp</span></a>
        <a href={WHATSAPP_COMMERCIAL} target="_blank" rel="noopener noreferrer" className="btn-aqua px-6 py-2.5 text-sm">Enquire Now</a>
      </div>
    </div>
  )
}

/* ============= MAIN PAGE ============= */
export default function CommercialROPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <CapacitiesSection />
      <ProcessSection />
      <ApplicationsSection />
      <WhySection />
      <CTASection />
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}
