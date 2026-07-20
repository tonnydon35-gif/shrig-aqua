// Centralized business configuration for SHRI G AQUA.
// Consumed by /app/app/page.js and /app/app/commercial-ro/page.js.

export const PHONE_PRIMARY = '+918449691018'
export const PHONE_PRIMARY_DISPLAY = '+91 84496 91018'
export const PHONE_ALT = '+918460514208'
export const PHONE_ALT_DISPLAY = '+91 84605 14208'
export const EMAIL = 'shrigmathura@gmail.com'
export const ADDRESS_LINE =
  '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass, Mathura – 281001, Uttar Pradesh'
export const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`

export const waLink = (msg) => `https://wa.me/918449691018?text=${encodeURIComponent(msg)}`

/* Generic + product-context WhatsApp URLs (used from homepage) */
export const WHATSAPP_URL = waLink('Hello SHRI G AQUA, I would like details about your services.')
export const WHATSAPP_COMMERCIAL = waLink(
  'Hello SHRI G AQUA, I want to discuss a customized Commercial RO system for my requirement.'
)
export const WHATSAPP_DOMESTIC = waLink(
  'Hello SHRI G AQUA, I need details about Domestic RO sales, installation or service.'
)
export const WHATSAPP_AC = waLink(
  'Hello SHRI G AQUA, I need details about Split AC installation or service.'
)
export const WHATSAPP_WM = waLink('Hello SHRI G AQUA, I need washing machine service in Mathura.')
export const WHATSAPP_FRIDGE = waLink('Hello SHRI G AQUA, I need refrigerator service in Mathura.')

/* Services-section contextual WhatsApp URLs (client-supplied exact wording) */
export const WHATSAPP_RO_SERVICE = waLink('Hello SHRI G AQUA, I need Domestic RO service in Mathura.')
export const WHATSAPP_COMMERCIAL_SERVICE = waLink('Hello SHRI G AQUA, I need installation or service support for a Commercial RO system.')
export const WHATSAPP_AC_SERVICE = waLink('Hello SHRI G AQUA, I need Split AC installation or service in Mathura.')

/* /commercial-ro contextual WhatsApp URLs (client-supplied exact wording) */
export const WHATSAPP_CR_HERO =
  'https://wa.me/918449691018?text=Hello%20SHRI%20G%20AQUA%2C%20I%20want%20to%20discuss%20a%20Commercial%20RO%20system%20for%20my%20required%20capacity.'
export const WHATSAPP_CR_250_500 =
  'https://wa.me/918449691018?text=Hello%20SHRI%20G%20AQUA%2C%20I%20need%20details%20for%20a%20250-500%20LPH%20Commercial%20RO.'
export const WHATSAPP_CR_1000_2000 =
  'https://wa.me/918449691018?text=Hello%20SHRI%20G%20AQUA%2C%20I%20need%20details%20for%20a%201000-2000%20LPH%20Plant.'
export const WHATSAPP_CR_CUSTOM =
  'https://wa.me/918449691018?text=Hello%20SHRI%20G%20AQUA%2C%20I%20need%20details%20for%20a%20Custom%20Industrial%20Plant.'
export const WHATSAPP_CR_SITE_SURVEY =
  'https://wa.me/918449691018?text=Hello%20SHRI%20G%20AQUA%2C%20I%20want%20to%20schedule%20a%20site%20survey.'
