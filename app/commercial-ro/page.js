'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Phone, MessageCircle, ArrowUpRight, ChevronRight, ChevronLeft, X, Menu, Mail, MapPin, Send,
  Building2, UtensilsCrossed, GraduationCap, School, Hotel, HeartPulse, Building, Factory,
  Package, Store, Home as HomeIcon, Check
} from 'lucide-react'
import {
  PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY, PHONE_ALT, PHONE_ALT_DISPLAY,
  EMAIL, ADDRESS_LINE, MAPS_URL, WHATSAPP_URL,
  WHATSAPP_CR_HERO, WHATSAPP_CR_250_500, WHATSAPP_CR_1000_2000, WHATSAPP_CR_CUSTOM, WHATSAPP_CR_SITE_SURVEY
} from '@/lib/business'

/* ==========================================================
   /commercial-ro — Industrial & Commercial RO Capacities
   Translated into the existing SHRI G AQUA cinematic language.
   No white cards, no generic Tailwind template look.
========================================================== */

const CAPACITIES = [
  {
    label: 'Compact Commercial',
    range: '250 LPH – 500 LPH',
    description:
      'Ideal for small offices, restaurants, cafés and coaching institutes requiring a steady purified-water supply.',
    features: [
      'Compact skid-mounted design',
      'Low power consumption',
      'Fully automatic operation'
    ],
    cta: 'Enquire for 250–500 LPH',
    href: WHATSAPP_CR_250_500,
    accent: '#7dd3fc'
  },
  {
    label: 'High-Demand Commercial',
    range: '1000 LPH – 2000 LPH',
    badge: 'Most Popular',
    description:
      'Engineered for schools, banquet halls, hotels, hospitals and housing societies.',
    features: [
      'Heavy-duty FRP / SS vessels',
      'Runxin automatic control valves',
      'Anti-scalant dosing system'
    ],
    cta: 'Enquire for 1000–2000 LPH',
    href: WHATSAPP_CR_1000_2000,
    accent: '#67e8f9',
    featured: true
  },
  {
    label: 'Industrial Custom',
    range: '3000 LPH+',
    description:
      'Custom-built large-capacity mineral-water packaging plants and industrial manufacturing setups.',
    features: [
      'Customized multi-stage filtration',
      'Industrial water softeners and sand filters',
      'Professional nominal-bore UPVC piping'
    ],
    cta: 'Enquire for a Custom Plant',
    href: WHATSAPP_CR_CUSTOM,
    accent: '#a5f3fc'
  }
]

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Raw Water Testing & Analysis',
    body: 'Testing the source water for TDS, hardness and relevant contaminants.'
  },
  {
    n: '02',
    title: 'Custom System Configuration',
    body: 'Selecting suitable vessel sizing, pump ratings, membrane capacity and filtration media.'
  },
  {
    n: '03',
    title: 'Installation & AMC Support',
    body: 'System installation, manifold piping, testing and ongoing maintenance support.'
  }
]

const APPLICATIONS = [
  { label: 'Offices', Icon: Building2 },
  { label: 'Restaurants & cafés', Icon: UtensilsCrossed },
  { label: 'Coaching institutes', Icon: GraduationCap },
  { label: 'Schools', Icon: School },
  { label: 'Banquet halls', Icon: Building },
  { label: 'Hotels', Icon: Hotel },
  { label: 'Hospitals', Icon: HeartPulse },
  { label: 'Housing societies', Icon: HomeIcon },
  { label: 'Manufacturing plants', Icon: Factory },
  { label: 'Mineral-water packaging', Icon: Package },
  { label: 'Malls & large complexes', Icon: Store }
]

