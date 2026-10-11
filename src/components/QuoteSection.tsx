import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, TriangleAlert } from 'lucide-react'
import { type ChangeEvent, type FormEvent, type ReactNode, useRef, useState } from 'react'
import { formEndpoint, isPlaceholder, site } from '../config/site'
import { storageTypes } from '../data/content'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { revealEase } from '../lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

type FormValues = {
  name: string
  email: string
  phone: string
  storageType: string
  volume: string
  message: string
}

const emptyValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  storageType: '',
  volume: '',
  message: '',
}

const fieldClass =
  'w-full rounded-[var(--radius-control)] border border-mist-300 bg-white px-4 py-3 text-[0.95rem] text-navy-900 shadow-[0_1px_2px_rgb(11_31_58/0.03)] transition-[border-color,box-shadow] duration-300 placeholder:text-mist-300 hover:border-navy-400/50 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15'

function Field({
  id,
  label,
  required,
  children,
  hint,
  className = '',
}: {
  id: string
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-brand-600">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-medium text-mist-500">(optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-mist-500">{hint}</p>}
    </div>
  )
}

/** Shows a contact detail, or a clearly marked placeholder until the real value is added. */
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone
  label: string
  value: string
  href?: string
}) {
  const placeholder = isPlaceholder(value)
  const content = placeholder ? (
    <span className="italic text-mist-500">{value} to be added</span>
  ) : href ? (
    <a href={href} className="font-medium text-navy-900 transition-colors hover:text-brand-600">
      {value}
    </a>
  ) : (
    <span className="font-medium text-navy-900">{value}</span>
  )

  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
        <Icon className="size-[1.1rem]" aria-hidden="true" strokeWidth={1.9} />
      </span>
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-mist-500 uppercase">{label}</p>
        <p className="mt-1 text-[0.95rem]">{content}</p>
      </div>
    </li>
  )
}

export function QuoteSection() {
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
      if (status === 'error' || status === 'success') setStatus('idle')
    }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = formRef.current
    if (!form) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    // Bots that fill the hidden field get a success message but nothing is sent.
    if (honeypot) {
      setStatus('success')
      return
    }

    if (!formEndpoint) {
      console.warn(
        'Quote form: VITE_FORM_ENDPOINT is not set, so the request was not sent. See README.md for setup.',
      )
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          _subject: `New quote request from ${values.name || 'website visitor'}`,
        }),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('success')
      setValues(emptyValues)
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const submitting = status === 'submitting'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-ice-100/70 py-24 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.9),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="contact-heading" className="section-title mt-5">
              Request a Quote
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="section-lead mt-5">
              Tell us what you need to store and we will get back to you with the next steps. All information you
              share remains confidential.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-12 space-y-6">
              <ContactRow
                icon={Phone}
                label="Phone"
                value={site.contact.phone}
                href={isPlaceholder(site.contact.phone) ? undefined : `tel:${site.contact.phone.replace(/\s/g, '')}`}
              />
              <ContactRow
                icon={Mail}
                label="Email"
                value={site.contact.email}
                href={isPlaceholder(site.contact.email) ? undefined : `mailto:${site.contact.email}`}
              />
              <ContactRow icon={MapPin} label="Location" value={site.contact.address} />
              <ContactRow icon={Clock} label="Business hours" value={site.contact.hours} />
            </ul>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: revealEase }}
          className="rounded-[1.25rem] border border-white bg-white p-6 shadow-lift sm:p-10 lg:col-span-7"
        >
          <form ref={formRef} onSubmit={handleSubmit} aria-describedby="form-status" className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" required className="sm:col-span-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={update('name')}
                placeholder="Jane Doe"
                className={fieldClass}
              />
            </Field>

            <Field id="email" label="Business email" required>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={update('email')}
                placeholder="name@company.com"
                className={fieldClass}
              />
            </Field>

            <Field id="phone" label="Phone number" required>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={values.phone}
                onChange={update('phone')}
                placeholder="+1 555 000 0000"
                className={fieldClass}
              />
            </Field>

            <Field id="storageType" label="Type of storage required" required>
              <select
                id="storageType"
                name="storageType"
                required
                value={values.storageType}
                onChange={update('storageType')}
                className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%231d5fb8' stroke-width='2'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E")] bg-[length:0.75rem] bg-[right_1rem_center] bg-no-repeat pr-10 ${
                  values.storageType ? '' : 'text-mist-500'
                }`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {storageTypes.map((type) => (
                  <option key={type} value={type} className="text-navy-900">
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="volume"
              label="Estimated storage volume"
              required
              className="sm:col-span-2"
              hint="For example, an approximate number of pallets or a rough quantity. An estimate is fine."
            >
              <input
                id="volume"
                name="volume"
                type="text"
                required
                value={values.volume}
                onChange={update('volume')}
                placeholder="e.g. around 20 pallets, ongoing monthly"
                className={fieldClass}
              />
            </Field>

            <Field id="message" label="Message" className="sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={update('message')}
                placeholder="Tell us about your products, storage timing, or any questions you have."
                className={`${fieldClass} resize-y`}
              />
            </Field>

            {/* Honeypot: hidden from people and screen readers, filled by many bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-mist-500">
                <span className="text-brand-600">*</span> Required fields
              </p>
              <Button type="submit" disabled={submitting} aria-busy={submitting} className="w-full sm:w-auto">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending request…
                  </>
                ) : (
                  'Request a Quote'
                )}
              </Button>
            </div>

            <div id="form-status" aria-live="polite" className="sm:col-span-2">
              {status === 'success' && (
                <FormMessage tone="success" icon={CheckCircle2} title="Thank you, your request has been sent.">
                  We have received your details and will be in touch shortly.
                </FormMessage>
              )}
              {status === 'error' && (
                <FormMessage tone="error" icon={TriangleAlert} title="We could not send your request.">
                  Please check your connection and try again. If the problem continues, email{' '}
                  {isPlaceholder(site.contact.email) ? 'our team directly' : site.contact.email}.
                </FormMessage>
              )}
              {status === 'unconfigured' && (
                <FormMessage tone="error" icon={TriangleAlert} title="Online quote requests are not connected yet.">
                  Your details were not sent. Please contact us directly
                  {isPlaceholder(site.contact.email) ? ' using the details on this page' : ` at ${site.contact.email}`}.
                  The site owner can connect this form by following the setup steps in README.md.
                </FormMessage>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function FormMessage({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: 'success' | 'error'
  icon: typeof CheckCircle2
  title: string
  children: ReactNode
}) {
  const styles =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
      : 'border-amber-200 bg-amber-50/80 text-amber-950'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: revealEase }}
      className={`flex gap-3.5 rounded-[var(--radius-control)] border p-4 text-sm leading-relaxed ${styles}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 opacity-90">{children}</p>
      </div>
    </motion.div>
  )
}
