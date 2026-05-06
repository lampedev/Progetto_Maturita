import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technicalSkills = [
  'PWA: Service Worker, Workbox, manifest, installabilità',
  'OAuth 2.0 + PKCE: flusso di autenticazione sicuro in SPA',
  'PostgreSQL: JSONB, RLS, trigger, CHECK constraints',
  'React Query: caching, deduplicazione, stale-while-revalidate, persistenza',
  'TypeScript: type safety, inference, generic types',
];

const softSkills = [
  'Project management: iterazioni, prioritizzazione, scope management',
  'Documentazione: scrivere specifiche chiare per sé stessi e per la commissione',
  'Debugging sistemico: isolare problemi tra frontend, cache, rete e database',
  'User experience: progettare per un contesto d\'uso reale (palestra, mani sudate)',
];

const reflections = [
  'I concetti di PaaS e BaaS non sono più astrazioni: Netlify e Supabase sono servizi concreti che ho configurato e usato.',
  'La triade CIA non è un elenco da memorizzare: ogni lettera corrisponde a una scelta tecnica (HTTPS, RLS, CDN).',
  'L\'architettura n-tier si traduce in directory, file e chiamate API. La teoria guida le decisioni, ma il codice le materializza.',
];

function GlassCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glass-card rounded-[2.5rem] p-8 md:p-10 transition-all duration-500"
    >
      {children}
    </div>
  );
}

export default function CosaHoImparato() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.learn-heading > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.learn-heading',
          start: 'top 80%',
        },
      });
      gsap.from('.learn-area', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.learn-areas',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="apprendimento" ref={sectionRef} className="py-32 md:py-40 relative overflow-hidden">
      <div className="glass-bg absolute inset-0" />
      <div className="glass-orb glass-orb--1" />
      <div className="glass-orb glass-orb--2" />
      <div className="glass-orb glass-orb--3" />

      <div className="relative z-10 max-w-wrapper mx-auto px-6">
        <div className="learn-heading mb-16 md:mb-24">
          <p className="text-sm font-medium text-accent-dark tracking-wide uppercase mb-4">
            Apprendimento
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6 md:max-w-[70%]">
            Cosa ho imparato sviluppando GymLogPWA
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            Questo progetto non è stato solo un esercizio di programmazione, ma un percorso che ha colmato il divario tra teoria e pratica.
          </p>
        </div>

        <div className="learn-areas grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="learn-area">
            <h3 className="text-lg font-semibold text-zinc-900 mb-5">
              Competenze tecniche acquisite
            </h3>
            <GlassCard>
              <ul className="space-y-4">
                {technicalSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="learn-area">
            <h3 className="text-lg font-semibold text-zinc-900 mb-5">
              Competenze trasversali
            </h3>
            <GlassCard>
              <ul className="space-y-4">
                {softSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="learn-area">
            <h3 className="text-lg font-semibold text-zinc-900 mb-5">
              Dal libro al codice
            </h3>
            <GlassCard>
              <ul className="space-y-5">
                {reflections.map((item, i) => (
                  <li key={i} className="text-sm text-zinc-700 leading-relaxed border-l-2 border-accent/30 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
