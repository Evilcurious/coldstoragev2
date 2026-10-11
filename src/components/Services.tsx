import { motion } from 'framer-motion'
import { services } from '../data/content'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { revealEase } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Our Services"
            title="Cold Storage Solutions Built Around Your Needs"
          />
          <Reveal delay={0.2} className="lg:max-w-sm">
            <p className="section-lead">
              Every service is shaped around how your inventory arrives, rests, and leaves our facility.
            </p>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.li
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: revealEase } },
                }}
                className="group relative flex flex-col rounded-[var(--radius-card)] border border-mist-200/80 bg-white p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-ice-300 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-ice-100 text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.9} />
                  </span>
                  <span className="text-sm font-semibold text-mist-300 tabular-nums">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-lg leading-snug font-bold text-navy-900">{service.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-500">{service.description}</p>
              </motion.li>
            )
          })}
        </motion.ul>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <ButtonLink href="#contact" variant="secondary">
            Discuss Your Storage Needs
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
