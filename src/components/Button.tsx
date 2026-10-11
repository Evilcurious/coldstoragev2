import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost-light'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-control)] px-6 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap transition-all duration-300 ease-[var(--ease-premium)] will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-offset-4'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgb(29_95_184/0.55)] hover:bg-brand-700 hover:shadow-[0_16px_30px_-12px_rgb(29_95_184/0.6)]',
  secondary:
    'border border-mist-300 bg-white text-navy-900 shadow-[0_1px_2px_rgb(11_31_58/0.04)] hover:border-brand-500/40 hover:shadow-lift',
  'ghost-light':
    'border border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40',
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  children: ReactNode
  showArrow?: boolean
  className?: string
  ariaLabel?: string
}

/** Anchor styled as a button, with an arrow that nudges forward on hover. */
export function ButtonLink({
  href,
  variant = 'primary',
  children,
  showArrow = true,
  className = '',
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a href={href} aria-label={ariaLabel} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </a>
  )
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  showArrow?: boolean
}

/** Native button with the same look as ButtonLink. */
export function Button({
  variant = 'primary',
  showArrow = false,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${className}`}
      {...rest}
    >
      {children}
      {showArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </button>
  )
}
