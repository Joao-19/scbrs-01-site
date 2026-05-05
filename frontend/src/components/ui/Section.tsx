import type { PropsWithChildren } from 'react'
import { Container } from './Container'

type SectionProps = PropsWithChildren<{
  id?: string
  className?: string
}>

export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
