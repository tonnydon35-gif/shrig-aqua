'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, ArrowRight, Check, X, Menu,
  Droplets, Shield, Award, Clock, Mail, MapPin, ArrowUp,
  Heart, Target, Eye, Users, Star,
} from 'lucide-react'
import {
  BUSINESS_NAME, TAGLINE, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY,
  PHONE_ALT, PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, WHATSAPP_BOOKING,
  SERVICE_AREAS, WORKING_HOURS, ADDRESS_LINE, STATS,
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

const VALUES = [
  { icon: Droplets, title: 'Quality First', desc: 'Every service is performed with attention to detail and quality standards.' },
  { icon: Users, title: 'Customer Focus', desc: 'We listen to your needs and provide solutions that work for you.' },
  { icon: Shield, title: 'Trust & Transparency', desc: 'Clear communication, honest pricing, and reliable service.' },
  { icon: Award, title: 'Continuous Improvement', desc: 'We constantly update our skills and knowledge to serve you better.' },
]

const TEAM_HIGHLIGHTS = [
  'Trained and experienced service technicians',
  'Customer-focused approach',
  'Deep knowledge of RO and AC systems',
  'Timely and professional service delivery',
]

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#041827]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3CE1EE] opacity-[0.02] blur-[60px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20 md:pt-36 md:pb-24">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/70">About Us</span>
        </nav>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
            <Heart size={14} /> About {BUSINESS_NAME}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white">
            Our Story —<br /><span className="text-[#20C5D8]">{TAGLINE}</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {BUSINESS_NAME} is a trusted provider of RO water purifier and AC services in Mathura. We are committed to delivering reliable, professional, and affordable service to homes and businesses.
          </p>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title mb-4">Committed to Quality Service Since Day One</h2>
            <div className="space-y-4 text-[#607789] leading-relaxed">
              <p>{BUSINESS_NAME} was founded with a simple mission — to provide reliable, professional, and affordable water purification and air conditioning services to the people of Mathura and surrounding areas.</p>
              <p>We understand the importance of clean drinking water and a comfortable environment. Our team is dedicated to ensuring your RO systems and AC units perform at their best, every single day.</p>
              <p>We serve residential and commercial customers, offering everything from emergency repairs to scheduled maintenance plans. Our approach is built on transparency, quality, and customer satisfaction.</p>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="bg-white rounded-2xl border border-[rgba(8,53,80,0.12)] p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-heading text-[#20C5D8] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#607789]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="section-padding section-aqua-tint">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="Our Values" title="What drives us every day." subtitle="Our core principles guide everything we do." />
        </FadeInSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <FadeInSection key={v.title} delay={i * 60}>
              <div className="card-white p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#20C5D8]/10 flex items-center justify-center mb-4">
                  <v.icon size={28} className="text-[#20C5D8]" />
                </div>
                <h3 className="font-heading text-base text-[#0B2135] mb-2">{v.title}</h3>
                <p className="text-sm text-[#607789] leading-relaxed">{v.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div className="bg-[#041827] rounded-2xl p-8 sm:p-10">
              <div className="flex items-center gap-2 mb-4">
                <Droplets size={24} className="text-[#20C5D8]" />
                <span className="font-heading text-xl text-white">{BUSINESS_NAME}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Our team consists of skilled technicians who understand RO and AC systems inside out. We invest in training and tools to ensure every service visit meets our quality standards.
              </p>
              <ul className="space-y-3">
                {TEAM_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <Check size={16} className="text-[#20C5D8] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <span className="section-label">Our Team</span>
            <h2 className="section-title mb-4">Skilled Professionals You Can Trust</h2>
            <p className="text-[#607789] leading-relaxed mb-6">
              Our technicians undergo regular training to stay updated with the latest technologies and service practices. We take pride in our work and stand behind every service we deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book-service" className="btn-aqua px-6 py-3 justify-center">Book a Service <ArrowRight size={18} /></Link>
              <a href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer" className="btn-outline-dark px-6 py-3 justify-center"><MessageCircle size={18} /> WhatsApp Us</a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

function ServiceAreasSection() {
  return (
    <section className="section-padding section-navy">
      <div className="container-wide">
        <FadeInSection>
          <SectionHeading label="Service Areas" title="Where we serve." subtitle="Proudly serving Mathura and surrounding areas." light />
        </FadeInSection>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICE_AREAS.map((area) => (
            <div key={area} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
              <MapPin size={14} className="inline mr-1.5 text-[#20C5D8]" />{area}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-padding section-aqua-tint text-center">
      <div className="container-wide max-w-3xl">
        <FadeInSection>
          <h2 className="section-title mb-4">Ready to Experience Quality Service?</h2>
          <p className="section-subtitle mx-auto mb-8">Book a service today and let us take care of your RO and AC needs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book-service" className="btn-aqua px-8 py-3.5 text-base justify-center">Book Service <ArrowRight size={18} /></Link>
            <a href={`tel:${PHONE_PRIMARY}`} className="btn-outline-dark px-8 py-3.5 text-base justify-center"><Phone size={18} /> Call {PHONE_PRIMARY_DISPLAY}</a>
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
            <Link href="/" className="flex items-center gap-2 mb-4"><Droplets size={22} className="text-[#20C5D8]" /><span className="font-heading text-lg">Shrig <span className="text-[#20C5D8]">Aqua</span></span></Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">{TAGLINE}. Professional RO and AC services for homes and businesses in Mathura.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'RO Service', 'AC Service', 'AMC Plans', 'About', 'Contact'].map((link) => (
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

export default function AboutPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <ServiceAreasSection />
      <CTASection />
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}