/* ------- Shared minimal chrome (kept local to this route) ------- */
function TopBar({ onMenu }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--aqua)' }} />
          <span className="font-serif-ed text-xl tracking-tight">SHRI G <span style={{ color: 'var(--aqua)' }}>AQUA</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/#products" className="btn-ghost">Products</Link>
          <Link href="/#services" className="btn-ghost">Services</Link>
          <Link href="/commercial-ro" className="btn-ghost" style={{ color: 'var(--aqua)' }}>Commercial RO</Link>
          <Link href="/#contact" className="btn-ghost">Contact</Link>
          <Link href="/?enquiry=1" className="btn-ghost ml-1"><Send size={14}/> Send enquiry</Link>
          <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary ml-2"><Phone size={15}/> Call now</a>
        </nav>
        <button className="md:hidden btn-icon" onClick={onMenu} aria-label="Open menu"><Menu size={18}/></button>
      </div>
    </header>
  )
}

function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col">
      <div className="flex items-center justify-between px-5 pt-6">
        <span className="font-serif-ed text-xl">SHRI G <span style={{ color: 'var(--aqua)' }}>AQUA</span></span>
        <button onClick={onClose} className="btn-icon" aria-label="Close menu"><X size={18}/></button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start px-8 gap-6">
        <Link onClick={onClose} href="/#products" className="font-serif-ed text-4xl">Products</Link>
        <Link onClick={onClose} href="/#services" className="font-serif-ed text-4xl">Services</Link>
        <Link onClick={onClose} href="/commercial-ro" className="font-serif-ed text-4xl" style={{ color: 'var(--aqua)' }}>Commercial RO</Link>
        <Link onClick={onClose} href="/#contact" className="font-serif-ed text-4xl">Contact</Link>
        <Link onClick={onClose} href="/?enquiry=1" className="font-serif-ed text-2xl text-white/70 inline-flex items-center gap-2"><Send size={18}/> Send enquiry</Link>
      </div>
      <div className="px-5 pb-safe grid grid-cols-2 gap-3">
        <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary justify-center"><Phone size={15}/> Call</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center" style={{ borderColor: 'rgba(103,232,249,0.4)', background: 'rgba(103,232,249,0.10)' }}><MessageCircle size={15}/> WhatsApp</a>
      </div>
    </div>
  )
}

function ActionRail() {
  return (
    <div className="hidden md:flex fixed right-6 bottom-6 z-40 flex-col gap-2">
      <a href={`tel:${PHONE_PRIMARY}`} className="btn-icon" aria-label="Call"><Phone size={16}/></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ background: 'rgba(103,232,249,0.10)', borderColor: 'rgba(103,232,249,0.35)' }} aria-label="WhatsApp">
        <MessageCircle size={16} style={{ color: 'var(--aqua)' }} />
      </a>
    </div>
  )
}

function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe px-4">
      <div className="flex items-center gap-2 mx-auto max-w-md rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-2 py-2">
        <a href={`tel:${PHONE_PRIMARY}`} className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-white/5 text-sm" aria-label="Call SHRI G AQUA">
          <Phone size={16}/> Call
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-full text-sm" style={{ background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }} aria-label="WhatsApp SHRI G AQUA">
          <MessageCircle size={16}/> WhatsApp
        </a>
        <Link href="/#contact" className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/5" aria-label="More contact options">
          <ArrowUpRight size={16}/>
        </Link>
      </div>
    </div>
  )
}

/* ------- Capacity panel ------- */
function CapacityPanel({ item }) {
  const featured = item.featured
  return (
    <div
      className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col overflow-hidden ${featured ? 'md:-translate-y-2' : ''}`}
      style={{
        background: featured
          ? 'linear-gradient(180deg, rgba(103,232,249,0.06), rgba(255,255,255,0.02))'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${featured ? 'rgba(103,232,249,0.35)' : 'rgba(255,255,255,0.10)'}`,
        boxShadow: featured ? `0 0 40px ${item.accent}22` : 'none'
      }}
    >
      {/* Technical corner brackets */}
      <span className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: `${item.accent}80` }} />
      <span className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: `${item.accent}80` }} />
      <span className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: `${item.accent}80` }} />
      <span className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: `${item.accent}80` }} />
      {/* Hover technical line */}
      <span
        className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />

      {item.badge && (
        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(103,232,249,0.14)', color: item.accent, border: `1px solid ${item.accent}55` }}>
          {item.badge}
        </div>
      )}

      <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">{item.label}</div>
      <div className="font-serif-ed text-3xl sm:text-4xl mt-2" style={{ color: featured ? item.accent : '#f5f7fa' }}>
        {item.range}
      </div>
      <p className="mt-3 text-sm text-white/60 leading-relaxed">{item.description}</p>

      <ul className="mt-5 space-y-2 flex-1">
        {item.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
            <Check size={14} className="mt-1 shrink-0" style={{ color: item.accent }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-6 justify-center"
        style={{
          borderColor: `${item.accent}55`,
          background: featured ? 'rgba(103,232,249,0.14)' : 'rgba(255,255,255,0.06)',
          color: featured ? item.accent : '#f5f7fa'
        }}
      >
        <MessageCircle size={14}/> {item.cta}
      </a>
    </div>
  )
}

