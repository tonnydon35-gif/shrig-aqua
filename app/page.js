'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Phone, MessageCircle, Mail, MapPin, ChevronLeft, ChevronRight, ArrowUpRight, X, Menu } from 'lucide-react'

/* ============================================================
   SHRI G AQUA — Product Universe (Phase 1)
   ------------------------------------------------------------
   - Cinematic three-product selector (Commercial RO default)
   - Explore -> fullscreen product expansion
   - Scroll-driven exploded view (sticky, progress-based)
   - Persistent Call/WhatsApp actions + mobile bottom dock
   ProductPlanet is a REPLACEABLE component ready to accept GLB
   in Phase 2 without touching the surrounding UI.
============================================================ */

const PHONE_PRIMARY = '+918449691018'
const PHONE_PRIMARY_DISPLAY = '+91 84496 91018'
const PHONE_ALT = '+918460514208'
const PHONE_ALT_DISPLAY = '+91 84605 14208'
const WHATSAPP_URL = `https://wa.me/918449691018?text=${encodeURIComponent('Hello SHRI G AQUA, I want details about your services.')}`
const EMAIL = 'shrigmathura@gmail.com'
const ADDRESS_LINE = '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass, Mathura – 281001, Uttar Pradesh'
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`

const PRODUCTS = [
  {
    id: 'domestic',
    name: 'Domestic RO',
    kicker: '01 — Home',
    heading: 'Clean water, designed around your home.',
    copy: 'Domestic RO systems, installation and dependable service across Mathura.',
    cta: 'Explore system',
    accent: '#7dd3fc',
    tint: 'radial-gradient(circle at 40% 35%, rgba(125,211,252,0.55), rgba(8,20,40,0.9) 65%)',
    image: 'https://images.unsplash.com/photo-1533167649158-6d508895b680?auto=format&fit=crop&w=1400&q=80',
    parts: [
      { label: 'Sediment pre-filter', copy: 'Removes visible impurities and protects downstream stages.' },
      { label: 'Activated carbon', copy: 'Reduces chlorine, odour and organic residue.' },
      { label: 'RO membrane', copy: 'The heart of the system — dissolved solids are rejected here.' },
      { label: 'Storage & tap', copy: 'Ready-to-serve purified water on demand.' }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial RO',
    kicker: '02 — Business',
    heading: 'Built for the capacity your business needs.',
    copy: 'Customized commercial RO systems with complete supply, installation and ongoing service—from focused requirements to malls and large complexes.',
    cta: 'Plan a commercial RO system',
    accent: '#67e8f9',
    tint: 'radial-gradient(circle at 45% 35%, rgba(103,232,249,0.65), rgba(6,18,36,0.95) 62%)',
    image: 'https://images.unsplash.com/photo-1651651677615-dffb63ae4d62?auto=format&fit=crop&w=1400&q=80',
    parts: [
      { label: 'Raw water assessment', copy: 'Capacity, TDS and usage load evaluated on site.' },
      { label: 'Multi-stage pre-treatment', copy: 'Sand, carbon and softening as required by source water.' },
      { label: 'High-pressure RO stack', copy: 'Membranes sized to daily litre demand — small unit to large plant.' },
      { label: 'Storage, dosing & delivery', copy: 'Tanks, UV, dosing and piping installed end-to-end.' },
      { label: 'Ongoing service', copy: 'Scheduled maintenance and rapid support across Mathura.' }
    ]
  },
  {
    id: 'splitac',
    name: 'Split AC',
    kicker: '03 — Comfort',
    heading: 'Cooling installed and maintained properly.',
    copy: 'Split AC installation, inspection and service enquiries across Mathura.',
    cta: 'Explore system',
    accent: '#a5f3fc',
    tint: 'radial-gradient(circle at 40% 30%, rgba(165,243,252,0.5), rgba(10,20,32,0.92) 65%)',
    image: 'https://images.unsplash.com/photo-1573573226985-72f731413b23?auto=format&fit=crop&w=1400&q=80',
    parts: [
      { label: 'Site survey', copy: 'Room load, cabling and drainage routes checked first.' },
      { label: 'Indoor unit mount', copy: 'Levelled, secure, and positioned for even airflow.' },
      { label: 'Copper piping & vacuum', copy: 'Leak-free run, proper insulation, correct evacuation.' },
      { label: 'Commissioning & service', copy: 'Test run, performance check and scheduled service visits.' }
    ]
  }
]

const DEFAULT_INDEX = 1 // Commercial RO

/* ------- Replaceable product renderer -------
   Currently: masked image sphere with atmospheric glow.
   Phase 2: swap internals with <Canvas> + <GLBModel> without
   changing this component's props contract. */
function ProductPlanet({ product, size = 480, className = '', showAtmosphere = true }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {showAtmosphere && (
        <div
          className="atmosphere"
          style={{ boxShadow: `0 0 90px 24px ${product.accent}30, 0 0 160px 40px ${product.accent}18` }}
        />
      )}
      <div className="planet w-full h-full">
        <div className="planet-img" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="planet-tint" style={{ background: product.tint, mixBlendMode: 'multiply', opacity: 0.85 }} />
        <div className="planet-tint" style={{ background: product.tint, mixBlendMode: 'screen', opacity: 0.25 }} />
      </div>
    </div>
  )
}

/* ------- Persistent header / nav ------- */
function TopBar({ onMenu, hidden }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-500 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--aqua)' }} />
          <span className="font-serif-ed text-xl tracking-tight">SHRI G <span style={{ color: 'var(--aqua)' }}>AQUA</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          <a href="#products" className="btn-ghost">Products</a>
          <a href="#care" className="btn-ghost">Appliance care</a>
          <a href="#contact" className="btn-ghost">Contact</a>
          <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary ml-2"><Phone size={15}/> Call now</a>
        </nav>
        <button className="md:hidden btn-icon" onClick={onMenu} aria-label="Open menu"><Menu size={18}/></button>
      </div>
    </header>
  )
}

/* ------- Mobile bottom dock ------- */
function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe px-4">
      <div className="flex items-center gap-2 mx-auto max-w-md rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-2 py-2">
        <a href={`tel:${PHONE_PRIMARY}`} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-white/5 text-sm" aria-label="Call SHRI G AQUA">
          <Phone size={16}/> Call
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full text-sm" style={{ background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }} aria-label="WhatsApp SHRI G AQUA">
          <MessageCircle size={16}/> WhatsApp
        </a>
        <a href="#contact" className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5" aria-label="More contact options">
          <ArrowUpRight size={16}/>
        </a>
      </div>
    </div>
  )
}

/* ------- Desktop persistent action rail ------- */
function ActionRail() {
  return (
    <div className="hidden md:flex fixed right-6 bottom-6 z-40 flex-col gap-2">
      <a href={`tel:${PHONE_PRIMARY}`} className="btn-icon" aria-label="Call"><Phone size={16}/></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-icon" style={{ background: 'rgba(103,232,249,0.10)', borderColor: 'rgba(103,232,249,0.35)' }} aria-label="WhatsApp">
        <MessageCircle size={16} style={{ color: 'var(--aqua)' }} />
      </a>
    </div>
  )
}

/* ------- Selector screen ------- */
function Selector({ index, setIndex, onExplore }) {
  const total = PRODUCTS.length
  const prevI = (index - 1 + total) % total
  const nextI = (index + 1) % total
  const current = PRODUCTS[index]

  const positionOf = (i) => {
    if (i === index) return 'prod-center'
    if (i === prevI) return 'prod-left'
    if (i === nextI) return 'prod-right'
    return 'prod-far'
  }

  return (
    <section id="products" className="relative w-full min-h-[100svh] stage grain overflow-hidden">
      <div className="stars" />

      {/* Kicker line */}
      <div className="absolute top-24 sm:top-28 left-0 right-0 z-10 flex flex-col items-center text-center px-6">
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">
          {current.kicker}
        </div>
        <h1
          key={`title-${current.id}`}
          className="selector-title font-serif-ed mt-4 text-5xl sm:text-6xl md:text-7xl leading-[1.04] max-w-4xl enter enter-active"
        >
          {current.heading}
        </h1>
        <p key={`copy-${current.id}`} className="mt-5 max-w-xl text-sm sm:text-base text-white/60 leading-relaxed enter enter-active" style={{ transitionDelay: '120ms' }}>
          {current.copy}
        </p>
      </div>

      {/* Product stage */}
      <div className="absolute inset-x-0 bottom-[16svh] sm:bottom-[14svh] z-10 flex items-end justify-center">
        <div className="relative w-full h-[62svh] sm:h-[68svh] flex items-center justify-center">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`absolute transition-cinema ${positionOf(i)}`}
              style={{ willChange: 'transform, filter, opacity' }}
              aria-label={`Select ${p.name}`}
              tabIndex={i === index ? -1 : 0}
            >
              <ProductPlanet
                product={p}
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : 480}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Chevron controls */}
      <button
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 btn-icon"
        onClick={() => setIndex(prevI)}
        aria-label="Previous product"
      >
        <ChevronLeft size={18}/>
      </button>
      <button
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 btn-icon"
        onClick={() => setIndex(nextI)}
        aria-label="Next product"
      >
        <ChevronRight size={18}/>
      </button>

      {/* CTA + product name */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-10 z-20 flex flex-col items-center gap-4 px-6">
        <div className="text-white/50 text-xs uppercase tracking-[0.32em]">{current.name}</div>
        <button onClick={onExplore} className="btn-primary" style={{ borderColor: `${current.accent}55`, boxShadow: `0 0 30px ${current.accent}22` }}>
          {current.cta} <ArrowUpRight size={15}/>
        </button>

        {/* Product pips */}
        <div className="flex items-center gap-2 mt-1">
          {PRODUCTS.map((p, i) => (
            <button key={p.id} onClick={() => setIndex(i)} aria-label={p.name}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 10,
                background: i === index ? current.accent : 'rgba(255,255,255,0.22)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------- Expanded product experience (scroll-driven) ------- */
function ExpandedProduct({ product, onBack }) {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const h = el.offsetHeight - window.innerHeight
        const p = Math.min(1, Math.max(0, -rect.top / h))
        setProgress(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Phase math: 0-.2 assembled, .2-.45 open, .45-.7 exploded, .7-.85 reassemble, .85-1 working
  const phaseScale = 1 + Math.sin(progress * Math.PI) * 0.05
  const exploded = Math.max(0, Math.min(1, (progress - 0.2) / 0.5)) * (progress < 0.75 ? 1 : Math.max(0, 1 - (progress - 0.75) / 0.15))
  const workingGlow = Math.max(0, (progress - 0.82) / 0.18)

  const parts = product.parts

  return (
    <section className="relative w-full stage grain" ref={wrapRef} style={{ height: '360vh' }}>
      <div className="stars" />
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Back control */}
        <button
          onClick={onBack}
          className="absolute top-5 left-5 sm:top-7 sm:left-8 z-40 btn-ghost group"
          aria-label="Back to selector"
        >
          <ChevronLeft size={16}/> Back
        </button>

        {/* Product title relocated */}
        <div className="absolute top-6 sm:top-8 right-0 left-0 z-30 flex flex-col items-center pointer-events-none px-6">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">{product.kicker}</div>
          <h2 className="font-serif-ed text-2xl sm:text-3xl mt-1">{product.name}</h2>
        </div>

        {/* Central planet with pulse of aqua on working state */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `scale(${phaseScale})`, transition: 'transform 200ms linear' }}
        >
          <div className="relative">
            <ProductPlanet product={product} size={typeof window !== 'undefined' && window.innerWidth < 640 ? 260 : 420} />
            {/* Working state glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: `0 0 ${80 + workingGlow * 80}px ${20 + workingGlow * 40}px ${product.accent}${Math.round(workingGlow*80).toString(16).padStart(2,'0')}`,
                opacity: workingGlow
              }}
            />
          </div>
        </div>

        {/* Exploded parts ring */}
        {parts.map((part, i) => {
          const angle = (i / parts.length) * Math.PI * 2 - Math.PI / 2
          const radius = 220 + exploded * 160
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius * 0.75
          const active = exploded > 0.15
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                opacity: active ? exploded : 0,
                transition: 'opacity 300ms ease'
              }}
            >
              <div className="w-2 h-2 rounded-full mx-auto" style={{ background: product.accent, boxShadow: `0 0 12px ${product.accent}` }} />
              <div className="mt-2 w-48 text-center">
                <div className="text-[10px] uppercase tracking-[0.24em] text-white/50">Stage {String(i+1).padStart(2,'0')}</div>
                <div className="text-sm mt-1">{part.label}</div>
                <div className="text-xs text-white/50 mt-1 hidden sm:block">{part.copy}</div>
              </div>
            </div>
          )
        })}

        {/* Bottom progress + scroll hint */}
        <div className="absolute bottom-24 md:bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-3 px-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            {progress < 0.05 ? 'Scroll to explore ↓' : progress > 0.9 ? 'Working state' : progress > 0.7 ? 'Reassembling' : progress > 0.4 ? 'Exploded view' : 'Opening'}
          </div>
          <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full" style={{ width: `${progress * 100}%`, background: product.accent }} />
          </div>
        </div>

        {/* Right side descriptor for larger screens */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-72 z-30">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-3">About the system</div>
          <p className="text-sm text-white/70 leading-relaxed">{product.copy}</p>
          {product.id === 'commercial' && (
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6" style={{ borderColor: `${product.accent}55` }}>
              Plan your capacity <ArrowUpRight size={14}/>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------- Contact section ------- */
function ContactSection() {
  return (
    <section id="contact" className="relative stage grain px-6 py-24 sm:py-32">
      <div className="stars" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Contact</div>
        <h2 className="font-serif-ed text-5xl sm:text-6xl md:text-7xl mt-4 leading-[1.05]">
          The service you need,<br/> one call away.
        </h2>
        <p className="mt-6 text-white/60 max-w-lg mx-auto">
          SHRI G AQUA, Mathura — Commercial RO planning, Domestic RO service, Split AC installation and appliance support.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
          <a href={`tel:${PHONE_PRIMARY}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition">
            <div className="btn-icon"><Phone size={16}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Call primary</div>
              <div className="text-sm">{PHONE_PRIMARY_DISPLAY}</div>
            </div>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition">
            <div className="btn-icon" style={{ background: 'rgba(103,232,249,0.12)', borderColor: 'rgba(103,232,249,0.35)' }}><MessageCircle size={16} style={{ color: 'var(--aqua)' }}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">WhatsApp</div>
              <div className="text-sm">{PHONE_PRIMARY_DISPLAY}</div>
            </div>
          </a>
          <a href={`tel:${PHONE_ALT}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition">
            <div className="btn-icon"><Phone size={16}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Alternate</div>
              <div className="text-sm">{PHONE_ALT_DISPLAY}</div>
            </div>
          </a>
          <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition">
            <div className="btn-icon"><Mail size={16}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Email</div>
              <div className="text-sm break-all">{EMAIL}</div>
            </div>
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="group sm:col-span-2 flex items-start gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition text-left">
            <div className="btn-icon shrink-0"><MapPin size={16}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Address · Get directions</div>
              <div className="text-sm mt-1 leading-relaxed">{ADDRESS_LINE}</div>
            </div>
          </a>
        </div>

        <div className="mt-16 hairline max-w-md mx-auto" />
        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} SHRI G AQUA · Mathura, Uttar Pradesh
        </p>
      </div>
    </section>
  )
}

/* ------- Mobile menu overlay ------- */
function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col">
      <div className="flex items-center justify-between px-5 pt-6">
        <span className="font-serif-ed text-xl">SHRI G <span style={{ color: 'var(--aqua)' }}>AQUA</span></span>
        <button onClick={onClose} className="btn-icon" aria-label="Close menu"><X size={18}/></button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start px-8 gap-6">
        <a onClick={onClose} href="#products" className="font-serif-ed text-4xl">Products</a>
        <a onClick={onClose} href="#care" className="font-serif-ed text-4xl">Appliance care</a>
        <a onClick={onClose} href="#contact" className="font-serif-ed text-4xl">Contact</a>
      </div>
      <div className="px-5 pb-safe grid grid-cols-2 gap-3">
        <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary justify-center"><Phone size={15}/> Call</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary justify-center" style={{ borderColor: 'rgba(103,232,249,0.4)', background: 'rgba(103,232,249,0.10)' }}><MessageCircle size={15}/> WhatsApp</a>
      </div>
    </div>
  )
}

/* ============================================================
   Main App
============================================================ */
function App() {
  const [index, setIndex] = useState(DEFAULT_INDEX)
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const current = PRODUCTS[index]

  // Keyboard navigation on selector
  useEffect(() => {
    if (expanded) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + PRODUCTS.length) % PRODUCTS.length)
      else if (e.key === 'ArrowRight') setIndex(i => (i + 1) % PRODUCTS.length)
      else if (e.key === 'Enter') setExpanded(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  const handleExplore = useCallback(() => {
    setExpanded(true)
    // Give layout a beat, then scroll to expanded section start
    requestAnimationFrame(() => {
      const el = document.getElementById('expanded')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handleBack = useCallback(() => {
    setExpanded(false)
    requestAnimationFrame(() => {
      const el = document.getElementById('top')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <main id="top" className="relative w-full">
      <TopBar onMenu={() => setMenuOpen(true)} hidden={expanded} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Selector always mounted; when expanded we push it above and let user scroll into expanded */}
      <Selector index={index} setIndex={setIndex} onExplore={handleExplore} />

      {expanded && (
        <div id="expanded">
          <ExpandedProduct product={current} onBack={handleBack} />
        </div>
      )}

      <ContactSection />

      <ActionRail />
      <MobileDock />

      {/* Crawlable content for SEO (visually hidden but readable) */}
      <div className="sr-only" aria-hidden="false">
        <h2>SHRI G AQUA — Mathura water and cooling specialists</h2>
        <p>Commercial RO systems planned to required capacity for businesses, malls, institutions and large complexes in Mathura, Uttar Pradesh. Complete supply, installation and ongoing service.</p>
        <p>Domestic RO sales, installation and maintenance across Mathura.</p>
        <p>Split AC installation and service, washing machine service and refrigerator service.</p>
        <p>Address: {ADDRESS_LINE}. Call {PHONE_PRIMARY_DISPLAY} or {PHONE_ALT_DISPLAY}. Email {EMAIL}.</p>
      </div>
    </main>
  )
}

export default App
