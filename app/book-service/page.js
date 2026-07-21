'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Phone, MessageCircle, ArrowRight, Check, X, Menu, Send,
  Droplets, Mail, MapPin, ArrowUp, Calendar, Clock, User,
  Building2, Wind, Shield,
} from 'lucide-react'
import {
  BUSINESS_NAME, PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY, PHONE_ALT,
  PHONE_ALT_DISPLAY, EMAIL, WHATSAPP_URL, WHATSAPP_BOOKING,
  SERVICE_AREAS, WORKING_HOURS, ADDRESS_LINE, waLink,
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
              <a href={`tel:${PHONE_PRIMARY}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Phone size={14} />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">Call Us</div>
                  <div className="font-semibold text-white">{PHONE_PRIMARY_DISPLAY}</div>
                </div>
              </a>
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
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-lg font-heading text-white/80 hover:text-white hover:bg-white/5 rounded-xl">Contact</Link>
          </div>
          <div className="px-4 pb-8 space-y-3">
            <a href={`tel:${PHONE_PRIMARY}`} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/20 text-white font-semibold"><Phone size={18} /> Call {PHONE_PRIMARY_DISPLAY}</a>
          </div>
        </div>
      )}
    </>
  )
}

const SERVICE_OPTIONS = [
  { value: 'RO Repair', label: 'RO Repair & Maintenance' },
  { value: 'RO Installation', label: 'RO Installation' },
  { value: 'RO Shifting', label: 'RO Shifting & Relocation' },
  { value: 'Filter Replacement', label: 'Filter & Membrane Replacement' },
  { value: 'RO AMC', label: 'RO AMC Plan' },
  { value: 'Commercial RO', label: 'Commercial RO System' },
  { value: 'AC Repair', label: 'AC Repair' },
  { value: 'AC Installation', label: 'AC Installation' },
  { value: 'AC Service', label: 'AC Cleaning & Service' },
  { value: 'AC Gas Refill', label: 'AC Gas Refill' },
  { value: 'AC Shifting', label: 'AC Shifting & Reinstallation' },
  { value: 'Other', label: 'Other Service' },
]

const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
]

function validatePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '')
  return digits.length === 10 ? digits : null
}

function BookingForm() {
  const formRef = useRef(null)
  const [service, setService] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [area, setArea] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = {}

    if (!service) e2.service = 'Please select a service'
    if (!name.trim()) e2.name = 'Please enter your name'
    const validPhone = validatePhone(phone)
    if (!validPhone) e2.phone = 'Enter a valid 10-digit mobile number'
    if (!area) e2.area = 'Please select your area'
    if (!date) e2.date = 'Please select a preferred date'
    if (!time) e2.time = 'Please select a preferred time'

    setErrors(e2)
    if (Object.keys(e2).length > 0) {
      const firstField = Object.keys(e2)[0]
      const el = formRef.current?.querySelector(`[name="${firstField}"]`)
      el?.focus()
      return
    }

    setStatus('loading')
    const msg = [
      `Hello ${BUSINESS_NAME}, I want to book a service.`,
      `Service: ${service}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      `Area: ${area}`,
      `Preferred Date: ${date}`,
      `Preferred Time: ${time}`,
      message ? `Message: ${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
    setStatus('success')
    setService('')
    setName('')
    setPhone('')
    setEmail('')
    setArea('')
    setDate('')
    setTime('')
    setMessage('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  const fieldClass = 'w-full h-11 rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none'
  const fieldError = 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
  const labelClass = 'block text-xs font-semibold text-[#0B2135] mb-1.5'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className={labelClass}>Service Required *</label>
          <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={`${fieldClass} ${errors.service ? fieldError : ''}`}>
            <option value="">Select service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.service && <p className="text-xs text-red-500 mt-0.5">{errors.service}</p>}
        </div>
        <div>
          <label htmlFor="name" className={labelClass}>Your Name *</label>
          <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className={`${fieldClass} ${errors.name ? fieldError : ''}`} />
          {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input id="phone" name="phone" type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" className={`${fieldClass} ${errors.phone ? fieldError : ''}`} />
          {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email <span className="text-[#607789]/60 font-normal">(optional)</span></label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="area" className={labelClass}>Your Area *</label>
        <select id="area" name="area" value={area} onChange={(e) => setArea(e.target.value)} className={`${fieldClass} ${errors.area ? fieldError : ''}`}>
          <option value="">Select your area</option>
          {SERVICE_AREAS.map((a) => (<option key={a} value={a}>{a}</option>))}
        </select>
        {errors.area && <p className="text-xs text-red-500 mt-0.5">{errors.area}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="date" className={labelClass}>Preferred Date *</label>
          <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className={`${fieldClass} ${errors.date ? fieldError : ''}`} />
          {errors.date && <p className="text-xs text-red-500 mt-0.5">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>Preferred Time *</label>
          <select id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${fieldClass} ${errors.time ? fieldError : ''}`}>
            <option value="">Select time slot</option>
            {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
          </select>
          {errors.time && <p className="text-xs text-red-500 mt-0.5">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Additional Message <span className="text-[#607789]/60 font-normal">(optional)</span></label>
        <textarea id="message" name="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue or any specific requirements..." className="w-full rounded-lg border border-[rgba(8,53,80,0.12)] bg-white px-3 py-2.5 text-sm text-[#0B2135] placeholder:text-[#607789]/50 focus:border-[#20C5D8] focus:ring-2 focus:ring-[#20C5D8]/20 outline-none resize-none" />
      </div>

      <div className="pt-2">
        <button type="submit" disabled={status === 'loading'} className="btn-aqua w-full justify-center py-3.5 text-base">
          {status === 'loading' ? <><Send size={18} /> Sending...</> : status === 'success' ? <><Check size={18} /> Booking Sent!</> : <><Send size={18} /> Send Booking on WhatsApp</>}
        </button>
        <p className="text-xs text-[#607789] text-center mt-3">
          Your details will be sent to us via WhatsApp. We will confirm your booking shortly.
        </p>
      </div>
    </form>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden bg-[#041827] pt-28 md:pt-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#20C5D8] opacity-[0.03] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3CE1EE] opacity-[0.02] blur-[60px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-20 md:pb-24">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/70">Book Service</span>
        </nav>
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20C5D8]/10 border border-[#20C5D8]/20 text-[#20C5D8] text-xs sm:text-sm font-medium mb-6">
              <Calendar size={14} /> Book a Service
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl leading-[1.05] text-white">
              Book Your Service<br /><span className="text-[#20C5D8]">Today</span>
            </h1>
            <p className="mt-4 text-base text-white/70 max-w-md leading-relaxed">
              Fill in the form and we will confirm your booking on WhatsApp. It is quick, easy, and hassle-free.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center shrink-0"><Phone size={18} className="text-[#20C5D8]" /></div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Call us directly</div>
                  <a href={`tel:${PHONE_PRIMARY}`} className="font-semibold text-white hover:text-[#20C5D8] transition-colors">{PHONE_PRIMARY_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center shrink-0"><MessageCircle size={18} className="text-[#20C5D8]" /></div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">WhatsApp us</div>
                  <a href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-[#20C5D8] transition-colors">{PHONE_PRIMARY_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center shrink-0"><Clock size={18} className="text-[#20C5D8]" /></div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">Working hours</div>
                  <div className="font-semibold text-white">{WORKING_HOURS}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-[rgba(8,53,80,0.12)] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(8,53,80,0.08)]">
                <div className="w-10 h-10 rounded-lg bg-[#20C5D8]/10 flex items-center justify-center"><Send size={20} className="text-[#20C5D8]" /></div>
                <div>
                  <h2 className="font-heading text-lg text-[#0B2135]">Service Booking Form</h2>
                  <p className="text-xs text-[#607789]">All fields marked * are required</p>
                </div>
              </div>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#041827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
            <Link href="/privacy-policy" className="hover:text-white/60">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60">Terms and Conditions</Link>
            <Link href="/cancellation-policy" className="hover:text-white/60">Cancellation Policy</Link>
          </div>
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
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

export default function BookServicePage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <Footer />
      <FloatingActions />
      <MobileActionBar />
    </main>
  )
}
