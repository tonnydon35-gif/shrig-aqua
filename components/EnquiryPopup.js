'use client'

import { useEffect, useRef, useState, useId } from 'react'
import { X, Phone, MessageCircle } from 'lucide-react'

const SESSION_DONE_KEY = 'sga_enquiry_completed_session'
const DISMISS_KEY = 'sga_enquiry_dismissed_at'
const SUPPRESS_MS = 24 * 60 * 60 * 1000 // 24 hours

const SERVICES = [
  'Domestic RO purchase or installation',
  'Domestic RO service',
  'New Commercial RO system',
  'Commercial RO installation or service',
  'Split AC installation or service',
  'Washing machine service',
  'Refrigerator service',
  'Other enquiry'
]

function isSuppressed() {
  if (typeof window === 'undefined') return true
  try {
    if (sessionStorage.getItem(SESSION_DONE_KEY) === '1') return true
    const t = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10)
    if (t && Date.now() - t < SUPPRESS_MS) return true
  } catch {
    /* storage disabled — fail open */
  }
  return false
}

/* Auto-trigger effect: 8s timer OR 30% scroll, first-wins. */
export function useAutoEnquiryTrigger({ blocked, onFire }) {
  useEffect(() => {
    if (blocked) return
    if (typeof window === 'undefined') return
    if (isSuppressed()) return

    let fired = false
    const fire = () => {
      if (fired) return
      fired = true
      onFire()
    }
    const t = setTimeout(fire, 8000)
    const onScroll = () => {
      const scrolled = window.scrollY
      const doc = document.documentElement
      const total = Math.max(1, doc.scrollHeight - window.innerHeight)
      if (scrolled / total >= 0.30) fire()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [blocked, onFire])
}

function validatePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '')
  const norm = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
  if (norm.length !== 10) return null
  if (!/^[6-9]/.test(norm)) return null // Indian mobile numbers start with 6–9
  return norm
}

