import { motion } from 'framer-motion'
import { reasons } from '../data/content'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { revealEase } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function WhyChooseUs() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.5, ease: revealEase }}
            className="group overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-34px_rgb(11_31_58/0.45)]"
          >
            <img
              src="/images/why-warehouse-aisle.jpg"
              alt="Organized aisle of a cold storage warehouse with palletized stock on pallet racking"
              loading="lazy"
              decoding="async"
              width={1408}
              height={768}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03] lg:aspect-[4/5]"
            />
          </motion.div>
          <Reveal
            delay={0.3}
            className="absolute -bottom-6 right-6 hidden rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-lift backdrop-blur sm:block"
          >
            <p className="text-sm font-semibold text-navy-900">Organized. Monitored. Dependable.</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <SectionHeading
            id="about-heading"
            eyebrow="About & Why Choose Us"
            title="A Dependable Partner for Temperature-Sensitive Inventory"
            lead="We focus on the details that matter to your product: stable conditions, orderly handling, and a team you can reach when plans change."
          />

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <li key={reason.title}>
                  <Reveal delay={0.05 * (index % 2)} className="flex gap-4">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-ice-300/70 bg-white text-brand-600">
                      <Icon className="size-[1.1rem]" aria-hidden="true" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="text-[0.98rem] font-bold text-navy-900">{reason.title}</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-mist-500">{reason.description}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <Reveal delay={0.2} className="mt-12">
            <ButtonLink href="#contact" variant="secondary">
              Talk to Our Team
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
