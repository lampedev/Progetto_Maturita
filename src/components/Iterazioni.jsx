import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  ClipboardText,
  TrendUp,
  Heartbeat,
  CloudArrowUp,
  CheckCircle,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "MVP + PWA base",
    desc: "Tracking base di serie e ripetizioni. Configurazione iniziale del Service Worker e manifest per l'installabilità.",
    icon: Rocket,
  },
  {
    num: "02",
    title: "Template e cronologia",
    desc: "Schemi riutilizzabili per organizzare gli allenamenti. Prima struttura dati relazionale.",
    icon: ClipboardText,
  },
  {
    num: "03",
    title: "Analytics e 1RM",
    desc: "Calcolo dei massimali teorici e visualizzazione grafica dei progressi nel tempo.",
    icon: TrendUp,
  },
  {
    num: "04",
    title: "Metriche giornaliere",
    desc: "Schema ibrido flat + JSONB per tracciare metriche variabili nel tempo senza alterare la struttura del database.",
    icon: Heartbeat,
  },
  {
    num: "05",
    title: "Cloud sync e auth",
    desc: "Integrazione Supabase per autenticazione OAuth 2.0 e sincronizzazione dati tra dispositivi.",
    icon: CloudArrowUp,
  },
  {
    num: "06",
    title: "PWA completa",
    desc: "Workbox per precaching, strategie di cache avanzate e funzionamento completamente offline.",
    icon: CheckCircle,
  },
];

export default function Iterazioni() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const nodesRef = useRef([]);
  const cardsRef = useRef([]);
  const numsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      tl.to(progressRef.current, {
        scaleY: 1,
        duration: 1,
        ease: "none",
      });

      steps.forEach((_, i) => {
        const card = cardsRef.current[i];
        const node = nodesRef.current[i];
        const num = numsRef.current[i];

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.3,
          },
        })
          .fromTo(
            card,
            { x: -30, opacity: 0, scale: 0.97 },
            { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          )
          .to(
            node,
            {
              boxShadow: "0 0 0 4px rgba(14,165,233,0.15), 0 0 20px rgba(14,165,233,0.3)",
              borderColor: "#0ea5e9",
              backgroundColor: "#ffffff",
              duration: 0.3,
            },
            "<"
          )
          .to(
            num,
            {
              color: "#0ea5e9",
              opacity: 1,
              duration: 0.4,
            },
            "<0.1"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="iterazioni" ref={sectionRef} className="py-32 md:py-40 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={headerRef} className="max-w-[55ch] mb-16">
          <p className="uppercase text-sm tracking-wide text-[#0ea5e9] mb-4">
            Processo di sviluppo
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
            Sei iterazioni dalla MVP alla versione corrente
          </h2>
          <p className="text-base text-zinc-500">
            Il progetto è cresciuto in modo incrementale, con ogni iterazione
            che aggiungeva funzionalità e complessità architetturale.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-zinc-200" />

          <div
            ref={progressRef}
            className="absolute left-6 md:left-8 top-0 w-px origin-top"
            style={{
              height: "100%",
              background: "linear-gradient(to bottom, #0ea5e9, #0284c7)",
              transform: "scaleY(0)",
              boxShadow: "0 0 8px rgba(14,165,233,0.4), 0 0 20px rgba(14,165,233,0.15)",
            }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="relative pl-16 md:pl-24"
                >
                  <div
                    ref={(el) => (nodesRef.current[i] = el)}
                    className="absolute left-0 md:left-0 top-8 w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-50 border-2 border-zinc-200 flex items-center justify-center text-zinc-400 z-10 transition-colors duration-300"
                  >
                    <Icon size={24} weight="duotone" />
                  </div>

                  <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-10">
                    <span
                      ref={(el) => (numsRef.current[i] = el)}
                      className="absolute top-4 right-6 text-7xl md:text-8xl font-bold text-zinc-100 select-none leading-none opacity-40"
                    >
                      {step.num}
                    </span>
                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base text-zinc-500 max-w-[60ch]">
                        {step.desc}
                      </p>
                    </div>
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