export default function EnquiryPopup({ open, onClose, prefersReducedMotion = false }) {
  const dialogRef = useRef(null)
  const nameRef = useRef(null)
  const openerRef = useRef(null)
  const titleId = useId()
  const descId = useId()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState({})
  const [srMsg, setSrMsg] = useState('')

  // Reset form when opening
  useEffect(() => {
    if (open) {
      setErrors({})
      setSrMsg('')
      openerRef.current = document.activeElement
      // Focus first field after paint
      const id = requestAnimationFrame(() => nameRef.current?.focus())
      return () => cancelAnimationFrame(id)
    } else {
      // Restore focus to opener
      const el = openerRef.current
      if (el && typeof el.focus === 'function') {
        try { el.focus() } catch { /* noop */ }
      }
    }
  }, [open])

  // Body scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // ESC + focus trap
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); handleDismiss() ; return }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null)
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const persistCompleted = () => {
    try { sessionStorage.setItem(SESSION_DONE_KEY, '1') } catch { /* noop */ }
  }
  const persistDismissed = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch { /* noop */ }
  }

  const handleDismiss = () => {
    persistDismissed()
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!name.trim()) nextErrors.name = 'Please enter your name.'
    const ok = validatePhone(phone)
    if (!ok) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (!service) nextErrors.service = 'Please select a service.'
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSrMsg('Please correct the highlighted fields.')
      const firstField = Object.keys(nextErrors)[0]
      const el = dialogRef.current?.querySelector(`[data-field="${firstField}"]`)
      el?.focus()
      return
    }

    setSrMsg('Opening WhatsApp with your enquiry.')

    const msg = [
      'Hello SHRI G AQUA, I want to send an enquiry.',
      `Name: ${name.trim()}`,
      `Customer phone: +91 ${ok}`,
      `Service required: ${service}`,
      `Requirement: ${note.trim() || 'Not provided'}`
    ].join('\n')

    const url = `https://wa.me/918449691018?text=${encodeURIComponent(msg)}`

    // Open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer')

    persistCompleted()
    onClose()

    // reset form for next manual open
    setName(''); setPhone(''); setService(''); setNote('')
  }

  if (!open) return null

  const trans = prefersReducedMotion ? '' : 'transition-opacity duration-300'

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 ${trans}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-[520px] rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#08090f]/95 backdrop-blur-2xl shadow-2xl max-h-[92vh] overflow-y-auto pb-safe"
        style={{ boxShadow: '0 0 60px rgba(103,232,249,0.10)' }}
      >
        <div className="p-6 sm:p-7 pb-2">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">Quick enquiry</div>
            <button onClick={handleDismiss} className="btn-icon" aria-label="Close enquiry"><X size={16}/></button>
          </div>
          <h2 id={titleId} className="font-serif-ed text-3xl sm:text-4xl mt-2 leading-tight">How can SHRI G AQUA help?</h2>
          <p id={descId} className="mt-2 text-sm text-white/60">Share your requirement and continue on WhatsApp.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 sm:px-7 pb-6 sm:pb-7 space-y-4" noValidate>
          <div>
            <label htmlFor="enq-name" className="block text-[11px] uppercase tracking-[0.24em] text-white/55 mb-1.5">Your name</label>
            <input
              id="enq-name"
              ref={nameRef}
              data-field="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[44px] rounded-xl bg-white/[0.04] border border-white/10 focus:border-[var(--aqua)] focus:ring-2 focus:ring-[var(--aqua)]/30 outline-none px-4 text-sm text-white placeholder-white/30"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'enq-name-err' : undefined}
            />
            {errors.name && <p id="enq-name-err" className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="enq-phone" className="block text-[11px] uppercase tracking-[0.24em] text-white/55 mb-1.5">Mobile number</label>
            <input
              id="enq-phone"
              data-field="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit Indian mobile"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full min-h-[44px] rounded-xl bg-white/[0.04] border border-white/10 focus:border-[var(--aqua)] focus:ring-2 focus:ring-[var(--aqua)]/30 outline-none px-4 text-sm text-white placeholder-white/30"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'enq-phone-err' : undefined}
            />
            {errors.phone && <p id="enq-phone-err" className="mt-1 text-xs text-red-400">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="enq-service" className="block text-[11px] uppercase tracking-[0.24em] text-white/55 mb-1.5">Service required</label>
            <select
              id="enq-service"
              data-field="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full min-h-[44px] rounded-xl bg-white/[0.04] border border-white/10 focus:border-[var(--aqua)] focus:ring-2 focus:ring-[var(--aqua)]/30 outline-none px-3 text-sm text-white"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'enq-service-err' : undefined}
            >
              <option value="" className="bg-[#08090f]">Select a service…</option>
              {SERVICES.map((s) => (
                <option key={s} value={s} className="bg-[#08090f]">{s}</option>
              ))}
            </select>
            {errors.service && <p id="enq-service-err" className="mt-1 text-xs text-red-400">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="enq-note" className="block text-[11px] uppercase tracking-[0.24em] text-white/55 mb-1.5">
              Tell us briefly <span className="normal-case tracking-normal text-white/40">(optional)</span>
            </label>
            <textarea
              id="enq-note"
              maxLength={300}
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-[var(--aqua)] focus:ring-2 focus:ring-[var(--aqua)]/30 outline-none p-3 text-sm resize-none text-white placeholder-white/30"
            />
            <div className="mt-1 text-[10px] text-white/40 text-right">{note.length}/300</div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center min-h-[48px]"
            style={{ borderColor: 'rgba(103,232,249,0.45)', background: 'rgba(103,232,249,0.14)', color: 'var(--aqua)' }}
          >
            <MessageCircle size={15}/> Send enquiry on WhatsApp
          </button>

          <a href="tel:+918449691018" className="btn-ghost w-full justify-center min-h-[44px]">
            <Phone size={14}/> Call instead
          </a>

          <p className="text-[11px] text-white/45 leading-relaxed pt-2">
            Your details are not stored on this website. They are added to the WhatsApp message only when you choose to send it.
          </p>

          <div aria-live="polite" className="sr-only">{srMsg}</div>
        </form>
      </div>
    </div>
  )
}
