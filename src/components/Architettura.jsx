import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Database, CloudArrowDown } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const ArrowDivider = () => (
  <div className="flex flex-col items-center py-3">
    <div className="w-px h-6 bg-zinc-300" />
    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-zinc-300" />
  </div>
);

export default function Architettura() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const diagramRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      gsap.from(diagramRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: Globe,
      title: "Netlify (PaaS)",
      desc: "Platform as a Service per il deploy del frontend. Build automatica, CDN globale, HTTPS gestito. Lo sviluppatore consegna solo il codice.",
    },
    {
      icon: Database,
      title: "Supabase (BaaS)",
      desc: "Backend as a Service che fornisce PostgreSQL gestito, API REST automatiche, autenticazione e Row Level Security.",
    },
    {
      icon: CloudArrowDown,
      title: "PWA Thick Client",
      desc: "Il Service Worker trasforma il browser in un thick client che funziona offline, con cache persistente di asset e dati.",
    },
  ];

  return (
    <section id="architettura" ref={sectionRef} className="py-32 md:py-40 max-w-[1400px] mx-auto px-6">
      <div ref={headerRef} className="mb-16 md:mb-24">
        <span className="block uppercase text-sm tracking-wide text-accent-dark mb-4">
          Architettura di sistema
        </span>
        <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
          Architettura n-tier: dal client al database
        </h2>
        <p className="text-base text-zinc-500 max-w-[55ch]">
          Il progetto implementa un&apos;architettura distribuita su più livelli, che separa responsabilità e garantisce scalabilità, sicurezza e manutenibilità.
        </p>
      </div>

      <div
        ref={diagramRef}
        className="rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 p-8 md:p-12 mb-16"
      >
        {/* Client Layer */}
        <div className="rounded-3xl border-2 border-sky-200 bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-4 text-center">
            Livello Client
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-center text-sm font-medium text-zinc-800">
              Browser / React SPA
            </div>
            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-center text-sm font-medium text-zinc-800">
              Service Worker (Workbox)
            </div>
            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-center text-sm font-medium text-zinc-800">
              localStorage (offline cache, auth)
            </div>
          </div>
        </div>

        <ArrowDivider />

        {/* Edge Layer */}
        <div className="rounded-3xl bg-zinc-100 p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 text-center">
            Livello Edge / CDN
          </div>
          <div className="flex justify-center">
            <div className="rounded-2xl bg-white border border-zinc-200 px-8 py-4 text-sm font-medium text-zinc-800">
              Netlify CDN
            </div>
          </div>
        </div>

        <ArrowDivider />

        {/* Backend Layer */}
        <div className="rounded-3xl bg-zinc-800 p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 text-center">
            Livello Backend / BaaS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-zinc-700/50 border border-zinc-600 p-4 text-center">
              <div className="text-sm font-medium text-zinc-100">Auth Service</div>
              <div className="text-xs text-zinc-400 mt-1">OAuth 2.0, JWT, PKCE</div>
            </div>
            <div className="rounded-2xl bg-zinc-700/50 border border-zinc-600 p-4 text-center">
              <div className="text-sm font-medium text-zinc-100">PostgREST API</div>
              <div className="text-xs text-zinc-400 mt-1">REST + RPC</div>
            </div>
            <div className="rounded-2xl bg-zinc-700/50 border border-zinc-600 p-4 text-center">
              <div className="text-sm font-medium text-zinc-100">PostgreSQL Database</div>
              <div className="text-xs text-zinc-400 mt-1">RLS Policies, JSONB, Triggers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="rounded-[2.5rem] bg-white border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6">
              <card.icon size={24} weight="duotone" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 mb-3">{card.title}</h3>
            <p className="text-base text-zinc-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
