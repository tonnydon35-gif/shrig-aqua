'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Phone, MessageCircle, Mail, MapPin, ChevronLeft, ChevronRight, ArrowUpRight, X, Menu, WashingMachine, Refrigerator } from 'lucide-react'

/* ============================================================
   SHRI G AQUA — Revision 01
   ------------------------------------------------------------
   - No external stock imagery. Products rendered as honest
     schematic posters via SVG (ProductVisual component).
   - When /public/products/<slug>/poster.webp exists it will be
     used automatically (falls back to the SVG schematic).
   - Selected product is fully visible (no circular crop).
   - Fixed vertical composition: eyebrow > heading > copy >
     product > CTA. No negative overlap.
   - Expanded view: single info panel, one active state at a time.
   - Appliance Care section (#care) implemented.
============================================================ */

const PHONE_PRIMARY = '+918449691018'
const PHONE_PRIMARY_DISPLAY = '+91 84496 91018'
const PHONE_ALT = '+918460514208'
const PHONE_ALT_DISPLAY = '+91 84605 14208'
const waLink = (msg) => `https://wa.me/918449691018?text=${encodeURIComponent(msg)}`
const WHATSAPP_URL = waLink('Hello SHRI G AQUA, I would like details about your services.')
const WHATSAPP_COMMERCIAL = waLink('Hello SHRI G AQUA, I want to discuss a customized Commercial RO system for my requirement.')
const WHATSAPP_DOMESTIC = waLink('Hello SHRI G AQUA, I need details about Domestic RO sales, installation or service.')
const WHATSAPP_AC = waLink('Hello SHRI G AQUA, I need details about Split AC installation or service.')
const WHATSAPP_WM = waLink('Hello SHRI G AQUA, I need washing machine service in Mathura.')
const WHATSAPP_FRIDGE = waLink('Hello SHRI G AQUA, I need refrigerator service in Mathura.')
const EMAIL = 'shrigmathura@gmail.com'
const ADDRESS_LINE = '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass, Mathura – 281001, Uttar Pradesh'
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`

/* ------- Product schematic SVGs (honest posters until real assets are supplied) ------- */
function DomesticROSvg({ accent = '#7dd3fc' }) {
  return (
    <svg viewBox="0 0 400 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Domestic RO water purifier" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="dro-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1524" />
          <stop offset="1" stopColor="#070a12" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="540" rx="150" ry="10" fill={accent} opacity="0.14" />
      {/* Tap fixture */}
      <path d="M180 40 L180 72 L220 72 L220 40 Z" stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
      <path d="M195 25 L205 25 L205 40 L195 40 Z" stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
      <circle cx="200" cy="80" r="2.5" fill={accent} opacity="0.9" />
      {/* Body */}
      <rect x="78" y="90" width="244" height="420" rx="32" fill="url(#dro-body)" stroke={accent} strokeOpacity="0.42" strokeWidth="1.2" />
      <rect x="100" y="110" width="200" height="350" rx="22" fill="none" stroke={accent} strokeOpacity="0.1" />
      {/* Filter cartridges */}
      <g stroke={accent} strokeOpacity="0.42" strokeWidth="1" fill="none">
        <rect x="120" y="140" width="42" height="210" rx="21" />
        <rect x="180" y="140" width="42" height="210" rx="21" />
        <rect x="240" y="140" width="42" height="210" rx="21" />
        <line x1="120" y1="180" x2="162" y2="180" strokeOpacity="0.2" />
        <line x1="180" y1="180" x2="222" y2="180" strokeOpacity="0.2" />
        <line x1="240" y1="180" x2="282" y2="180" strokeOpacity="0.2" />
      </g>
      {/* Status display */}
      <rect x="140" y="380" width="120" height="32" rx="6" fill="#03060c" stroke={accent} strokeOpacity="0.5" />
      <circle cx="156" cy="396" r="3" fill={accent} />
      <text x="210" y="400" textAnchor="middle" fill={accent} fillOpacity="0.85" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="0.18em">DOMESTIC RO</text>
      {/* Dispense nozzle */}
      <rect x="175" y="440" width="50" height="22" rx="4" fill="none" stroke={accent} strokeOpacity="0.5" />
      <path d="M200 462 L200 478" stroke={accent} strokeOpacity="0.6" strokeWidth="1.4" />
      <circle cx="200" cy="484" r="2" fill={accent} opacity="0.9" />
    </svg>
  )
}

function CommercialROSvg({ accent = '#67e8f9' }) {
  return (
    <svg viewBox="0 0 720 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Commercial RO plant (illustration)" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cro-tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1422" />
          <stop offset="1" stopColor="#060a12" />
        </linearGradient>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="360" cy="500" rx="300" ry="10" fill={accent} opacity="0.14" />

      {/* Skid / pipe frame */}
      <g stroke={accent} strokeOpacity="0.32" strokeWidth="1" fill="none">
        <rect x="30" y="80" width="660" height="390" rx="6" />
        <line x1="30" y1="470" x2="30" y2="490" />
        <line x1="690" y1="470" x2="690" y2="490" />
        <line x1="360" y1="470" x2="360" y2="490" />
      </g>

      {/* Header manifold (top pipe) */}
      <g stroke={accent} strokeOpacity="0.45" strokeWidth="1.4" fill="none">
        <line x1="60" y1="110" x2="660" y2="110" />
        <circle cx="60" cy="110" r="4" />
        <circle cx="660" cy="110" r="4" />
      </g>

      {/* Vertical pretreatment tanks (left) */}
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="url(#cro-tank)">
        {/* Tank 1 */}
        <path d="M60 160 Q60 140 80 140 L120 140 Q140 140 140 160 L140 400 Q140 420 120 420 L80 420 Q60 420 60 400 Z" />
        {/* Tank 2 */}
        <path d="M170 160 Q170 140 190 140 L230 140 Q250 140 250 160 L250 400 Q250 420 230 420 L190 420 Q170 420 170 400 Z" />
        {/* Tank 3 */}
        <path d="M280 160 Q280 140 300 140 L340 140 Q360 140 360 160 L360 400 Q360 420 340 420 L300 420 Q280 420 280 400 Z" />
      </g>
      {/* Tank labels + level marks */}
      <g stroke={accent} strokeOpacity="0.22" strokeWidth="0.8">
        <line x1="70" y1="200" x2="130" y2="200" />
        <line x1="70" y1="280" x2="130" y2="280" />
        <line x1="70" y1="360" x2="130" y2="360" />
        <line x1="180" y1="200" x2="240" y2="200" />
        <line x1="180" y1="280" x2="240" y2="280" />
        <line x1="180" y1="360" x2="240" y2="360" />
        <line x1="290" y1="200" x2="350" y2="200" />
        <line x1="290" y1="280" x2="350" y2="280" />
        <line x1="290" y1="360" x2="350" y2="360" />
      </g>
      {/* Tank top hatches */}
      <g stroke={accent} strokeOpacity="0.5" strokeWidth="1" fill="#03060c">
        <rect x="88" y="132" width="24" height="8" rx="1" />
        <rect x="198" y="132" width="24" height="8" rx="1" />
        <rect x="308" y="132" width="24" height="8" rx="1" />
      </g>
      {/* Connecting pipes between tanks (bottom) */}
      <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2" fill="none">
        <path d="M140 430 L170 430" />
        <path d="M250 430 L280 430" />
      </g>

      {/* Pump module (bottom, between tanks and membranes) */}
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="url(#cro-tank)">
        <rect x="378" y="360" width="70" height="60" rx="4" />
      </g>
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="none">
        <circle cx="413" cy="390" r="18" />
        <circle cx="413" cy="390" r="6" fill={accent} fillOpacity="0.5" />
        <line x1="360" y1="430" x2="378" y2="390" />
        <line x1="448" y1="390" x2="470" y2="390" />
      </g>
      <text x="413" y="352" textAnchor="middle" fill={accent} fillOpacity="0.7" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="0.18em">PUMP</text>

      {/* Horizontal membrane vessel rack (right) */}
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="url(#cro-tank)">
        <rect x="400" y="180" width="270" height="32" rx="16" />
        <rect x="400" y="222" width="270" height="32" rx="16" />
        <rect x="400" y="264" width="270" height="32" rx="16" />
      </g>
      {/* End caps + inter-vessel pipes */}
      <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2" fill="none">
        <circle cx="400" cy="196" r="6" />
        <circle cx="670" cy="196" r="6" />
        <circle cx="400" cy="238" r="6" />
        <circle cx="670" cy="238" r="6" />
        <circle cx="400" cy="280" r="6" />
        <circle cx="670" cy="280" r="6" />
        <path d="M670 196 L688 196 L688 280 L670 280" />
        <path d="M400 238 L388 238" />
        <path d="M470 390 L470 300 L400 300" />
      </g>
      <text x="535" y="172" textAnchor="middle" fill={accent} fillOpacity="0.7" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="0.2em">RO MEMBRANE RACK</text>

      {/* Control panel (top right) */}
      <g>
        <rect x="500" y="90" width="170" height="60" rx="5" fill="#03060c" stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" />
        <rect x="512" y="102" width="46" height="14" rx="2" fill="#04080f" stroke={accent} strokeOpacity="0.5" />
        <circle cx="519" cy="109" r="2" fill={accent} />
        <text x="558" y="112" fill={accent} fillOpacity="0.85" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="0.2em">RUN</text>
        <rect x="512" y="124" width="146" height="10" rx="2" fill="#04080f" stroke={accent} strokeOpacity="0.3" />
        <text x="585" y="146" textAnchor="middle" fill={accent} fillOpacity="0.7" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="0.24em">CONTROL PANEL</text>
      </g>

      {/* Pressure gauges above pretreatment */}
      <g stroke={accent} strokeOpacity="0.5" strokeWidth="1" fill="none">
        <circle cx="100" cy="118" r="7" />
        <circle cx="210" cy="118" r="7" />
        <circle cx="320" cy="118" r="7" />
        <line x1="100" y1="118" x2="103" y2="113" />
        <line x1="210" y1="118" x2="214" y2="112" />
        <line x1="320" y1="118" x2="323" y2="114" />
      </g>

      {/* Base pipe (bottom manifold to outlet) */}
      <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.2" fill="none">
        <line x1="30" y1="450" x2="690" y2="450" />
        <circle cx="30" cy="450" r="4" />
        <circle cx="690" cy="450" r="4" />
      </g>
    </svg>
  )
}

function SplitACSvg({ accent = '#a5f3fc' }) {
  return (
    <svg viewBox="0 0 640 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Split AC indoor unit" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1524" />
          <stop offset="0.55" stopColor="#0a0f1b" />
          <stop offset="1" stopColor="#060a12" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="330" rx="250" ry="9" fill={accent} opacity="0.14" />
      {/* Wall line */}
      <line x1="20" y1="70" x2="620" y2="70" stroke={accent} strokeOpacity="0.12" />
      {/* Main body */}
      <path d="M60 90 L580 90 Q604 90 604 114 L604 210 Q604 236 578 240 L62 240 Q36 236 36 210 L36 114 Q36 90 60 90 Z" fill="url(#ac-body)" stroke={accent} strokeOpacity="0.5" strokeWidth="1.2" />
      {/* Top intake grille */}
      <g stroke={accent} strokeOpacity="0.22" strokeWidth="0.8">
        <line x1="70" y1="105" x2="570" y2="105" />
        <line x1="70" y1="114" x2="570" y2="114" />
        <line x1="70" y1="123" x2="570" y2="123" />
      </g>
      {/* Display / logo strip */}
      <rect x="280" y="148" width="80" height="18" rx="3" fill="#03060c" stroke={accent} strokeOpacity="0.5" />
      <text x="320" y="161" textAnchor="middle" fill={accent} fillOpacity="0.85" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="0.2em">SPLIT AC</text>
      <circle cx="260" cy="157" r="2" fill={accent} />
      {/* Louver vent */}
      <rect x="60" y="195" width="520" height="36" rx="6" fill="#03060c" stroke={accent} strokeOpacity="0.4" />
      <g stroke={accent} strokeOpacity="0.2">
        <line x1="70" y1="205" x2="570" y2="205" />
        <line x1="70" y1="213" x2="570" y2="213" />
        <line x1="70" y1="221" x2="570" y2="221" />
      </g>
      {/* Cool airflow indicator */}
      <g stroke={accent} strokeOpacity="0.45" strokeWidth="1" fill="none">
        <path d="M180 250 Q200 275 220 250" />
        <path d="M240 258 Q260 283 280 258" />
        <path d="M300 262 Q320 287 340 262" />
        <path d="M360 258 Q380 283 400 258" />
        <path d="M420 250 Q440 275 460 250" />
      </g>
    </svg>
  )
}

/* ------- Product data ------- */
const PRODUCTS = [
  {
    id: 'domestic',
    slug: 'domestic-ro',
    name: 'Domestic RO',
    kicker: '01 — DOMESTIC RO',
    heading: 'Clean water, designed around your home.',
    copy: 'Domestic RO systems, installation and dependable service across Mathura.',
    cta: 'Explore system',
    whatsapp: WHATSAPP_DOMESTIC,
    accent: '#7dd3fc',
    Svg: DomesticROSvg,
    aspect: 400 / 560,
    stages: [
      {
        title: 'Overview',
        body: 'Domestic RO systems for homes across Mathura — selection, installation and service enquiries.'
      },
      {
        title: 'System configuration',
        body: 'Filtration stages and storage can be chosen to suit household usage and source water.'
      },
      {
        title: 'Service and maintenance',
        body: 'Installation and ongoing service enquiries are supported across Mathura.'
      }
    ]
  },
  {
    id: 'commercial',
    slug: 'commercial-ro',
    name: 'Commercial RO',
    kicker: '02 — COMMERCIAL RO',
    heading: 'Built for the capacity your business needs.',
    copy: 'Customized commercial RO systems with complete supply, installation and ongoing service—from focused requirements to malls and large complexes.',
    cta: 'Explore system',
    whatsapp: WHATSAPP_COMMERCIAL,
    secondaryCta: { label: 'Plan your capacity', href: WHATSAPP_COMMERCIAL },
    accent: '#67e8f9',
    Svg: CommercialROSvg,
    aspect: 720 / 520,
    stages: [
      {
        title: 'Overview',
        body: 'We understand the required capacity and intended use before recommending a suitable system.'
      },
      {
        title: 'System configuration',
        body: 'Commercial RO systems can be planned with the filtration stages, pumps, membrane capacity and storage required for the project.'
      },
      {
        title: 'Service and maintenance',
        body: 'Installation and ongoing service enquiries are supported across Mathura.'
      }
    ]
  },
  {
    id: 'splitac',
    slug: 'split-ac',
    name: 'Split AC',
    kicker: '03 — SPLIT AC',
    heading: 'Cooling installed and maintained properly.',
    copy: 'Split AC installation, inspection and service enquiries across Mathura.',
    cta: 'Explore system',
    whatsapp: WHATSAPP_AC,
    accent: '#a5f3fc',
    Svg: SplitACSvg,
    aspect: 640 / 360,
    stages: [
      {
        title: 'Overview',
        body: 'Split AC installation and service enquiries across Mathura.'
      },
      {
        title: 'System configuration',
        body: 'Indoor and outdoor units, piping and installation are planned around the space and the requirement.'
      },
      {
        title: 'Service and maintenance',
        body: 'Installation and ongoing service enquiries are supported across Mathura.'
      }
    ]
  }
]
const DEFAULT_INDEX = 1

/* ------- ProductVisual: replaceable renderer -------
   Renders isolated equipment. Prefers /public/products/<slug>/poster.webp
   when supplied; otherwise renders the honest SVG schematic.
   No circular masking, no planet effect.
============================================================ */
function ProductVisual({ product, sizeClass = 'w-full h-full', dim = false }) {
  const [hasPoster, setHasPoster] = useState(false)
  const posterUrl = `/products/${product.slug}/poster.webp`

  useEffect(() => {
    let alive = true
    const img = new Image()
    img.onload = () => { if (alive) setHasPoster(true) }
    img.onerror = () => { if (alive) setHasPoster(false) }
    img.src = posterUrl
    return () => { alive = false }
  }, [posterUrl])

  const Svg = product.Svg
  return (
    <div className={`relative ${sizeClass}`} aria-hidden="true">
      {/* Soft ambient light behind the equipment (not a circular mask) */}
      <div
        className="absolute -inset-4 pointer-events-none"
        style={{
          background: `radial-gradient(closest-side, ${product.accent}22, transparent 70%)`,
          filter: 'blur(10px)',
          opacity: dim ? 0.4 : 1
        }}
      />
      {hasPoster ? (
        <img src={posterUrl} alt={product.name} className="relative w-full h-full object-contain" style={{ opacity: dim ? 0.6 : 1 }} />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center" style={{ opacity: dim ? 0.55 : 1 }}>
          <Svg accent={product.accent} />
        </div>
      )}
    </div>
  )
}

/* ------- Top bar ------- */
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

/* ------- Mobile bottom dock (persistent) ------- */
function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe px-4">
      <div className="flex items-center gap-2 mx-auto max-w-md rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-2 py-2">
        <a href={`tel:${PHONE_PRIMARY}`} className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-white/5 text-sm" aria-label="Call SHRI G AQUA">
          <Phone size={16}/> Call
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-full text-sm" style={{ background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }} aria-label="WhatsApp SHRI G AQUA">
          <MessageCircle size={16}/> WhatsApp
        </a>
        <a href="#contact" className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/5" aria-label="More contact options">
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

/* ============================================================
   Selector — measured vertical layout, no overlap
   Desktop (>= md):
     [ header ]
     eyebrow
     heading         (top zone)
     copy
     ---- (guaranteed gap) ----
     [ product stage w/ prev|current|next ]
     ---- (gap) ----
     CTA + pips
============================================================ */
function Selector({ index, setIndex, onExplore }) {
  const total = PRODUCTS.length
  const prevI = (index - 1 + total) % total
  const nextI = (index + 1) % total
  const current = PRODUCTS[index]

  return (
    <section id="products" className="relative w-full min-h-[100svh] stage grain overflow-hidden">
      <div className="stars" />

      <div className="relative z-10 min-h-[100svh] flex flex-col pt-[92px] sm:pt-[104px] pb-[128px] md:pb-24 px-4 sm:px-6">
        {/* Text zone */}
        <div className="text-center">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-white/50">
            {current.kicker}
          </div>
          <h1
            key={`title-${current.id}`}
            className="selector-title font-serif-ed mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05] max-w-4xl mx-auto enter enter-active"
          >
            {current.heading}
          </h1>
          <p
            key={`copy-${current.id}`}
            className="mt-4 sm:mt-5 max-w-xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed enter enter-active"
            style={{ transitionDelay: '120ms' }}
          >
            {current.copy}
          </p>
        </div>

        {/* Product stage: takes remaining vertical space */}
        <div className="relative flex-1 flex items-center justify-center mt-6 sm:mt-8 md:mt-10 min-h-[280px]">
          {/* Adjacent (left) — partially visible, blurred */}
          <div className="pointer-events-auto absolute left-[-12%] sm:left-[-6%] md:left-[2%] top-1/2 -translate-y-1/2 w-[36vw] max-w-[280px] hidden sm:block">
            <button
              onClick={() => setIndex(prevI)}
              className="w-full transition-cinema opacity-40 hover:opacity-70"
              style={{ filter: 'blur(4px)' }}
              aria-label={`Select ${PRODUCTS[prevI].name}`}
            >
              <div className="w-full" style={{ aspectRatio: PRODUCTS[prevI].aspect }}>
                <ProductVisual product={PRODUCTS[prevI]} dim />
              </div>
            </button>
          </div>

          {/* Selected product — sharp, fully visible, centered */}
          <div
            key={`prod-${current.id}`}
            className="relative w-[86vw] max-w-[520px] md:max-w-[560px] lg:max-w-[600px] transition-cinema"
            style={{ aspectRatio: current.aspect }}
          >
            <ProductVisual product={current} />
          </div>

          {/* Adjacent (right) */}
          <div className="pointer-events-auto absolute right-[-12%] sm:right-[-6%] md:right-[2%] top-1/2 -translate-y-1/2 w-[36vw] max-w-[280px] hidden sm:block">
            <button
              onClick={() => setIndex(nextI)}
              className="w-full transition-cinema opacity-40 hover:opacity-70"
              style={{ filter: 'blur(4px)' }}
              aria-label={`Select ${PRODUCTS[nextI].name}`}
            >
              <div className="w-full" style={{ aspectRatio: PRODUCTS[nextI].aspect }}>
                <ProductVisual product={PRODUCTS[nextI]} dim />
              </div>
            </button>
          </div>

          {/* Chevron controls */}
          <button
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 btn-icon"
            onClick={() => setIndex(prevI)}
            aria-label="Previous product"
          >
            <ChevronLeft size={18}/>
          </button>
          <button
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 btn-icon"
            onClick={() => setIndex(nextI)}
            aria-label="Next product"
          >
            <ChevronRight size={18}/>
          </button>
        </div>

        {/* CTA + name + pips */}
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-4">
          <div className="text-white/50 text-[11px] uppercase tracking-[0.32em]">{current.name}</div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onExplore}
              className="btn-primary"
              style={{ borderColor: `${current.accent}55`, boxShadow: `0 0 30px ${current.accent}22` }}
            >
              {current.cta} <ArrowUpRight size={15}/>
            </button>
            {current.secondaryCta && (
              <a
                href={current.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ borderColor: 'rgba(103,232,249,0.45)', background: 'rgba(103,232,249,0.12)', color: 'var(--aqua)' }}
              >
                <MessageCircle size={14}/> {current.secondaryCta.label}
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setIndex(i)}
                aria-label={p.name}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 28 : 10,
                  background: i === index ? current.accent : 'rgba(255,255,255,0.22)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ExpandedProduct — clean inspection layout
   * 300vh sticky container (~3 meaningful states)
   * Only ONE active state visible at a time
   * Desktop: product left/center, single info panel on right
   * Mobile: product upper, single info panel below
============================================================ */
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
        const h = Math.max(1, el.offsetHeight - window.innerHeight)
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

  const total = product.stages.length
  const activeIndex = Math.min(total - 1, Math.floor(progress * total * 0.999))
  const activeStage = product.stages[activeIndex]
  const workingGlow = activeIndex === total - 1 ? Math.min(1, (progress - (total - 1) / total) * total) : 0

  return (
    <section id="expanded" className="relative w-full stage grain" ref={wrapRef} style={{ height: '300vh' }}>
      <div className="stars" />
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Back control */}
        <button
          onClick={onBack}
          className="absolute top-5 left-5 sm:top-7 sm:left-8 z-40 btn-ghost"
          aria-label="Back to selector"
        >
          <ChevronLeft size={16}/> Back
        </button>

        {/* Header: kicker + product name (does not overlap product) */}
        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center px-6 pointer-events-none">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">{product.kicker}</div>
          <h2 className="font-serif-ed text-2xl sm:text-3xl mt-1">{product.name}</h2>
        </div>

        {/* Content grid: product left, single panel right (desktop) / stacked (mobile) */}
        <div className="absolute inset-0 pt-24 pb-28 md:pb-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Product visual */}
          <div className="md:col-span-7 lg:col-span-7 flex items-center justify-center h-full relative">
            <div className="relative w-full max-w-[520px] md:max-w-[560px]" style={{ aspectRatio: product.aspect }}>
              <ProductVisual product={product} />
              {workingGlow > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    boxShadow: `0 0 ${60 + workingGlow * 80}px ${20 + workingGlow * 40}px ${product.accent}${Math.round(workingGlow*90).toString(16).padStart(2,'0')}`,
                    opacity: workingGlow * 0.8
                  }}
                />
              )}
            </div>
          </div>

          {/* Info panel — only current stage visible */}
          <div className="md:col-span-5 lg:col-span-5 flex md:h-full items-center">
            <div className="w-full max-w-md md:pl-4 relative min-h-[140px]">
              {product.stages.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === activeIndex ? 1 : 0, pointerEvents: i === activeIndex ? 'auto' : 'none' }}
                  aria-hidden={i !== activeIndex}
                >
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                    Stage {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif-ed text-3xl sm:text-4xl mt-2">{s.title}</h3>
                  <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">{s.body}</p>
                  {product.id === 'commercial' && i === 0 && (
                    <a href={product.whatsapp} target="_blank" rel="noreferrer" className="btn-primary mt-6" style={{ borderColor: `${product.accent}55` }}>
                      Plan your capacity <ArrowUpRight size={14}/>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom progress rail + stage tabs */}
        <div className="absolute bottom-24 md:bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-3 px-6">
          <div className="flex items-center gap-2">
            {product.stages.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? 28 : 10,
                    background: i === activeIndex ? product.accent : 'rgba(255,255,255,0.22)'
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            {activeStage.title} · scroll to continue
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Appliance Care section (#care) — compact, restrained
============================================================ */
function ApplianceCare() {
  const items = [
    {
      title: 'Washing machine service',
      body: 'Washing machine inspection, repair and service enquiries across Mathura.',
      Icon: WashingMachine,
      whatsapp: WHATSAPP_WM
    },
    {
      title: 'Refrigerator service',
      body: 'Refrigerator inspection, cooling-related repair and service enquiries across Mathura.',
      Icon: Refrigerator,
      whatsapp: WHATSAPP_FRIDGE
    }
  ]
  return (
    <section id="care" className="relative stage grain px-6 py-20 sm:py-28 scroll-mt-24">
      <div className="stars" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Appliance care</div>
          <h2 className="font-serif-ed mt-3 text-4xl sm:text-5xl leading-[1.05]">Everyday appliances, kept working.</h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl mx-auto">Alongside water and cooling, SHRI G AQUA supports the appliances your home relies on.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-white/10 p-6 sm:p-7 bg-white/[0.02] hover:border-white/25 transition">
              <div className="flex items-center gap-3">
                <div className="btn-icon" aria-hidden="true"><it.Icon size={16}/></div>
                <div className="font-serif-ed text-2xl">{it.title}</div>
              </div>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">{it.body}</p>
              <div className="mt-6 flex gap-2">
                <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary"><Phone size={14}/> Call</a>
                <a href={it.whatsapp} target="_blank" rel="noreferrer" className="btn-primary" style={{ borderColor: 'rgba(103,232,249,0.35)', background: 'rgba(103,232,249,0.10)' }}><MessageCircle size={14}/> WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Contact section (preserved)
============================================================ */
function ContactSection() {
  return (
    <section id="contact" className="relative stage grain px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="stars" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Contact</div>
        <h2 className="font-serif-ed text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05]">
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
        <p className="mt-8 text-xs text-white/40 pb-24 md:pb-0">
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
    <div className="md:hidden fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col">
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

      <Selector index={index} setIndex={setIndex} onExplore={handleExplore} />

      {expanded && <ExpandedProduct product={current} onBack={handleBack} />}

      <ApplianceCare />
      <ContactSection />

      <ActionRail />
      <MobileDock />

      {/* Crawlable content */}
      <div className="sr-only">
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
