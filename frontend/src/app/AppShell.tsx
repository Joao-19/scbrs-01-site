import { useEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '../components/ui/Section'
import { UiverseButton } from '../components/ui/UiverseButton'
import { landingContent } from '../content/landingContent'
import { revealUp, staggerParent, glitchReveal } from '../lib/motion'
import { useLenis } from '../lib/useLenis'

gsap.registerPlugin(ScrollTrigger)

const base = import.meta.env.BASE_URL
const recruitmentBgVideo = `${base}media/magnific_estacao-espacial-futurist_2925615992%20(1).mp4`

export function AppShell() {
  const lenisRef = useLenis()
  const rootRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll()
  const baseOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])
  const phaseOneOpacity = useTransform(scrollYProgress, [0, 0.16, 0.4], [1, 0.78, 0.24])
  const phaseTwoOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0.14, 0.92, 0.42])
  const phaseThreeOpacity = useTransform(scrollYProgress, [0.55, 0.82, 1], [0.1, 0.78, 1])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.1, 0.06])

  useEffect(() => {
    document.documentElement.style.cursor = `url('${base}mouse-icon.png') 0 0, auto`
    return () => { document.documentElement.style.cursor = '' }
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (reduceMotion || isMobile) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -40 - i * 14,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    const sectionIds = ['hero', 'sobre', 'divisoes', 'historia', 'recrutamento'] as const
    let wheelLocked = false
    let wheelAccumulator = 0
    let unlockTimer = 0

    const getExactTop = (element: HTMLElement, offset = 12) =>
      Math.max(0, Math.round(window.scrollY + element.getBoundingClientRect().top - offset))

    const snapToSection = (direction: 1 | -1) => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)

      if (sections.length < 2) return false

      const anchor = window.scrollY + window.innerHeight * 0.42
      let activeIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section, index) => {
        const distance = Math.abs(section.offsetTop - anchor)
        if (distance < nearestDistance) {
          nearestDistance = distance
          activeIndex = index
        }
      })

      const targetIndex = Math.max(0, Math.min(sections.length - 1, activeIndex + direction))
      if (targetIndex === activeIndex) return false

      const targetTop = getExactTop(sections[targetIndex])
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 0.9, lock: true, force: true })
      } else {
        window.scrollTo({ top: targetTop, behavior: 'smooth' })
      }
      return true
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (wheelLocked) return
      if (Math.abs(event.deltaY) < 2) return

      wheelAccumulator += event.deltaY
      if (Math.abs(wheelAccumulator) < 40) return

      const direction: 1 | -1 = wheelAccumulator > 0 ? 1 : -1
      const moved = snapToSection(direction)
      wheelAccumulator = 0
      if (!moved) return

      wheelLocked = true
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => {
        wheelLocked = false
      }, 1100)
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, true)
      window.clearTimeout(unlockTimer)
    }
  }, [lenisRef])

  const handleSurfacePointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    element.style.setProperty('--mx', `${x.toFixed(1)}px`)
    element.style.setProperty('--my', `${y.toFixed(1)}px`)
  }

  const handleSurfacePointerLeave = (event: ReactMouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${(bounds.width * 0.5).toFixed(1)}px`)
    element.style.setProperty('--my', `${(bounds.height * 0.5).toFixed(1)}px`)
  }

  const handlePilaresPointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    const xRatio = (event.clientX - bounds.left) / bounds.width
    const yRatio = (event.clientY - bounds.top) / bounds.height
    const rx = (xRatio - 0.5) * 2
    const ry = (yRatio - 0.5) * 2
    element.style.setProperty('--rx', rx.toFixed(4))
    element.style.setProperty('--ry', ry.toFixed(4))
  }

  const handlePilaresPointerLeave = (event: ReactMouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    element.style.setProperty('--rx', '0')
    element.style.setProperty('--ry', '0')
  }

  const handleHistoriaPointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    handleSurfacePointerMove(event)
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    const rx = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const ry = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    element.style.setProperty('--rx', rx.toFixed(4))
    element.style.setProperty('--ry', ry.toFixed(4))
  }

  const handleHistoriaPointerLeave = (event: ReactMouseEvent<HTMLElement>) => {
    handleSurfacePointerLeave(event)
    const element = event.currentTarget
    element.style.setProperty('--rx', '0')
    element.style.setProperty('--ry', '0')
  }

  const scrollToSection = (sectionId: 'sobre' | 'recrutamento') => {
    const target = document.getElementById(sectionId)
    if (!target) return

    const targetTop = Math.max(0, Math.round(window.scrollY + target.getBoundingClientRect().top - 12))
    const lenis = lenisRef.current

    if (lenis) {
      lenis.scrollTo(targetTop, { duration: 0.95, lock: true, force: true })
      return
    }

    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  return (
    <main ref={rootRef} className="relative overflow-x-hidden text-text">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center px-6 py-4 md:px-10">
        <img src={`${base}site-logo.png`} alt="SCBRS-01" className="h-10 w-auto drop-shadow-[0_0_8px_rgba(91,231,255,0.4)]" />
      </header>

      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ opacity: baseOpacity }}>
        <div className="absolute inset-0 bg-[#06090f]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
          style={{ opacity: gridOpacity }}
        />
        <motion.div className="absolute inset-0" style={{ opacity: phaseOneOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,231,255,0.34),transparent_36%),radial-gradient(circle_at_78%_24%,rgba(123,140,255,0.38),transparent_44%)]" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: phaseTwoOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(123,140,255,0.44),transparent_40%),radial-gradient(circle_at_28%_72%,rgba(91,231,255,0.28),transparent_46%)]" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: phaseThreeOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_72%,rgba(255,184,107,0.34),transparent_42%),radial-gradient(circle_at_80%_82%,rgba(91,231,255,0.26),transparent_46%)]" />
        </motion.div>
      </motion.div>

      <div aria-hidden className="nebula-drift pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -9 }}>
        <div className="nebula-cloud nebula-cyan" />
        <div className="nebula-cloud nebula-indigo" />
        <div className="nebula-cloud nebula-amber" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[rgba(6,9,15,0.44)] backdrop-blur-[2px]"
        style={{ zIndex: -8 }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div data-parallax className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-primary/25 blur-[95px]" />
        <div data-parallax className="absolute right-0 top-[30rem] h-80 w-80 rounded-full bg-indigo-500/25 blur-[100px]" />
        <div data-parallax className="absolute left-1/3 top-[70rem] h-64 w-64 rounded-full bg-amber-300/15 blur-[90px]" />
      </div>

      <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-28 md:items-end md:pb-28 md:pt-28 md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-32 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]">
          <video className="h-full w-full object-cover" src={`${base}media/untitled.mp4`} autoPlay muted loop playsInline preload="metadata" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(28,128,214,0.18),transparent_42%),radial-gradient(circle_at_24%_30%,rgba(18,150,178,0.12),transparent_42%)]" />

        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="relative mx-auto w-full max-w-6xl">
          <motion.p className="font-mono text-xs uppercase tracking-[0.24em] text-primary" variants={revealUp}>
            {landingContent.hero.tag}
          </motion.p>
          <motion.h1 className="mt-5 max-w-5xl font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl" variants={revealUp}>
            {landingContent.hero.title}
          </motion.h1>
          <motion.p className="mt-7 max-w-2xl text-base text-muted md:text-xl" variants={revealUp}>
            {landingContent.hero.description}
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-4" variants={revealUp}>
            <UiverseButton variant="dark" onClick={() => scrollToSection('recrutamento')}>
              {landingContent.hero.primaryCta}
            </UiverseButton>
            <UiverseButton variant="primary" onClick={() => scrollToSection('sobre')}>
              {landingContent.hero.secondaryCta}
            </UiverseButton>
          </motion.div>
          <motion.div variants={revealUp} className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="h-px w-20 bg-primary/90" />
          </motion.div>
        </motion.div>
      </section>

      <Section id="sobre" className="-mt-10 pt-16">
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p variants={revealUp} className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{landingContent.sobre.tag}</motion.p>
          <motion.h2 variants={revealUp} className="mt-3 font-display text-3xl md:text-5xl">{landingContent.sobre.title}</motion.h2>
          <motion.p variants={revealUp} className="mt-2 text-sm uppercase tracking-widest text-muted">{landingContent.sobre.subtitle}</motion.p>
          <motion.p variants={revealUp} className="mt-8 max-w-4xl border-l-2 border-primary/45 pl-6 text-lg leading-relaxed text-muted">{landingContent.sobre.description}</motion.p>
          <motion.div variants={staggerParent} className="mt-10 grid gap-4 md:grid-cols-3">
            {landingContent.sobre.stats.map((item) => (
              <motion.div
                key={item.label}
                variants={revealUp}
                className="stats-card rsi-hover-surface rounded-2xl border border-white/15 px-5 py-5 md:py-6"
                onMouseMove={handleSurfacePointerMove}
                onMouseLeave={handleSurfacePointerLeave}
              >
                <p className="font-display text-4xl text-text">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="divisoes" className="-mt-14 pt-3 md:-mt-20 md:pt-4">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="pilares-parallax relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8"
          onMouseMove={handlePilaresPointerMove}
          onMouseLeave={handlePilaresPointerLeave}
        >
          <div
            className="pilares-bg-base pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                `linear-gradient(180deg, rgba(4,8,18,0.56) 0%, rgba(5,10,20,0.76) 100%), url('${base}media/rsi/cyberpunk-bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <img
            src={`${base}media/rsi/cyberpunk-decors.png`}
            alt=""
            aria-hidden
            className="pilares-bg-decors pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={`${base}media/rsi/cyberpunk-character.png`}
            alt=""
            aria-hidden
            className="pilares-bg-character pointer-events-none absolute inset-0 h-full w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(103,161,255,0.2),transparent_42%),radial-gradient(circle_at_16%_72%,rgba(93,223,255,0.18),transparent_44%)]" />

          <div className="relative">
            <motion.p variants={revealUp} className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{landingContent.divisoes.tag}</motion.p>
            <motion.h3 variants={revealUp} className="mt-3 font-display text-3xl md:text-4xl">{landingContent.divisoes.title}</motion.h3>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {landingContent.divisoes.items.map((item) => (
                <motion.article
                  key={item.title}
                  variants={glitchReveal}
                  className="division-card rsi-hover-surface relative flex min-h-[168px] flex-col justify-start overflow-hidden rounded-2xl border border-white/15 px-6 py-6 pl-8 md:min-h-[142px]"
                  onMouseMove={handleSurfacePointerMove}
                  onMouseLeave={handleSurfacePointerLeave}
                >
                  <h4 className="font-display text-2xl">{item.title}</h4>
                  <p className="mt-3 text-muted">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="historia" className="pt-8">
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p variants={revealUp} className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{landingContent.historia.tag}</motion.p>
          <motion.h3 variants={revealUp} className="mt-3 font-display text-3xl md:text-4xl">{landingContent.historia.title}</motion.h3>
          <motion.div
            variants={revealUp}
            className="rsi-hover-surface relative mt-8 h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-surface/40 md:h-[360px]"
            onMouseMove={handleHistoriaPointerMove}
            onMouseLeave={handleHistoriaPointerLeave}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover object-[center_60%] blur-[2px]"
              src={`${base}media/YTDown_YouTube_Space-Earth-Panorama-Background-4K-VJ-Lo_Media_fHjPz0SmZBE_001_1080p.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,17,0.18)_0%,rgba(4,9,17,0.42)_100%)]" />
            <img
              src={`${base}media/magnific_mantenha-totalmente-a-ima_2952736838.png`}
              alt=""
              aria-hidden
              className="historia-station pointer-events-none absolute inset-0 h-full w-full object-contain object-left"
            />
          </motion.div>

          <div className="mt-8 space-y-6">
            {landingContent.historia.paragraphs.map((paragraph) => (
              <div>
                <motion.p key={paragraph.slice(0, 24)} variants={revealUp} className="max-w-4xl text-muted">
                  {paragraph}
                </motion.p>

                {paragraph === landingContent.historia.paragraphs[2] && (
                  <motion.blockquote
                    variants={revealUp}
                    className="rsi-hover-surface mt-4 max-w-4xl border-l-2 border-primary/60 bg-surface/40 px-5 py-4 italic text-text"
                    onMouseMove={handleSurfacePointerMove}
                    onMouseLeave={handleSurfacePointerLeave}
                  >
                    {landingContent.historia.quote}
                  </motion.blockquote>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      <div className="relative overflow-hidden">
        <Section id="recrutamento" className="relative pb-20 pt-10">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rsi-hover-surface relative overflow-hidden rounded-3xl border border-primary/30 p-8 text-center shadow-glow"
            onMouseMove={handleSurfacePointerMove}
            onMouseLeave={handleSurfacePointerLeave}
          >
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom object-[center_82.8%]"
              src={recruitmentBgVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,17,0.48)_0%,rgba(4,9,17,0.62)_100%)]" />
            <div className="relative z-10">
              <p className="font-mono text-xs uppercase tracking-[0.6em] text-primary">{landingContent.recrutamento.tag}</p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <h3 className="font-display text-3xl md:text-5xl">{landingContent.recrutamento.title}</h3>
                <img src={`${base}site-logo.png`} alt="" aria-hidden className="h-12 w-auto drop-shadow-[0_0_10px_rgba(91,231,255,0.5)] md:h-16" />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-muted">{landingContent.recrutamento.description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href={landingContent.recrutamento.discordUrl} target="_blank" rel="noreferrer" className="rounded-xl2 bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-glow transition-transform hover:-translate-y-0.5">
                  {landingContent.recrutamento.discordCta}
                </a>
                <a href={landingContent.recrutamento.rsiUrl} target="_blank" rel="noreferrer" className="rounded-xl2 border border-white/20 bg-surface px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-text transition-colors hover:border-primary/60">
                  {landingContent.recrutamento.rsiCta}
                </a>
              </div>
            </div>
          </motion.div>
        </Section>

        <footer className="relative border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted md:flex-row md:px-10">
            <p>{landingContent.footer.brand} © {new Date().getFullYear()}</p>
            <p>{landingContent.footer.legal}</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
