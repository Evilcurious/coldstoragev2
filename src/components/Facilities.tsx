import { motion } from 'framer-motion'
import { facilityCapabilities } from '../data/content'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { revealEase } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

/** Image that fades and eases in from a slight zoom when it scrolls into view. */
function RevealImage({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  delay?: number
}) {
  return (
    <div className={`group overflow-hidden rounded-[var(--radius-card)] bg-mist-100 ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, delay, ease: revealEase }}
        className="size-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.03]"
      />
    </div>
  )
}

export function Facilities() {
  return (
    <section id="facilities" aria-labelledby="facilities-heading" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="facilities-heading"
              eyebrow="Our Facilities"
              title="Modern Facilities Designed for Consistent Storage"
              lead="Refrigerated rooms, organized storage areas, and dependable refrigeration equipment work together to keep your inventory in steady conditions."
            />

            <ul className="mt-10 divide-y divide-mist-200 border-y border-mist-200">
              {facilityCapabilities.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={item.title}>
                    <Reveal delay={0.1 * index} className="flex gap-5 py-6">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ice-100 text-brand-600">
                        <Icon className="size-5" aria-hidden="true" strokeWidth={1.9} />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-mist-500">{item.description}</p>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ul>

            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="#facility-gallery">Discover Our Facilities</ButtonLink>
            </Reveal>
          </div>

          <div id="facility-gallery" className="scroll-mt-24 grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <RevealImage
              src="/images/facility-chamber.jpg"
              alt="Refrigerated storage chamber with palletized crates on steel racking"
              className="aspect-[4/5] sm:row-span-2 sm:aspect-auto sm:h-full"
            />
            <RevealImage
              src="/images/facility-refrigeration-plant.jpg"
              alt="Industrial refrigeration plant equipment with compressors and insulated piping"
              delay={0.15}
              className="aspect-[4/3]"
            />
            <RevealImage
              src="/images/facility-loading-bay.jpg"
              alt="Insulated loading bay of a cold storage logistics facility with a refrigerated truck"
              delay={0.3}
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