/* ------- Contact section (route-local; imports data from lib/business) ------- */
function ContactSection() {
  return (
    <section id="contact" className="relative stage grain px-6 py-24 sm:py-28 scroll-mt-24">
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
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition">
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
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group sm:col-span-2 flex items-start gap-3 rounded-2xl border border-white/10 p-4 hover:border-white/30 transition text-left">
            <div className="btn-icon shrink-0"><MapPin size={16}/></div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Address · Get directions</div>
              <div className="text-sm mt-1 leading-relaxed">{ADDRESS_LINE}</div>
            </div>
          </a>
        </div>

        <div className="mt-16 hairline max-w-md mx-auto" />
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="text-white/20">·</span>
          <Link href="/#products" className="hover:text-white">Products</Link>
          <span className="text-white/20">·</span>
          <Link href="/commercial-ro" className="hover:text-white">Commercial RO</Link>
          <span className="text-white/20">·</span>
          <Link href="/#care" className="hover:text-white">Appliance care</Link>
        </div>
        <p className="mt-6 text-xs text-white/40 pb-24 md:pb-0">
          © {new Date().getFullYear()} SHRI G AQUA · Mathura, Uttar Pradesh
        </p>
      </div>
    </section>
  )
}

/* ============================================================
   Page
============================================================ */
export default function CommercialROPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="relative w-full">
      <TopBar onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============ HERO ============ */}
      <section className="relative stage grain overflow-hidden">
        <div className="stars" />
        <div className="relative z-10 pt-[104px] sm:pt-[128px] pb-16 sm:pb-24 px-5 sm:px-8 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/45">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Commercial RO Solutions</span>
          </nav>

          <div className="mt-8 sm:mt-10 text-center">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-white/55">
              Industrial &amp; Commercial Solutions · Mathura
            </div>
            <h1 className="font-serif-ed mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-4xl mx-auto">
              Water treatment engineered for the capacity your project needs.
            </h1>
            <p className="mt-5 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              Commercial RO, industrial water purification and softening systems for offices, restaurants, schools, hospitals, hotels, institutions, housing societies and manufacturing requirements across Mathura and surrounding regions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={WHATSAPP_CR_HERO}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ borderColor: 'rgba(103,232,249,0.45)', background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }}
              >
                <MessageCircle size={15}/> Discuss your requirement
              </a>
              <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary">
                <Phone size={15}/> Call {PHONE_PRIMARY_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPACITY SELECTOR ============ */}
      <section className="relative stage grain px-5 sm:px-8 py-16 sm:py-24 scroll-mt-24">
        <div className="stars" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Capacities</div>
            <h2 className="font-serif-ed text-4xl sm:text-5xl mt-3 leading-[1.05]">
              From compact skids to industrial custom plants.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              Three capacity tiers. Every system is configured to the source water and the specific requirement.
            </p>
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {CAPACITIES.map((c, i) => (
              <CapacityPanel key={i} item={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUSTOM ENGINEERING PROCESS ============ */}
      <section className="relative stage grain px-5 sm:px-8 py-16 sm:py-24 scroll-mt-24">
        <div className="stars" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Requirement to installation</div>
            <h2 className="font-serif-ed text-4xl sm:text-5xl mt-3 leading-[1.05]">
              Our Custom Engineering Process
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              Every water source has a different composition and TDS level. The system configuration is planned according to the source water, capacity requirement and intended application.
            </p>
          </div>

          <div className="relative mt-12 sm:mt-16">
            {/* Desktop process line */}
            <div className="hidden md:block absolute top-[46px] left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.35), transparent)' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((s, i) => (
                <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left">
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center border"
                    style={{ borderColor: 'rgba(103,232,249,0.4)', background: 'rgba(103,232,249,0.06)' }}
                  >
                    <span className="font-serif-ed text-lg" style={{ color: 'var(--aqua)' }}>{s.n}</span>
                  </div>
                  <h3 className="font-serif-ed text-2xl mt-5">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMERCIAL APPLICATIONS ============ */}
      <section className="relative stage grain px-5 sm:px-8 py-16 sm:py-24 scroll-mt-24">
        <div className="stars" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Applications</div>
            <h2 className="font-serif-ed text-4xl sm:text-5xl mt-3 leading-[1.05]">
              Deployed across sectors in Mathura.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {APPLICATIONS.map((a, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-white/10 bg-white/[0.015] p-4 sm:p-5 flex items-center gap-3 hover:border-white/30 transition"
              >
                <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center shrink-0" style={{ background: 'rgba(103,232,249,0.06)' }}>
                  <a.Icon size={16} style={{ color: 'var(--aqua)' }} />
                </div>
                <div className="text-sm text-white/80 leading-tight">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SITE-SURVEY CONVERSION ============ */}
      <section className="relative stage grain px-5 sm:px-8 py-16 sm:py-24 scroll-mt-24">
        <div className="stars" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
            style={{
              background: 'radial-gradient(1000px 400px at 20% 0%, rgba(103,232,249,0.14), transparent 60%), linear-gradient(180deg, rgba(103,232,249,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(103,232,249,0.35)',
              boxShadow: '0 0 60px rgba(103,232,249,0.10)'
            }}
          >
            <span className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(103,232,249,0.55)' }} />
            <span className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(103,232,249,0.55)' }} />
            <span className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(103,232,249,0.55)' }} />
            <span className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(103,232,249,0.55)' }} />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/55">Site survey</div>
                <h2 className="font-serif-ed text-3xl sm:text-4xl md:text-5xl mt-3 leading-[1.05]">
                  Need a site survey in Mathura?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">
                  Call or message SHRI G AQUA to discuss an on-site evaluation for your commercial, institutional or industrial requirement.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a href={`tel:${PHONE_PRIMARY}`} className="btn-primary justify-center" style={{ borderColor: 'rgba(103,232,249,0.45)' }}>
                  <Phone size={15}/> Call {PHONE_PRIMARY_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_CR_SITE_SURVEY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                  style={{ borderColor: 'rgba(103,232,249,0.5)', background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }}
                >
                  <MessageCircle size={15}/> WhatsApp for site survey
                </a>
                <a href={`tel:${PHONE_ALT}`} className="text-center text-sm text-white/60 hover:text-white transition mt-1">
                  Alternate: <span className="text-white/85">{PHONE_ALT_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Return paths back to homepage */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/#products" className="btn-ghost inline-flex items-center gap-1.5">
              <ChevronLeft size={14}/> Back to products
            </Link>
            <Link href="/#services" className="btn-ghost inline-flex items-center gap-1.5">
              View all services <ArrowUpRight size={13}/>
            </Link>
            <Link href="/#contact" className="btn-ghost inline-flex items-center gap-1.5">
              Contact <ArrowUpRight size={13}/>
            </Link>
            <Link href="/" className="btn-ghost inline-flex items-center gap-1.5">
              Home <ArrowUpRight size={13}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ EXISTING CONTACT ============ */}
      <ContactSection />

      <ActionRail />
      <MobileDock />
    </main>
  )
}
