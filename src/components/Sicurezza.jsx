import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockKey, ShieldCheck, ArrowsClockwise } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function Sicurezza() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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

  const ciaCards = [
    {
      icon: LockKey,
      title: "Confidentiality",
      items: [
        "HTTPS/TLS 1.3 su tutte le comunicazioni",
        "OAuth 2.0 + PKCE per l'autenticazione SPA",
        "JWT token in localStorage con scadenza",
        "Row Level Security: ogni utente vede solo i propri dati (auth.uid() = user_id)",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      items: [
        "RLS impedisce modifiche non autorizzate",
        "Trigger di validazione su JSONB (CHECK jsonb_typeof = 'object')",
        "TypeScript strict typing per prevenire errori a livello di codice",
        "CHECK constraints sul database (calories >= 0, sleep_hours BETWEEN 0 AND 24)",
      ],
    },
    {
      icon: ArrowsClockwise,
      title: "Availability",
      items: [
        "Netlify CDN con distribuzione globale e ridondanza",
        "PWA offline: Service Worker serve asset e dati in cache",
        "React Query cache persistito in localStorage",
        "Fallback navigate per routing client-side offline",
      ],
    },
  ];

  return (
    <section id="sicurezza" ref={sectionRef} className="py-32 md:py-40 max-w-[1400px] mx-auto px-6">
      <div ref={headerRef} className="mb-16 md:mb-24">
        <span className="block uppercase text-sm tracking-wide text-accent-dark mb-4">
          Sicurezza informatica
        </span>
        <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
          La triade CIA: Confidentiality, Integrity, Availability
        </h2>
        <p className="text-base text-zinc-500 max-w-[55ch]">
          La sicurezza non è stata un'aggiunta successiva, ma un requisito guida fin dalla progettazione. Ogni livello dell'architettura implementa contromisure specifiche.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {ciaCards.map((card, i) => (
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
            <h3 className="text-xl font-semibold text-zinc-900 mb-4">{card.title}</h3>
            <ul className="space-y-3">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-500 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

