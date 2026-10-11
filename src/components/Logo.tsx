import { site } from '../config/site'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Original Frostline mark: a six-arm snowflake set inside a rounded navy tile,
 * with a wordmark beside it.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light'
  return (
    <a
      href="#home"
      aria-label={`${site.name} home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-9 shrink-0 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:rotate-45"
      >
        <rect width="40" height="40" rx="11" className={isLight ? 'fill-white' : 'fill-navy-900'} />
        <g
          transform="translate(20 20)"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2.2"
          className={isLight ? 'stroke-brand-600' : 'stroke-ice-300'}
        >
          <path d="M0 -11 V11 M-9.5 -5.5 L9.5 5.5 M-9.5 5.5 L9.5 -5.5" />
          <path d="M-3 -8.2 L0 -11 L3 -8.2 M-3 8.2 L0 11 L3 8.2" strokeWidth="1.8" />
          <path d="M-7.5 -2.1 L-9.5 -5.5 L-6.6 -5.2 M7.5 2.1 L9.5 5.5 L6.6 5.2" strokeWidth="1.8" />
          <path d="M-7.5 2.1 L-9.5 5.5 L-6.6 5.2 M7.5 -2.1 L9.5 -5.5 L6.6 -5.2" strokeWidth="1.8" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.05rem] font-bold tracking-tight ${isLight ? 'text-white' : 'text-navy-900'}`}
        >
          {site.shortName}
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold tracking-[0.22em] uppercase ${
            isLight ? 'text-ice-300' : 'text-navy-500'
          }`}
        >
          Cold Storage
        </span>
      </span>
    </a>
  )
}
