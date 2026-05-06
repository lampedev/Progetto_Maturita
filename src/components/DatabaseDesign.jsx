import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Files, BracketsCurly, ShareNetwork } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const TableBox = ({ name, fields }) => (
  <div className="bg-white border border-zinc-200 rounded-2xl p-4 min-w-[150px] max-w-[220px]">
    <div className="text-sm font-semibold text-zinc-900">{name}</div>
    <div className="text-[11px] text-zinc-500 mt-1.5 leading-snug">{fields}</div>
  </div>
);

const HArrow = ({ label }) => (
  <div className="flex flex-col items-center justify-center w-10 md:w-12 shrink-0">
    <span className="text-[10px] text-zinc-400 mb-1 font-medium">{label}</span>
    <div className="flex items-center w-full">
      <div className="h-px flex-1 bg-zinc-300" />
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-zinc-300" />
    </div>
  </div>
);

const VArrow = ({ label }) => (
  <div className="flex flex-row items-center justify-center h-8 md:h-10 shrink-0">
    <span className="text-[10px] text-zinc-400 mr-1 font-medium">{label}</span>
    <div className="flex flex-col items-center h-full">
      <div className="w-px flex-1 bg-zinc-300" />
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-zinc-300" />
    </div>
  </div>
);

export default function DatabaseDesign() {
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
      icon: Files,
      title: "Schema relazionale",
      desc: "Workout, esercizi, set e template sono modellati con relazioni 1:N che garantiscono integrità referenziale.",
    },
    {
      icon: BracketsCurly,
      title: "JSONB ibrido",
      desc: "La tabella daily_metrics usa colonne flat per i campi fissi e JSONB per le metriche opzionali, evitando migrazioni costanti.",
    },
    {
      icon: ShareNetwork,
      title: "Condivisione sicura",
      desc: "I workout condivisi usano token UUID univoci. Chi riceve il link vede solo quel workout, senza accedere ad altri dati.",
    },
  ];

  return (
    <section id="database" ref={sectionRef} className="py-32 md:py-40 max-w-[1400px] mx-auto px-6">
      <div ref={headerRef} className="mb-16 md:mb-24">
        <span className="block uppercase text-sm tracking-wide text-accent-dark mb-4">
          Persistenza dei dati
        </span>
        <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
          Schema database relazionale con estensioni JSONB
        </h2>
        <p className="text-base text-zinc-500 max-w-[55ch]">
          Il database PostgreSQL su Supabase combina la rigidità del modello relazionale con la flessibilità del JSONB per le metriche variabili nel tempo.
        </p>
      </div>

      <div
        ref={diagramRef}
        className="rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 p-8 md:p-12 mb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Routines flow */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Gestione Schede
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <TableBox name="auth.users" fields="id, email, encrypted_password" />
              <HArrow label="1" />
              <TableBox name="routines" fields="id, user_id, name, created_at" />
              <HArrow label="N" />
              <div className="flex flex-col items-center">
                <TableBox name="routine_state" fields="id, routine_id, current_day, active" />
                <VArrow label="N" />
                <TableBox name="exercises" fields="id, name, muscle_group, equipment" />
              </div>
            </div>
          </div>

          {/* Daily metrics */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Metriche Giornaliere
            </div>
            <div className="flex items-center gap-2">
              <TableBox name="auth.users" fields="id, email" />
              <HArrow label="1" />
              <TableBox name="daily_metrics" fields="id, user_id, date, metrics_jsonb" />
            </div>
          </div>
        </div>

        {/* Workout logs flow */}
        <div className="mt-12 flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Allenamenti
          </div>
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 xl:gap-2">
            <div className="flex items-center gap-2">
              <TableBox name="auth.users" fields="id, email" />
              <HArrow label="1" />
            </div>
            <div className="flex flex-col items-center">
              <TableBox name="workout_logs" fields="id, user_id, date, duration" />
              <VArrow label="1:1" />
              <TableBox name="shared_workouts" fields="id, workout_id, token, expires_at" />
            </div>
            <div className="flex items-center gap-2">
              <HArrow label="N" />
              <TableBox name="workout_exercises" fields="id, workout_id, exercise_id, order" />
              <HArrow label="N" />
              <TableBox name="set_logs" fields="id, workout_exercise_id, reps, weight, rpe" />
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
