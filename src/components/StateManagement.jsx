import { useEffect, useRef } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const levels = [
  {
    label: "Livello 1",
    title: "Server State",
    tool: "React Query",
    bg: "bg-accent/10",
    border: "border-accent/20",
    items: [
      "Cache automatica con staleTime configurato",
      "Deduplicazione richieste",
      "Persistenza su localStorage",
      "Background refetch disabilitato",
    ],
  },
  {
    label: "Livello 2",
    title: "Global Client State",
    tool: "React Context",
    bg: "bg-zinc-500/10",
    border: "border-zinc-200",
    items: [
      "Theme (light/dark)",
      "Debug mode",
      "PWA install prompt",
      "Custom keyboard state",
    ],
  },
  {
    label: "Livello 3",
    title: "Local State + localStorage",
    tool: "Hooks + Storage API",
    bg: "bg-zinc-500/50",
    border: "border-zinc-300",
    items: [
      "Form attivi (workout in corso)",
      "Coda sync metriche",
      "Cache metriche locali",
      "Preferenze utente",
      "Current workout state",
    ],
  },
];

export default function StateManagement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".state-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".state-heading",
          start: "top 80%",
        },
      });

      gsap.from(".state-level", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".state-diagram",
          start: "top 80%",
        },
      });

      gsap.from(".state-table", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".state-table",
          start: "top 85%",
        },
      });

      gsap.from(".state-final-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".state-final-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stato" ref={sectionRef} className="py-32 md:py-40 bg-white">
      <div className="max-w-wrapper mx-auto px-6">
        <div className="state-heading mb-16 md:mb-24 md:pr-[20vw]">
          <p className="text-sm font-medium text-accent-dark tracking-wide uppercase mb-4">
            Gestione dello stato
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
            Tre livelli di stato per tre tipologie di dati
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            La gestione dello stato è stata uno degli aspetti più critici del
            progetto. Non esiste una soluzione unica: ogni tipo di dato
            richiede un approccio diverso.
          </p>
        </div>

        <div className="state-diagram grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {levels.map((lvl, i) => (
            <div
              key={i}
              className={`state-level relative flex flex-col rounded-[2.5rem] border ${lvl.bg} ${lvl.border} p-8 md:p-10`}
            >
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
                  {lvl.label}
                </span>
                <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-1">
                  {lvl.title}
                </h3>
                <span className="text-sm font-medium text-accent-dark">
                  {lvl.tool}
                </span>
              </div>
              <ul className="space-y-3">
                {lvl.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-zinc-700"
                  >
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-accent-dark mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
