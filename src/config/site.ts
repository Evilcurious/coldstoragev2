/**
 * Central site configuration.
 *
 * Every value marked PLACEHOLDER must be replaced with the company's real
 * details before launch. Placeholder values are rendered as visible
 * "to be added" text and are never turned into live links.
 */

const PLACEHOLDER = (label: string) => `[${label}]`

export const isPlaceholder = (value: string) => value.startsWith('[')

export const site = {
  // PLACEHOLDER: brand name used across the site. "Frostline" is a working name.
  name: 'Frostline Cold Storage',
  shortName: 'Frostline',
  tagline: 'Smart Cold Storage & Logistics',
  description:
    'Reliable temperature-controlled storage solutions designed to preserve product quality, improve inventory management, and support your supply chain.',
  url: 'https://www.example.com', // PLACEHOLDER: production domain
  locale: 'en',

  contact: {
    phone: PLACEHOLDER('Phone number'),
    email: PLACEHOLDER('Business email'),
    address: PLACEHOLDER('Facility address'),
    hours: PLACEHOLDER('Business hours'),
  },

  /**
   * Social profiles. Add real URLs only; the footer hides any entry that is empty.
   * Example: { label: 'LinkedIn', href: 'https://www.linkedin.com/company/...' }
   */
  socials: [] as { label: string; href: string }[],
}

/**
 * Quote form delivery. Set VITE_FORM_ENDPOINT to a form-handling endpoint that
 * accepts JSON POST requests (for example a Formspree, Web3Forms, or your own API
 * route). See README.md, section "Connecting the quote form".
 */
export const formEndpoint: string = import.meta.env.VITE_FORM_ENDPOINT ?? ''
