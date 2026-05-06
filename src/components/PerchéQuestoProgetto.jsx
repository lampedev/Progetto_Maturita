import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Barbell, WifiSlash, Cloud } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Barbell,
    title: "Privacy by design",
    desc: "I dati restano di proprietà dell'utente. Autenticazione OAuth 2.0 e isolamento a livello di riga nel database.",
  },
  {
    icon: WifiSlash,
    title: "Offline-first",
    desc: "La PWA funziona senza connessione. Il Service Worker gestisce cache e sincronizzazione trasparente.",
  },
  {
    icon: Cloud,
    title: "Architettura cloud",
    desc: "Nessun server da gestire. Frontend su Netlify (PaaS), backend su Supabase (BaaS).",
  },
];

export default function PerchéQuestoProgetto() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
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

  const keywords = [
    "PWA",
    "OAuth 2.0",
    "Supabase",
    "Netlify",
    "PostgreSQL",
    "React Query",
  ];

  return (
    <section id="origine" ref={sectionRef} className="py-32 md:py-40 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p
              ref={labelRef}
              className="uppercase text-sm tracking-wide text-[#0ea5e9] mb-4"
            >
              Origine del progetto
            </p>
            <h2
              ref={titleRef}
              className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] text-zinc-900 mb-8"
            >
              Da un&apos;esigenza personale a un progetto di maturità
            </h2>
            <div ref={textRef} className="space-y-5">
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-[65ch]">
                GymLogPWA nasce dalla frustrazione di dover cedere i propri dati
                a app commerciali. Volevo un tool per tracciare i miei
                allenamenti senza abbonamenti, senza pubblicità, senza vendere
                informazioni personali.
              </p>
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-[65ch]">
                Quello che è iniziato come uno script personale è diventato
                un&apos;occasione per esplorare l&apos;architettura moderna del
                web: PWA, cloud computing, sicurezza informatica e state
                management.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {keywords.map((k) => (
                <span
                  key={k}
                  className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-medium text-zinc-600 shadow-sm"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="rounded-[2.5rem] bg-white border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-10 flex items-start gap-5"
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                    <Icon size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-base text-zinc-500 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
