import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { productCategories } from '../data/content'
import { Reveal } from './Reveal'
import { revealEase } from '../lib/motion'
import { SectionHeading } from './SectionHeading'

export function Products() {
  return (
    <section id="products" aria-labelledby="products-heading" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="products-heading"
            eyebrow="Product Categories"
            title="Goods Our Facilities Can Support"
          />
          <Reveal delay={0.2} className="lg:max-w-sm">
            <p className="section-lead">
              Suitability is confirmed case by case. Share your product details and we will confirm what we can store.
            </p>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {productCategories.map((product) => (
            <motion.li
              key={product.title}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: revealEase } },
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist-100"
            >
              <img
                src={product.image}
                alt={product.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent transition-opacity duration-500"
              />
              <h3 className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[1.05rem] leading-snug font-bold text-white sm:p-6">
                {product.title}
                <ArrowRight
                  aria-hidden="true"
                  className="mb-0.5 size-4 shrink-0 translate-x-[-6px] opacity-0 transition-all duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0 group-hover:opacity-100"
                />
              </h3>
            </motion.li>
          ))}

          <motion.li
            variants={{
              hidden: { opacity: 0, y: 26 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: revealEase } },
            }}
            className="flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-ice-300 bg-ice-50 p-6 sm:p-7"
          >
            <div>
              <h3 className="text-[1.05rem] font-bold text-navy-900">Have a different product?</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-500">
                Tell us what you store and the conditions it needs. We will advise whether it fits our facilities.
              </p>
            </div>
            <a
              href="#contact"
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Contact our team
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  )
}
