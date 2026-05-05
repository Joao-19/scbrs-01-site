import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl2 bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-glow transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      {...props}
    />
  )
}
