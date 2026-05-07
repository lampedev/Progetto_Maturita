import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WifiSlash, Cloud, Target, ChartBar } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const highlightWords = (text, words) => {
  const parts = text.split(new RegExp(`(${words.join("|")})`, "gi"));
  return parts.map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span
        key={i}
        className="relative inline-block font-semibold text-zinc-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0ea5e9] after:rounded-full"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

const paragraphs = [
  {
    text: 'GymLogPWA nasce dalla frustrazione di dover affidare i propri dati di allenamento a piattaforme commerciali chiuse. Il problema principale non era solo la presenza di abbonamenti o pubblicità, ma soprattutto l\'impossibilità di accedere realmente ai dati generati: molte applicazioni non permettono l\'esportazione completa delle informazioni, non offrono API pubbliche e impediscono qualsiasi elaborazione personalizzata o analisi avanzata locale.',
    highlights: ['piattaforme commerciali chiuse', 'dati', 'API pubbliche']
  },
  {
    text: 'Volevo quindi un tool per tracciare i miei allenamenti senza abbonamenti, senza pubblicità e senza la necessità di cedere informazioni personali a servizi esterni. L\'obiettivo era creare una piattaforma realmente controllabile dall\'utente, con gestione diretta dei dati, sincronizzazione cloud e un\'architettura moderna capace di garantire sicurezza, flessibilità e scalabilità.',
    highlights: ['senza abbonamenti', 'controllabile dall\'utente', 'architettura moderna']
  },
  {
    text: 'Quello che inizialmente era nato come un semplice script personale si è progressivamente trasformato in un progetto completo di ingegneria software. Attraverso lo sviluppo della PWA ho approfondito concetti come cloud computing, autenticazione OAuth 2.0, sicurezza informatica, state management e gestione real-time dei dati.',
    highlights: ['ingegneria software', 'PWA', 'OAuth 2.0']
  },
  {
    text: 'Con il tempo l\'applicazione ha iniziato a diffondersi anche all\'interno della mia palestra, arrivando a essere utilizzata da circa una decina di persone. Questo apre prospettive future molto interessanti: utilizzare i dati raccolti per individuare correlazioni e pattern legati alla performance atletica, come il volume ottimale per la progressione, i tempi di recupero più efficaci, il tasso di miglioramento nel tempo e altri indicatori utili all\'ottimizzazione dell\'allenamento.',
    highlights: ['palestra', 'performance atletica', 'ottimizzazione dell\'allenamento']
  }
];

const cards = [
  {
    icon: Cloud,
    title: "Real-Time Synchronization",
    desc: "Aggiornamento immediato dei dati tra dispositivi grazie alla sincronizzazione cloud in tempo reale.",
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
  {
    icon: Target,
    title: "Athlete-Centered Design",
    desc: "Interfaccia e funzionalità progettate attorno alle esigenze reali di atleti e sportivi avanzati.",
  },
  {
    icon: ChartBar,
    title: "Advanced Data Tracking",
    desc: "Monitoraggio dettagliato di allenamenti, progressioni, carichi, volume e storico performance.",
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
              {paragraphs.map((para, i) => (
                <p key={i} className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-[65ch]">
                  {highlightWords(para.text, para.highlights)}
                </p>
              ))}
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
