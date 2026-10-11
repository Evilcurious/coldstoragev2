import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { navLinks } from '../data/content'
import { Logo } from './Logo'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const menuId = useId()

  // Close the mobile menu on Escape and when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? 'border-b border-mist-200/80 bg-white/85 shadow-[0_6px_24px_-18px_rgb(11_31_58/0.35)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-lg px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-300 hover:text-brand-600 ${
                      isActive ? 'text-brand-600' : 'text-navy-700'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-brand-600 transition-transform duration-500 ease-[var(--ease-premium)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-[var(--radius-control)] bg-brand-600 px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_8px_20px_-10px_rgb(29_95_184/0.6)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_14px_26px_-12px_rgb(29_95_184/0.65)] sm:inline-flex"
          >
            Get a Quote
          </a>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] text-navy-900 transition-colors hover:bg-mist-100 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={menuId}
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-mist-200 bg-white px-5 pb-8 pt-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1)
                return (
                  <li key={link.href} className="border-b border-mist-100 last:border-0">
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-4 text-lg font-semibold transition-colors ${
                        isActive ? 'text-brand-600' : 'text-navy-900 hover:text-brand-600'
                      }`}
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-mist-300">
                        →
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 flex w-full items-center justify-center rounded-[var(--radius-control)] bg-brand-600 px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_24px_-10px_rgb(29_95_184/0.55)] transition-colors hover:bg-brand-700"
            >
              Get a Quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
