import { useMemo } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from 'react'

type UiverseButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'dark'
  }
>

type CircleSpec = {
  id: number
  tone: 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'
  style: CSSProperties
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min

export function UiverseButton({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}: UiverseButtonProps) {
  const circles = useMemo<CircleSpec[]>(() => {
    const tones: CircleSpec['tone'][] = ['tone-1', 'tone-2', 'tone-3', 'tone-4']

    return Array.from({ length: 12 }, (_, id) => {
      const sx = rand(-22, 98)
      const sy = rand(-38, 28)
      const mx = sx + rand(-44, 44)
      const my = sy + rand(-52, 52)
      const ex = sx + rand(-56, 56)
      const ey = sy + rand(-62, 62)

      const style = {
        '--sx': `${sx.toFixed(1)}px`,
        '--sy': `${sy.toFixed(1)}px`,
        '--mx': `${mx.toFixed(1)}px`,
        '--my': `${my.toFixed(1)}px`,
        '--ex': `${ex.toFixed(1)}px`,
        '--ey': `${ey.toFixed(1)}px`,
        '--blur': `${rand(8, 16).toFixed(1)}px`,
        '--size': `${rand(34, 48).toFixed(1)}px`,
        '--duration-local': `${rand(4.8, 8.4).toFixed(2)}s`,
        '--delay-local': `${(-rand(0.2, 6.8)).toFixed(2)}s`,
      } as CSSProperties

      return {
        id,
        tone: tones[id % tones.length],
        style,
      }
    })
  }, [])

  const variantClass = variant === 'dark' ? 'uiverse-recruit-dark' : 'uiverse-recruit-primary'

  return (
    <button type={type} className={`uiverse-recruit ${variantClass} ${className}`.trim()} {...props}>
      <span className="uiverse-recruit-overlay" />
      <span className="uiverse-recruit-wrapper">
        <span className="uiverse-recruit-text">{children}</span>
        {circles.map((circle) => (
          <span
            key={circle.id}
            className={`uiverse-recruit-circle ${circle.tone}`}
            style={circle.style}
          />
        ))}
      </span>
    </button>
  )
}
