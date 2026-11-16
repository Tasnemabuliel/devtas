export const CONTACT_EMAIL = 'devtasweb@gmail.com'

export const MAILTO_INQUIRY_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('DevTAS - Website Inquiry')}`

export const INSTAGRAM_HREF = 'https://www.instagram.com/dev.tas1/'

export const LINKEDIN_HREF = 'https://www.linkedin.com/in/tasneem-abuliel-215090304/'

export const WHATSAPP_NUMBER = '972542621691'
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`

export const PHONE_DISPLAY = '054-262-1691'
export const PHONE_HREF = 'tel:+972542621691'

export const FITNESS_COACH_SITE_HREF = 'https://www.orelkorait.com'

export const ACADEMY_SITE_HREF = 'https://devtasweb.vercel.app'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvlgvwb'

/** Optional server-side chatbot endpoint — never put API keys in the client. */
export const CHAT_API_ENDPOINT = import.meta.env.VITE_CHAT_API_URL as string | undefined

export function buildWhatsAppHref(message: string) {
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`
}
