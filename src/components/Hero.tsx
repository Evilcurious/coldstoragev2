import { motion } from 'framer-motion'
import { Snowflake } from 'lucide-react'
import { site } from '../config/site'
import { ButtonLink } from './Button'

const ease = [0.22, 1, 0.36, 1] as const

const trustItems = ['Reliable Storage', 'Controlled Temperatures', 'Flexible Solutions']

/** Headline split into two lines so each line can reveal separately. */
const headlineLines = ['Keeping Your Products', 'Fresh. Protecting Your', 'Business.']

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Soft background shapes: a faint ice glow and a thin ring, kept quiet on purpose. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(211_234_246/0.85),rgb(233_245_251/0.35)_55%,transparent)]" />
        <div className="absolute top-28 left-[42%] hidden size-[30rem] rounded-full border border-ice-200/80 lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-mist-200 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-32 pb-20 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pt-40 lg:pb-28">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="eyebrow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
            Smart Cold Storage &amp; Logistics
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2rem] leading-[1.08] font-bold tracking-[-0.025em] text-navy-900 sm:text-[2.9rem] lg:text-[3.25rem] xl:text-[3.4rem]"
          >
            {headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.45 + index * 0.16, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-mist-500 sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="#contact">Get a Quote</ButtonLink>
            <ButtonLink href="#facilities" variant="secondary">
              Explore Our Facilities
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] font-medium text-navy-600 sm:gap-x-3"
          >
            {trustItems.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="hidden size-1 rounded-full bg-ice-400 sm:block" />
                )}
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative lg:col-span-6">
          {/* Offset ice panel adds depth behind the photo. */}
          <div
            aria-hidden="true"
            className="absolute -top-5 -right-5 -bottom-5 left-10 rounded-[1.75rem] bg-ice-100 sm:left-16"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease }}
            className="group relative overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(11_31_58/0.45)]"
          >
            <img
              src="/images/hero-cold-storage.jpg"
              alt="Interior of a temperature-controlled cold storage warehouse with ceiling evaporator units and pallet racking"
              width={1408}
              height={768}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/4.4] w-full object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-[1.04] sm:aspect-[16/12] lg:aspect-[4/4.6]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/25 via-transparent to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.7, ease }}
            className="absolute bottom-6 left-4 flex max-w-[15.5rem] items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3.5 pr-5 shadow-lift backdrop-blur-md sm:bottom-10 sm:-left-6"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ice-100 text-brand-600">
              <Snowflake className="size-5" aria-hidden="true" strokeWidth={2} />
            </span>
            <span className="text-[0.82rem] leading-snug font-semibold text-navy-900">
              Reliable Temperature-Controlled Storage
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
