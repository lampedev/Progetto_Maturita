import { useEffect, useRef } from "react";
import {
  Code,
  PaintBrush,
  Database,
  ArrowsClockwise,
  Globe,
  Wrench,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento from "./MagicBento";
import "./MagicBento.css";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  {
    icon: <Code size={24} weight="fill" />,
    label: "Frontend",
    title: "React + TypeScript + Vite",
    description:
      "React per il component model dichiarativo. TypeScript per il type safety a compile time. Vite per il dev server istantaneo e il bundling ottimizzato.",
    className: "col-span-2",
  },
  {
    icon: <PaintBrush size={24} weight="fill" />,
    label: "Styling",
    title: "Tailwind CSS + shadcn/ui",
    description:
      "Utility-first CSS per sviluppo rapido. shadcn per componenti accessibili e personalizzabili senza dipendenze di libreria.",
  },
  {
    icon: <Database size={24} weight="fill" />,
    label: "Backend",
    title: "Supabase",
    description:
      "PostgreSQL gestito, API REST automatiche, autenticazione integrata, RLS. Elimina la necessità di scrivere e deployare un backend custom.",
    className: "col-span-2",
  },
  {
    icon: <ArrowsClockwise size={24} weight="fill" />,
    label: "Data Fetching",
    title: "React Query (TanStack)",
    description:
      "Gestione dello stato server con caching intelligente, background updates e supporto offline.",
  },
  {
    icon: <Globe size={24} weight="fill" />,
    label: "Deploy",
    title: "Netlify",
    description:
      "Deploy continuo da Git, CDN globale, HTTPS automatico, branch previews. PaaS che elimina l'operations.",
  },
  {
    icon: <Wrench size={24} weight="fill" />,
    label: "PWA",
    title: "vite-plugin-pwa + Workbox",
    description:
      "Generazione automatica del Service Worker, precaching dei bundle, strategie di runtime caching configurabili.",
  },
];

export default function TechStackDeep() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deep-heading > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".deep-heading",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".bento-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-section",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" ref={sectionRef} className="py-32 md:py-40 bg-zinc-50">
      <div className="max-w-wrapper mx-auto px-6">
        <div className="deep-heading mb-16 md:mb-24 md:pr-[20vw]">
          <p className="text-sm font-medium text-accent-dark tracking-wide uppercase mb-4">
            Tecnologie
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
            Stack tecnologico e motivazioni
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            Ogni tecnologia è stata scelta dopo aver valutato alternative,
            considerando trade-off tra performance, manutenibilità e curva di
            apprendimento.
          </p>
        </div>

        <MagicBento
          cards={techs}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={10}
          glowColor="14, 165, 233"
          textAutoHide={false}
          className="tech-grid"
          renderCard={(card, index) => (
            <div className="flex flex-col h-full p-2">
              <div className="flex items-center gap-4 mb-5">
                <div className="magic-bento-card__icon">
                  {card.icon}
                </div>
                <span className="magic-bento-card__label">{card.label}</span>
              </div>
              <div className="magic-bento-card__content flex-1">
                <h3 className="magic-bento-card__title text-xl md:text-2xl">
                  {card.title}
                </h3>
                <p className="magic-bento-card__description text-sm md:text-base">
                  {card.description}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
