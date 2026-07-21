// Centralized business configuration for Shrig Aqua
// All business-specific values are stored here for easy updates

export const BUSINESS_NAME = 'Shrig Aqua'
export const BUSINESS_NAME_SHORT = 'Shrig Aqua'
export const TAGLINE = 'Pure Water. Pure Life.'
export const TAGLINE_SHORT = 'Pure Water. Pure Life.'

export const PHONE_PRIMARY = '+918449691018'
export const PHONE_PRIMARY_DISPLAY = '+91 84496 91018'
export const PHONE_ALT = '+918460514208'
export const PHONE_ALT_DISPLAY = '+91 84605 14208'
export const WHATSAPP_NUMBER = '918449691018'
export const EMAIL = 'shrigmathura@gmail.com'
export const ADDRESS_LINE =
  '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass, Mathura – 281001, Uttar Pradesh'
export const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`

export const WORKING_HOURS = 'Mon–Sat: 9:00 AM – 7:00 PM'

export const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

/* WhatsApp URLs */
export const WHATSAPP_URL = waLink(
  `Hello ${BUSINESS_NAME}, I would like details about your services.`
)
export const WHATSAPP_BOOKING_SERVICE = (service, name, phone, area, date, time, message) =>
  waLink(
    `Hello ${BUSINESS_NAME}, I want to book a service.\nService: ${service}\nName: ${name}\nPhone: ${phone}\nArea: ${area}\nPreferred Date: ${date}\nPreferred Time: ${time}\nMessage: ${message}`
  )
export const WHATSAPP_BOOKING = waLink(
  `Hello ${BUSINESS_NAME}, I want to book a service.`
)
export const WHATSAPP_COMMERCIAL = waLink(
  `Hello ${BUSINESS_NAME}, I want to discuss a Commercial RO system.`
)
export const WHATSAPP_RO_SERVICE = waLink(
  `Hello ${BUSINESS_NAME}, I need RO repair or service.`
)
export const WHATSAPP_AC_SERVICE = waLink(
  `Hello ${BUSINESS_NAME}, I need AC repair or service.`
)

/* Service areas */
export const SERVICE_AREAS = [
  'Mathura',
  'Vrindavan',
  'Kosi Kalan',
  'Gokul',
  'Govardhan',
  'Barsana',
  'Nearby areas',
]

/* Social links - only add actual profiles */
export const SOCIAL_LINKS = {}

/* AMC Plans */
export const AMC_PLANS = [
  {
    id: 'basic',
    name: 'Basic Care',
    priceLabel: 'Contact for Plan',
    highlighted: false,
    features: [
      'Scheduled inspection',
      'System cleaning',
      'Water-flow check',
      'Basic performance check',
      'Service reminders',
    ],
  },
  {
    id: 'complete',
    name: 'Complete Care',
    priceLabel: 'Contact for Plan',
    highlighted: true,
    features: [
      'Multiple scheduled visits',
      'Priority support',
      'Labour coverage where applicable',
      'Discounted spare parts where applicable',
      'Water-quality observation',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial Care',
    priceLabel: 'Contact for Plan',
    highlighted: false,
    features: [
      'Preventive maintenance',
      'System-health report',
      'Priority technician scheduling',
      'Custom maintenance schedule',
      'Business support options',
    ],
  },
]

/* Stats - mark VERIFIED once confirmed by business */
export const STATS = [
  { label: 'Experienced Service Team', value: 'Expert Team', verified: false },
  { label: 'Residential & Commercial Support', value: 'All Properties', verified: false },
  { label: 'Multiple Service Categories', value: '6+ Services', verified: false },
  { label: 'Customer-Focused Service', value: 'Quality First', verified: false },
]

/* Service listings */
export const SERVICES = [
  {
    id: 'ro-repair',
    title: 'RO Repair & Maintenance',
    description:
      'Fix all RO issues including leakage, low water flow, unusual noise, bad taste, auto cut-off problems, and general servicing.',
    slug: '/ro-service',
    cta: 'Book Now',
    image: null,
  },
  {
    id: 'ro-installation',
    title: 'RO Installation',
    description:
      'Professional installation, shifting, reinstallation, and setup of domestic RO systems.',
    slug: '/ro-installation',
    cta: 'Book Now',
    image: null,
  },
  {
    id: 'filter-replacement',
    title: 'Filter & Membrane Replacement',
    description:
      'Replacement of sediment filters, carbon filters, RO membranes, UV lamps, and other purifier components.',
    slug: '/ro-service',
    cta: 'Book Now',
    image: null,
  },
  {
    id: 'ro-amc',
    title: 'RO AMC Plans',
    description:
      'Regular inspection, cleaning, scheduled maintenance, and priority service through annual maintenance plans.',
    slug: '/ro-amc',
    cta: 'View Plans',
    image: null,
  },
  {
    id: 'commercial-ro',
    title: 'Commercial RO Systems',
    description:
      'RO systems and maintenance solutions for offices, schools, restaurants, hospitals, housing societies, and businesses.',
    slug: '/commercial-ro',
    cta: 'Enquire Now',
    image: null,
  },
  {
    id: 'ac-service',
    title: 'AC Services',
    description:
      'AC installation, repair, cleaning, gas refill, maintenance, and cooling-related support.',
    slug: '/ac-service',
    cta: 'Book Now',
    image: null,
  },
]

/* FAQ */
export const FAQ_ITEMS = [
  {
    q: 'How long does an RO service usually take?',
    a: 'A standard RO service visit typically takes 45 minutes to 1.5 hours depending on the issue and system type.',
  },
  {
    q: 'When should RO filters be replaced?',
    a: 'Filter replacement depends on usage and water quality. Sediment and carbon filters are typically checked every 6–12 months. RO membranes may last 1–2 years with proper maintenance.',
  },
  {
    q: 'Is same-day service available?',
    a: 'We try to accommodate same-day service where possible. Availability depends on your location and technician schedule.',
  },
  {
    q: 'Do you provide RO installation and shifting?',
    a: 'Yes, we provide professional RO installation, shifting, and reinstallation services.',
  },
  {
    q: 'What is included in an AMC plan?',
    a: 'AMC plans include scheduled inspections, system cleaning, performance checks, and priority support. Specific inclusions vary by plan.',
  },
  {
    q: 'Do you service commercial RO systems?',
    a: 'Yes, we provide service and maintenance for commercial RO systems for businesses, offices, and institutions.',
  },
  {
    q: 'Are spare-part costs included in the service charge?',
    a: 'Spare-part costs are generally not included in the standard service charge. We provide pricing approval before any replacement work.',
  },
  {
    q: 'Do you provide AC repair and installation?',
    a: 'Yes, we offer AC installation, repair, cleaning, gas refill, and maintenance services.',
  },
  {
    q: 'How can I book a technician?',
    a: 'You can book through the booking form on this website, call us directly, or reach out on WhatsApp.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We currently serve Mathura, Vrindavan, Kosi Kalan, Gokul, Govardhan, and nearby areas.',
  },
]

/* Common problems */
export const COMMON_PROBLEMS = [
  { label: 'RO Not Starting', service: 'RO Repair' },
  { label: 'Low Water Flow', service: 'RO Repair' },
  { label: 'Bad Taste or Odor', service: 'RO Repair' },
  { label: 'Water Leakage', service: 'RO Repair' },
  { label: 'RO Making Noise', service: 'RO Repair' },
  { label: 'Filter Replacement', service: 'Filter Replacement' },
  { label: 'AC Not Cooling', service: 'AC Repair' },
  { label: 'AC Water Leakage', service: 'AC Repair' },
]
