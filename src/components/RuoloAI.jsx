import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Robot, Lightbulb, Prohibit } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  {
    num: 1,
    icon: Robot,
    title: "Come l'AI ha aiutato",
    color: '#38bdf8',
    items: [
      { label: 'GSAP animations', text: "Gli elementi restavano con opacity 0. L'AI ha identificato il problema con React StrictMode e suggerito gsap.fromTo()." },
      { label: 'Row Level Security', text: "Non sapevo come funzionasse RLS. L'AI ha spiegato auth.uid() e come filtrare le righe per utente." },
      { label: 'OAuth 2.0 + PKCE', text: "Flusso auth confuso. L'AI ha spiegato code_verifier e code_challenge." },
      { label: 'TypeScript generics', text: "Tipi complessi per React Query. L'AI ha suggerito la struttura corretta per i generic types." },
      { label: 'Tailwind responsive', text: "Layout mobile-first con breakpoint. L'AI ha aiutato a combinare grid e flex." },
    ],
  },
  {
    num: 2,
    icon: Lightbulb,
    title: 'Cosa ho imparato',
    color: '#4ade80',
    items: [
      { label: 'Domande precise', text: 'Non basta "non funziona". Specificare file, riga, errore, cosa ho già provato.' },
      { label: 'Verificare tutto', text: "L'AI può sbagliare. Ho imparato a testare ogni suggerimento prima di applicarlo." },
      { label: 'Documentare', text: 'Scrivere commenti e README durante lo sviluppo aiuta a ricordare le decisioni.' },
      { label: 'Dividere i problemi', text: 'Invece di "come faccio l\'app", dividere in sotto-problemi: auth, db, UI.' },
    ],
  },
  {
    num: 3,
    icon: Prohibit,
    title: "Cosa l'AI non può fare",
    color: '#fb923c',
    items: [
      { label: 'Decisioni', text: "Scegliere Supabase vs Firebase richiede contesto: scuola, tempo, obiettivi." },
      { label: 'Contesto reale', text: "L'app in palestra con mani sudate. Solo testandola ho capito i limiti." },
      { label: 'Creatività', text: 'Design bento grid, glassmorphism, colori: decisioni creative non sostituibili.' },
      { label: 'Responsabilità', text: "Il codice finale è mio. L'AI è uno strumento, la responsabilità è dello sviluppatore." },
    ],
  },
];

function AnimatedCounter({ target, color, trigger }) {
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return;

    const anim = gsap.to(
      { val: 0 },
      {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 85%',
          once: true,
        },
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(this.targets()[0].val)).padStart(2, '0');
          }
        },
        onComplete: () => setHasAnimated(true),
      }
    );

    return () => anim.kill();
  }, [target, trigger, hasAnimated]);

  return (
    <div className="relative">
      <span
        ref={counterRef}
        className="font-mono text-6xl md:text-7xl font-bold leading-none relative z-10"
        style={{ color: color, opacity: 0.6, textShadow: `0 0 80px ${color}80, 0 0 120px ${color}40` }}
      >
        00
      </span>
      <div
        className="absolute inset-0 blur-3xl opacity-30"
        style={{ background: color }}
      />
    </div>
  );
}

function GlowLine({ color, trigger }) {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, [trigger]);

  return (
    <div
      ref={lineRef}
      className="h-px origin-left"
      style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
    />
  );
}

function GlassOrb({ color, size, top, left, delay }) {
  const orbRef = useRef(null);

  useEffect(() => {
    if (!orbRef.current) return;

    gsap.to(orbRef.current, {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      scale: 'random(0.8, 1.2)',
      duration: 'random(8, 12)',
      ease: 'none',
      repeat: -1,
      yoyo: true,
      delay: delay,
    });
  }, [delay]);

  return (
    <div
      ref={orbRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        background: `radial-gradient(circle, ${color}30 0%, ${color}10 40%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
    />
  );
}

export default function RuoloAI() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const blocksRef = useRef([]);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ai-heading > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ai-heading',
          start: 'top 80%',
        },
      });

      blocksRef.current.forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            once: true,
          },
        });
      });

      const allItems = document.querySelectorAll('.ai-item');
      allItems.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ai" ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Animated glowing orbs */}
      <GlassOrb color="#38bdf8" size="400px" top="-100px" left="-100px" delay={0} />
      <GlassOrb color="#4ade80" size="300px" top="40%" right="-50px" delay={2} />
      <GlassOrb color="#fb923c" size="350px" bottom="-100px" left="30%" delay={4} />
      <GlassOrb color="#a78bfa" size="250px" top="20%" right="20%" delay={6} />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Main glass container */}
      <div className="relative z-10 max-w-wrapper mx-auto px-6">
        <div className="ai-heading mb-16 md:mb-20">
          <p className="text-sm font-medium tracking-wide uppercase mb-4" style={{ color: '#38bdf8' }}>
            Intelligenza Artificiale
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-white mb-6">
            Il ruolo dell'AI nello sviluppo
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-[55ch]">
            L'AI non ha scritto il codice al posto mio, ma è stata un
            acceleratore di apprendimento. Ogni risposta è stata un'occasione
            per capire il "perché" dietro il "come".
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          {blocks.map((block, blockIndex) => {
            const Icon = block.icon;
            return (
              <div
                key={block.title}
                ref={(el) => (blocksRef.current[blockIndex] = el)}
                className="relative"
              >
                {/* Glass card for each block */}
                <div
                  className="rounded-3xl p-6 md:p-8 border transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: `0 0 60px -20px ${block.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                  }}
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <div className="hidden md:flex flex-col items-center shrink-0 w-20">
                      <AnimatedCounter
                        target={block.num}
                        color={block.color}
                        trigger={blocksRef.current[blockIndex]}
                      />
                      <div
                        className="mt-3 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${block.color}15`,
                          color: block.color,
                          boxShadow: `0 0 20px ${block.color}20`,
                        }}
                      >
                        <Icon size={20} weight="fill" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 md:hidden">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${block.color}15`, color: block.color }}>
                          <Icon size={16} weight="fill" />
                        </div>
                        <span className="font-mono text-2xl font-bold" style={{ color: block.color, opacity: 0.4 }}>
                          {String(block.num).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-1">
                        {block.title}
                      </h3>

                      <GlowLine color={block.color} trigger={blocksRef.current[blockIndex]} />

                      <div className="mt-6 space-y-0">
                        {block.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="ai-item group flex items-start gap-4 py-4 border-b border-white/[0.06] last:border-0 transition-all duration-300 hover:pl-2"
                          >
                            <span
                              className="font-mono text-sm font-bold shrink-0 mt-0.5 transition-colors duration-300"
                              style={{ color: block.color, opacity: 0.5 }}
                            >
                              {String(itemIndex + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300">
                                {item.label}
                              </span>
                              <p className="text-sm text-zinc-500 leading-relaxed mt-1 group-hover:text-zinc-400 transition-colors duration-300">
                                {item.text}
                              </p>
                            </div>
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: block.color, boxShadow: `0 0 10px ${block.color}` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {blockIndex < blocks.length - 1 && (
                  <div className="mt-16 md:mt-20 flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <div className="w-2 h-2 rounded-full" style={{ background: blocks[blockIndex + 1].color, opacity: 0.3 }} />
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
