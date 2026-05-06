import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const requisitiFunzionali = [
  "Tracciamento workout con serie, ripetizioni e pesi",
  "Template riutilizzabili per schemi di allenamento",
  "Metriche giornaliere (sonno, peso, passi, stress, nutrizione)",
  "Calcolo progressi 1RM e grafici di andamento",
  "Cronologia esercizi con paginazione",
  "Condivisione workout tramite token univoco",
  "Installabilità come PWA",
];

const requisitiNonFunzionali = [
  "Offline-first con sincronizzazione cloud",
  "Responsive design ottimizzato per mobile",
  "Performance < 3s First Contentful Paint",
  "Sicurezza: autenticazione, autorizzazione, HTTPS",
  "Zero costo infrastruttura",
];

const vincoli = [
  "Nessun backend self-hosted",
  "Dati utente isolati e non condivisibili tra account",
  "Stack tecnologico moderno ma stabile",
  "Documentazione e iterazioni tracciabili",
];

function SpotlightCard({ title, items, className = "", cardRef }) {
  const cardInnerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardInnerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div ref={cardRef} className={className}>
      <div
        ref={cardInnerRef}
        onMouseMove={handleMouseMove}
        className="group relative rounded-[2.5rem] bg-zinc-950/5 border border-zinc-200/60 p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-[#0ea5e9]/30 hover:shadow-[0_0_60px_-15px_rgba(14,165,233,0.15)]"
      >
        {/* Animated spotlight border */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x,0px) var(--mouse-y,0px), rgba(14,165,233,0.35), transparent 40%)",
          }}
        />
        {/* Inner content */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-zinc-900 mb-6">{title}</h3>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shadow-[0_0_6px_rgba(14,165,233,0.6)]" />
                <span className="text-base text-zinc-500">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Requisiti() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[0]?.parentElement,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="requisiti" ref={sectionRef} className="py-32 md:py-40 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={headerRef} className="max-w-[55ch] mb-16">
          <p className="uppercase text-sm tracking-wide text-[#0ea5e9] mb-4">
            Analisi
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
            Requisiti funzionali e non funzionali
          </h2>
          <p className="text-base text-zinc-500">
            Il progetto è stato sviluppato seguendo un&apos;analisi dei
            requisiti che ha guidato ogni scelta architetturale e tecnologica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard
            title="Requisiti funzionali"
            items={requisitiFunzionali}
            className="md:col-span-2"
            cardRef={(el) => (cardsRef.current[0] = el)}
          />
          <SpotlightCard
            title="Requisiti non funzionali"
            items={requisitiNonFunzionali}
            className="md:col-span-1"
            cardRef={(el) => (cardsRef.current[1] = el)}
          />
          <SpotlightCard
            title="Vincoli"
            items={vincoli}
            className="md:col-span-1"
            cardRef={(el) => (cardsRef.current[2] = el)}
          />
        </div>
      </div>
    </section>
  );
}
