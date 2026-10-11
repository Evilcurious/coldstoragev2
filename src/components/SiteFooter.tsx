import { navLinks, services } from '../data/content'
import { isPlaceholder, site } from '../config/site'
import { Logo } from './Logo'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-ice-100/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo variant="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ice-100/70">{site.description}</p>
        </div>

        <nav aria-label="Footer quick links" className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services" className="lg:col-span-2">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Services</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {services.map((service) => (
              <li key={service.title}>
                <a href="#services" className="transition-colors hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Contact</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li>{isPlaceholder(site.contact.phone) ? <span className="italic text-ice-100/50">Phone to be added</span> : <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">{site.contact.phone}</a>}</li>
            <li>{isPlaceholder(site.contact.email) ? <span className="italic text-ice-100/50">Email to be added</span> : <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">{site.contact.email}</a>}</li>
            <li>{isPlaceholder(site.contact.address) ? <span className="italic text-ice-100/50">Address to be added</span> : site.contact.address}</li>
          </ul>
          {site.socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-[0.95rem]">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-ice-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Temperature-controlled storage and logistics.</p>
        </div>
      </div>
    </footer>
  )
}
