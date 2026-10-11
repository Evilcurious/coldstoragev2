import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', id }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <Reveal>
        <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="section-title mt-5">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="section-lead mt-5">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
