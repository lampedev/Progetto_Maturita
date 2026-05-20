import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Files, BracketsCurly, ShareNetwork, Key, LinkSimple, Lightning, Info, Checks, Equals, Hash } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const FIELD_COLORS = {
  pk:   { text: "text-amber-400", label: "PK", border: "border-amber-500/30", bg: "bg-amber-500/10", hoverBg: "hover:bg-amber-500/[0.12]", hoverText: "hover:text-amber-300" },
  fk:   { text: "text-cyan-400",  label: "FK", border: "border-cyan-500/30",  bg: "bg-cyan-500/10", hoverBg: "hover:bg-cyan-500/[0.12]", hoverText: "hover:text-cyan-300" },
  jsonb:{ text: "text-purple-400",label: "JSONB", border: "border-purple-500/30", bg: "bg-purple-500/10", hoverBg: "hover:bg-purple-500/[0.12]", hoverText: "hover:text-purple-300" },
  check:{ text: "text-emerald-400",label: "CHECK", border: "border-emerald-500/30", bg: "bg-emerald-500/10", hoverBg: "hover:bg-emerald-500/[0.12]", hoverText: "hover:text-emerald-300" },
  normal:{ text: "text-zinc-300", label: "", border: "", bg: "", hoverBg: "hover:bg-zinc-500/[0.10]", hoverText: "hover:text-zinc-100" },
};

const FieldBadge = ({ type }) => {
  const c = FIELD_COLORS[type];
  if (!c.label) return null;
  return (
    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${c.bg} ${c.text} border ${c.border}`}>
      {c.label}
    </span>
  );
};

const TooltipRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 py-1.5">
    <Icon size={12} weight="regular" className="mt-0.5 shrink-0 text-zinc-600" />
    <div className="flex-1 min-w-0">
      <span className="text-[10px] text-zinc-500 block leading-tight">{label}</span>
      <span className="text-[11px] text-zinc-100 font-mono leading-tight break-words">{value}</span>
    </div>
  </div>
);

const TableCard = ({ name, fields, highlight, id, onFieldHover, onFieldLeave }) => (
  <div
    data-table={id}
    className={`rounded-lg border ${
      highlight
        ? "border-amber-500/25 bg-[#18181b]"
        : "border-zinc-800 bg-[#18181b]"
    }`}
  >
    <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center gap-2">
      {highlight && <Key size={12} className="text-amber-400" weight="fill" />}
      <span className="font-mono text-[13px] font-medium text-zinc-200 tracking-wide">{name}</span>
    </div>
    <div className="px-3 py-2 relative">
      {fields.map((f, i) => {
        const c = FIELD_COLORS[f.type];
        return (
          <div
            key={i}
            data-field-key={`${id}-${i}`}
            onMouseEnter={(e) => onFieldHover?.(e, f, `${id}-${i}`)}
            onMouseLeave={onFieldLeave}
            className={`group/field relative flex items-center gap-2 py-1 px-2 -mx-2 rounded cursor-default transition-all duration-150 ${c.hoverBg} ${c.hoverText}`}
          >
            <FieldBadge type={f.type} />
            <span className={`font-mono text-[11px] leading-tight transition-colors duration-150 ${c.text}`}>
              {f.name}
            </span>
            {f.hint && <span className="text-[9px] text-zinc-500 ml-auto font-mono">{f.hint}</span>}
          </div>
        );
      })}
    </div>
  </div>
);

const CardinalityLabel = ({ text }) => (
  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-800 z-10">
    {text}
  </span>
);

const ConnectionLine = ({ fromId, toId, cardinality, label, direction = "right", containerRef }) => {
  const [coords, setCoords] = useState(null);

  const calc = useCallback(() => {
    if (!containerRef?.current) return;
    const container = containerRef.current;
    const fromEl = container.querySelector(`[data-table="${fromId}"]`);
    const toEl = container.querySelector(`[data-table="${toId}"]`);
    if (!fromEl || !toEl) return;
    const cr = container.getBoundingClientRect();
    const fr = fromEl.getBoundingClientRect();
    const tr = toEl.getBoundingClientRect();
    setCoords({
      x1: direction === "down" ? fr.left + fr.width / 2 - cr.left : fr.right - cr.left,
      y1: direction === "down" ? fr.bottom - cr.top : fr.top + fr.height / 2 - cr.top,
      x2: direction === "down" ? tr.left + tr.width / 2 - cr.left : tr.left - cr.left,
      y2: direction === "down" ? tr.top - cr.top : tr.top + tr.height / 2 - cr.top,
    });
  }, [fromId, toId, direction, containerRef]);

  useEffect(() => {
    calc();
    const ro = new ResizeObserver(calc);
    if (containerRef?.current) ro.observe(containerRef.current);
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 100);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); clearTimeout(t); };
  }, [calc, containerRef]);

  if (!coords) return null;
  const { x1, y1, x2, y2 } = coords;
  const isDown = direction === "down";
  const mx = isDown ? x1 : (x1 + x2) / 2;
  const my = isDown ? (y1 + y2) / 2 : y1;
  const pad = isDown ? 10 : 14;
  const dy1 = y1 + (isDown ? pad : 0);
  const dy2 = y2 - (isDown ? pad : 0);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      <defs>
        <marker id={`arrow-${fromId}-${toId}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke="rgba(113,113,122,0.4)" strokeWidth="1" />
        </marker>
      </defs>
      {isDown ? (
        <>
          <line x1={x1} y1={dy1} x2={x1} y2={my} stroke="rgba(113,113,122,0.2)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={x1} y1={my} x2={x2} y2={my} stroke="rgba(113,113,122,0.2)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={x2} y1={my} x2={x2} y2={dy2} stroke="rgba(113,113,122,0.2)" strokeWidth="1" strokeDasharray="4 3" markerEnd={`url(#arrow-${fromId}-${toId})`} />
        </>
      ) : (
        <line x1={x1 + pad} y1={y1} x2={x2 - pad} y2={y2} stroke="rgba(113,113,122,0.2)" strokeWidth="1" strokeDasharray="4 3" markerEnd={`url(#arrow-${fromId}-${toId})`} />
      )}
      <foreignObject x={mx - 50} y={my - 18} width="100" height="20">
        <div className="flex items-center justify-center h-full">
          <CardinalityLabel text={cardinality} />
        </div>
      </foreignObject>
      {label && (
        <foreignObject x={mx - 80} y={my + 4} width="160" height="18">
          <div className="flex items-center justify-center h-full">
            <span className="text-[9px] text-zinc-600 bg-zinc-950 px-1.5 py-0.5 rounded">{label}</span>
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

const SectionLabel = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
    <h3 className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">{title}</h3>
  </div>
);

const Tooltip = ({ field, side, rect }) => {
  if (!field || !rect) return null;
  const t = field.tooltip;
  if (!t) return null;
  const c = FIELD_COLORS[field.type];

  const isLeft = side === "left";
  const arrowClass = isLeft
    ? "right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-zinc-950"
    : "left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-zinc-950";

  return (
    <div
      className="fixed z-[200] w-72 pointer-events-none transition-opacity duration-150"
      style={{
        top: rect.top,
        left: isLeft ? rect.left - 292 : rect.right + 8,
        opacity: 1,
      }}
    >
      <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-3.5 relative">
        <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-zinc-800">
          <Hash size={12} weight="fill" className={c.text} />
          <span className={`font-mono text-[12px] font-semibold ${c.text}`}>{field.name}</span>
          <FieldBadge type={field.type} />
        </div>
        <div className="space-y-0">
          <TooltipRow icon={Info} label="Tipo" value={t.type} />
          {t.nullable !== undefined && (
            <TooltipRow icon={t.nullable ? Equals : Checks} label="Null" value={t.nullable ? "YES" : "NOT NULL"} />
          )}
          {t.defaultValue && (
            <TooltipRow icon={Equals} label="Default" value={t.defaultValue} />
          )}
          {t.constraints?.length > 0 && (
            <TooltipRow icon={Checks} label="Vincoli" value={t.constraints.join("; ")} />
          )}
          {t.description && (
            <div className="mt-2.5 pt-2.5 border-t border-zinc-800">
              <span className="text-[10px] text-zinc-500 block mb-1">Descrizione</span>
              <span className="text-[11px] text-zinc-100 leading-relaxed">{t.description}</span>
            </div>
          )}
          {t.example && (
            <div className="mt-1.5">
              <span className="text-[10px] text-zinc-500 block mb-1">Esempio</span>
              <code className="text-[10px] font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded block">{t.example}</code>
            </div>
          )}
        </div>
        <div className={arrowClass} />
      </div>
    </div>
  );
};

export default function DatabaseDesign() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const diagramRef = useRef(null);
  const cardsRef = useRef([]);
  const connRef = useRef(null);

  const [hoveredField, setHoveredField] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const handleFieldHover = useCallback((e, field) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;
    const side = centerX < viewportCenter ? "right" : "left";
    setHoveredField(field);
    setTooltipPos({ top: rect.top, side, rect });
  }, []);

  const handleFieldLeave = useCallback(() => {
    setHoveredField(null);
    setTooltipPos(null);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
      gsap.from(diagramRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: diagramRef.current, start: "top 80%" },
      });
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const tables = {
    users: {
      name: "auth.users", highlight: true,
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "Identificatore univoco generato automaticamente per ogni utente registrato tramite Supabase Auth.",
          constraints: ["PRIMARY KEY"], example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
        }},
        { name: "email", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Indirizzo email dell'utente, usato come identificatore di login.",
          constraints: ["UNIQUE"], example: "mario.rossi@email.com"
        }},
        { name: "encrypted_password", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Password cifrata con bcrypt gestita internamente da Supabase Auth.",
          constraints: ["NOT NULL"], example: "$2a$10$..."
        }},
      ],
    },
    muscles: {
      name: "muscles",
      fields: [
        { name: "id", type: "pk", hint: "serial", tooltip: {
          type: "integer (serial)", nullable: false, defaultValue: "nextval('muscles_id_seq')",
          description: "ID autoincrementale che identifica univocamente un gruppo muscolare.",
          constraints: ["PRIMARY KEY"], example: "1"
        }},
        { name: "name", type: "normal", hint: "UNIQUE", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Nome del gruppo muscolare (es. 'Petto', 'Dorsali', 'Quadricipiti').",
          constraints: ["UNIQUE", "NOT NULL"], example: "Petto"
        }},
        { name: "group", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Macro-gruppo di appartenenza (es. 'Superiore', 'Inferiore', 'Core').",
          constraints: ["NOT NULL"], example: "Superiore"
        }},
        { name: "category", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Categoria funzionale (es. 'Spinta', 'Trazione', 'Gambe', 'Core').",
          constraints: ["NOT NULL"], example: "Spinta"
        }},
        { name: "created_at", type: "normal", tooltip: {
          type: "timestamptz", nullable: false, defaultValue: "timezone('utc', now())",
          description: "Timestamp di creazione del record in UTC.",
          constraints: ["NOT NULL"], example: "2024-01-15 09:30:00+00"
        }},
      ],
    },
    dailyMetrics: {
      name: "daily_metrics", highlight: true,
      fields: [
        { name: "user_id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Parte della chiave primaria composite. Riferimento all'utente proprietario delle metriche.",
          constraints: ["PRIMARY KEY (composite)", "FOREIGN KEY → auth.users(id)"], example: "a1b2c3d4-..."
        }},
        { name: "date", type: "pk", hint: "date", tooltip: {
          type: "date", nullable: false, defaultValue: null,
          description: "Parte della chiave primaria composite. Giorno a cui si riferiscono le metriche.",
          constraints: ["PRIMARY KEY (composite)"], example: "2024-01-15"
        }},
        { name: "body_weight", type: "normal", hint: "numeric", tooltip: {
          type: "numeric", nullable: true, defaultValue: null,
          description: "Peso corporeo in chilogrammi, usato per tracciare la composizione corporea nel tempo.",
          constraints: [], example: "78.5"
        }},
        { name: "calories", type: "check", hint: ">=0", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Calorie totali consumate durante la giornata.",
          constraints: ["CHECK >= 0"], example: "2400"
        }},
        { name: "protein", type: "check", hint: ">=0", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Grammi di proteine ingeriti.",
          constraints: ["CHECK >= 0"], example: "180"
        }},
        { name: "carbs", type: "check", hint: ">=0", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Grammi di carboidrati ingeriti.",
          constraints: ["CHECK >= 0"], example: "250"
        }},
        { name: "fat", type: "check", hint: ">=0", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Grammi di grassi ingeriti.",
          constraints: ["CHECK >= 0"], example: "65"
        }},
        { name: "sleep_hours", type: "check", hint: "0-24", tooltip: {
          type: "numeric", nullable: true, defaultValue: null,
          description: "Ore di sonno della notte precedente, con vincolo 0-24.",
          constraints: ["CHECK >= 0 AND <= 24"], example: "7.5"
        }},
        { name: "sleep_quality", type: "check", hint: "1-10", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Qualità del sonno su scala 1-10.",
          constraints: ["CHECK >= 1 AND <= 10"], example: "8"
        }},
        { name: "steps", type: "check", hint: ">=0", tooltip: {
          type: "integer", nullable: true, defaultValue: null,
          description: "Numero di passi giornalieri.",
          constraints: ["CHECK >= 0"], example: "10420"
        }},
        { name: "water_ml", type: "check", hint: ">=0", tooltip: {
          type: "smallint", nullable: true, defaultValue: null,
          description: "Quantità di acqua bevuta in millilitri.",
          constraints: ["CHECK >= 0"], example: "2500"
        }},
        { name: "metrics_data", type: "jsonb", hint: "DEFAULT '{}'", tooltip: {
          type: "jsonb", nullable: true, defaultValue: "'{}'",
          description: "Campo flessibile JSONB per metriche future o personalizzate (es. stress, energia, ecc.) senza necessità di migrazioni.",
          constraints: ["CHECK jsonb_typeof = 'object'"], example: '{"stress": 3, "energy": 7}'
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete: quando true, il record è logicamente eliminato ma conservato nel DB.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    exercises: {
      name: "exercises",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco dell'esercizio.",
          constraints: ["PRIMARY KEY"], example: "e1f2g3h4-..."
        }},
        { name: "name", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Nome descrittivo dell'esercizio.",
          constraints: ["NOT NULL"], example: "Bench Press"
        }},
        { name: "equipment", type: "normal", tooltip: {
          type: "text", nullable: true, defaultValue: null,
          description: "Attrezzatura richiesta (es. 'bilanciere', 'manubri', 'cavi', 'corpo libero').",
          constraints: [], example: "bilanciere"
        }},
        { name: "primary_muscle_id", type: "fk", hint: "→ muscles", tooltip: {
          type: "integer", nullable: true, defaultValue: null,
          description: "Riferimento al gruppo muscolare principale target dell'esercizio.",
          constraints: ["FOREIGN KEY → muscles(id)"], example: "1"
        }},
        { name: "secondary_muscle_ids", type: "normal", hint: "ARRAY", tooltip: {
          type: "integer[] (ARRAY)", nullable: true, defaultValue: null,
          description: "Array di ID dei gruppi muscolari secondari coinvolti.",
          constraints: [], example: "{2, 5}"
        }},
        { name: "is_public", type: "normal", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Se true, l'esercizio è visibile a tutti gli utenti; se false, è privato del creatore.",
          constraints: ["DEFAULT false"], example: "true"
        }},
        { name: "created_by_user_id", type: "fk", hint: "→ users", tooltip: {
          type: "uuid", nullable: true, defaultValue: null,
          description: "Riferimento all'utente che ha creato l'esercizio. Null se è un esercizio di sistema.",
          constraints: ["FOREIGN KEY → auth.users(id)"], example: "a1b2c3d4-..."
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete dell'esercizio.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    routines: {
      name: "routines",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco della scheda di allenamento.",
          constraints: ["PRIMARY KEY"], example: "r1s2t3u4-..."
        }},
        { name: "user_id", type: "fk", hint: "→ users", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Proprietario della scheda. Ogni utente può avere multiple schede.",
          constraints: ["FOREIGN KEY → auth.users(id)", "NOT NULL"], example: "a1b2c3d4-..."
        }},
        { name: "name", type: "normal", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Nome della scheda (es. 'Push A', 'Upper Body', 'Full Body').",
          constraints: ["NOT NULL"], example: "Push A"
        }},
        { name: "last_performed_at", type: "normal", tooltip: {
          type: "timestamptz", nullable: true, defaultValue: null,
          description: "Data e ora dell'ultima esecuzione della scheda. Utile per ordinare e filtrare.",
          constraints: [], example: "2024-01-15 18:00:00+00"
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete della scheda.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    routineState: {
      name: "routine_state",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco del collegamento routine-esercizio.",
          constraints: ["PRIMARY KEY"], example: "x1y2z3w4-..."
        }},
        { name: "routine_id", type: "fk", hint: "→ routines", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Riferimento alla scheda di allenamento che contiene l'esercizio.",
          constraints: ["FOREIGN KEY → routines(id)", "NOT NULL"], example: "r1s2t3u4-..."
        }},
        { name: "exercise_id", type: "fk", hint: "→ exercises", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Riferimento all'esercizio incluso nella scheda.",
          constraints: ["FOREIGN KEY → exercises(id)", "NOT NULL"], example: "e1f2g3h4-..."
        }},
        { name: "order_index", type: "normal", tooltip: {
          type: "integer", nullable: false, defaultValue: null,
          description: "Indice ordinale che definisce la sequenza degli esercizi nella scheda.",
          constraints: ["NOT NULL"], example: "3"
        }},
        { name: "cached_config", type: "jsonb", tooltip: {
          type: "jsonb", nullable: true, defaultValue: null,
          description: "Configurazione JSONB per parametri personalizzati dell'esercizio nella scheda (es. serie, ripetizioni target, riposo).",
          constraints: [], example: '{"target_sets": 4, "target_reps": "8-10", "rest_sec": 120}'
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete del collegamento.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    workoutLogs: {
      name: "workout_logs", highlight: true,
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco della sessione di allenamento.",
          constraints: ["PRIMARY KEY"], example: "w1x2y3z4-..."
        }},
        { name: "user_id", type: "fk", hint: "→ users", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Utente che ha eseguito l'allenamento.",
          constraints: ["FOREIGN KEY → auth.users(id)", "NOT NULL"], example: "a1b2c3d4-..."
        }},
        { name: "routine_id", type: "fk", hint: "→ routines", tooltip: {
          type: "uuid", nullable: true, defaultValue: null,
          description: "Se l'allenamento segue una scheda esistente, riferimento a quella scheda.",
          constraints: ["FOREIGN KEY → routines(id)"], example: "r1s2t3u4-..."
        }},
        { name: "start_time", type: "normal", tooltip: {
          type: "timestamptz", nullable: false, defaultValue: "timezone('utc', now())",
          description: "Inizio della sessione di allenamento in UTC.",
          constraints: ["NOT NULL"], example: "2024-01-15 18:30:00+00"
        }},
        { name: "end_time", type: "normal", tooltip: {
          type: "timestamptz", nullable: true, defaultValue: null,
          description: "Fine della sessione. Null se l'allenamento è in corso.",
          constraints: [], example: "2024-01-15 19:45:00+00"
        }},
        { name: "notes", type: "normal", tooltip: {
          type: "text", nullable: true, defaultValue: null,
          description: "Note libere sulla sessione (es. 'ottima pump', 'feeling stanco').",
          constraints: [], example: "Ottima pump, aumentare peso prossima volta"
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete della sessione.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    workoutExercises: {
      name: "workout_exercises",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco dell'esercizio all'interno della sessione.",
          constraints: ["PRIMARY KEY"], example: "we1we2-..."
        }},
        { name: "workout_log_id", type: "fk", hint: "→ workout_logs", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Sessione di allenamento a cui appartiene questo esercizio.",
          constraints: ["FOREIGN KEY → workout_logs(id)", "NOT NULL"], example: "w1x2y3z4-..."
        }},
        { name: "exercise_id", type: "fk", hint: "→ exercises", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Definizione dell'esercizio eseguito.",
          constraints: ["FOREIGN KEY → exercises(id)", "NOT NULL"], example: "e1f2g3h4-..."
        }},
        { name: "order_index", type: "normal", tooltip: {
          type: "integer", nullable: false, defaultValue: null,
          description: "Ordine di esecuzione dell'esercizio nella sessione.",
          constraints: ["NOT NULL"], example: "2"
        }},
        { name: "notes", type: "normal", tooltip: {
          type: "text", nullable: true, defaultValue: null,
          description: "Note specifiche per questo esercizio nella sessione.",
          constraints: [], example: "Focus sulla contrazione eccentrica"
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    setLogs: {
      name: "set_logs",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco della serie.",
          constraints: ["PRIMARY KEY"], example: "sl1sl2-..."
        }},
        { name: "workout_exercise_id", type: "fk", hint: "→ workout_exercises", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Esercizio della sessione a cui appartiene questa serie.",
          constraints: ["FOREIGN KEY → workout_exercises(id)", "NOT NULL"], example: "we1we2-..."
        }},
        { name: "set_number", type: "normal", tooltip: {
          type: "integer", nullable: false, defaultValue: null,
          description: "Numero progressivo della serie all'interno dell'esercizio.",
          constraints: ["NOT NULL"], example: "3"
        }},
        { name: "weight", type: "normal", hint: "numeric", tooltip: {
          type: "numeric", nullable: false, defaultValue: null,
          description: "Peso utilizzato nella serie in kg (o unità scelta).",
          constraints: ["NOT NULL"], example: "82.5"
        }},
        { name: "reps", type: "normal", hint: "numeric", tooltip: {
          type: "numeric", nullable: false, defaultValue: null,
          description: "Numero di ripetizioni eseguite. Numeric per supportare RPE parziali se necessario.",
          constraints: ["NOT NULL"], example: "10"
        }},
        { name: "rir", type: "normal", hint: "numeric", tooltip: {
          type: "numeric", nullable: true, defaultValue: null,
          description: "Reps In Reserve: stimativa di quante ripetizioni avresti potuto fare in più.",
          constraints: [], example: "2"
        }},
        { name: "type", type: "check", hint: "WARMUP|WORKING|DROP|RESTPAUSE", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Tipo di serie: WARMUP (riscaldamento), WORKING (lavoro), DROP (drop set), RESTPAUSE (rest-pause).",
          constraints: ["CHECK IN ('WARMUP','WORKING','DROP','RESTPAUSE')", "NOT NULL"], example: "WORKING"
        }},
        { name: "deleted", type: "normal", hint: "soft-delete", tooltip: {
          type: "boolean", nullable: true, defaultValue: "false",
          description: "Flag per soft-delete della serie.",
          constraints: ["DEFAULT false"], example: "false"
        }},
      ],
    },
    sharedWorkouts: {
      name: "shared_workouts",
      fields: [
        { name: "id", type: "pk", hint: "uuid", tooltip: {
          type: "uuid", nullable: false, defaultValue: "uuid_generate_v4()",
          description: "ID univoco del record di condivisione.",
          constraints: ["PRIMARY KEY"], example: "sw1sw2-..."
        }},
        { name: "workout_log_id", type: "fk", hint: "→ workout_logs", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Sessione di allenamento condivisa. Vincolo UNIQUE: un workout può essere condiviso una sola volta.",
          constraints: ["FOREIGN KEY → workout_logs(id)", "UNIQUE", "NOT NULL"], example: "w1x2y3z4-..."
        }},
        { name: "share_token", type: "normal", hint: "UNIQUE", tooltip: {
          type: "text", nullable: false, defaultValue: null,
          description: "Token UUID univoco usato nell'URL di condivisione pubblico.",
          constraints: ["UNIQUE", "NOT NULL"], example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
        }},
        { name: "created_by", type: "fk", hint: "→ users", tooltip: {
          type: "uuid", nullable: false, defaultValue: null,
          description: "Utente che ha generato il link di condivisione.",
          constraints: ["FOREIGN KEY → auth.users(id)", "NOT NULL"], example: "a1b2c3d4-..."
        }},
      ],
    },
  };

  const connections = [
    { from: "users", to: "dailyMetrics", card: "1 : N", label: "user_id (PK composite)", dir: "down" },
    { from: "users", to: "routines", card: "1 : N", label: "user_id", dir: "right" },
    { from: "muscles", to: "exercises", card: "1 : N", label: "primary_muscle_id", dir: "down" },
    { from: "routines", to: "routineState", card: "1 : N", label: "routine_id", dir: "down" },
    { from: "exercises", to: "routineState", card: "1 : N", label: "exercise_id", dir: "down" },
    { from: "users", to: "workoutLogs", card: "1 : N", label: "user_id", dir: "down" },
    { from: "routines", to: "workoutLogs", card: "1 : N", label: "routine_id", dir: "down" },
    { from: "workoutLogs", to: "workoutExercises", card: "1 : N", label: "workout_log_id", dir: "down" },
    { from: "exercises", to: "workoutExercises", card: "1 : N", label: "exercise_id", dir: "down" },
    { from: "workoutExercises", to: "setLogs", card: "1 : N", label: "workout_exercise_id", dir: "down" },
    { from: "workoutLogs", to: "sharedWorkouts", card: "1 : 1", label: "workout_log_id (UNIQUE)", dir: "right" },
  ];

  const infoCards = [
    {
      icon: Files,
      title: "Schema relazionale",
      desc: "9 tabelle normalizzate con relazioni 1:N e integrità referenziale. PK composite su daily_metrics (user_id, date) per metriche giornaliere uniche.",
    },
    {
      icon: BracketsCurly,
      title: "JSONB ibrido",
      desc: "daily_metrics e routine_state usano colonne flat per i campi fissi e JSONB per dati opzionali, evitando migrazioni costanti per metriche future.",
    },
    {
      icon: ShareNetwork,
      title: "Condivisione sicura",
      desc: "shared_workouts usa share_token UUID univoco con FK UNIQUE su workout_log_id. Un workout può essere condiviso una sola volta.",
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

      <div ref={diagramRef} className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 md:p-10 mb-16 overflow-x-hidden">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mb-8 px-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Legenda</span>
          <span className="w-px h-3 bg-zinc-800" />
          {[
            { label: "PK", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
            { label: "FK", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
            { label: "JSONB", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
            { label: "CHECK", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
          ].map((l) => (
            <span key={l.label} className={`text-[10px] font-medium px-2 py-0.5 rounded border ${l.color}`}>{l.label}</span>
          ))}
        </div>

        {/* ER Diagram */}
        <div ref={connRef} className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
            <defs>
              <marker id="er-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="none" stroke="rgba(113,113,122,0.4)" strokeWidth="1" />
              </marker>
            </defs>
            {connections.map((c, i) => (
              <ConnectionLine key={i} {...c} containerRef={connRef} />
            ))}
          </svg>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
            <SectionLabel icon={Key} title="Autenticazione" />
            <SectionLabel icon={Lightning} title="Riferimento" />
            <SectionLabel icon={Files} title="Metriche" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 relative">
            <TableCard id="users" {...tables.users} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="muscles" {...tables.muscles} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="dailyMetrics" {...tables.dailyMetrics} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
          </div>

          {/* Row 2 */}
          <div className="mb-4 relative">
            <SectionLabel icon={Files} title="Gestione Schede" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 relative">
            <TableCard id="routines" {...tables.routines} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="routineState" {...tables.routineState} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="exercises" {...tables.exercises} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
          </div>

          {/* Row 3 */}
          <div className="mb-4 relative">
            <SectionLabel icon={Lightning} title="Allenamenti" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <TableCard id="workoutLogs" {...tables.workoutLogs} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="workoutExercises" {...tables.workoutExercises} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="setLogs" {...tables.setLogs} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
            <TableCard id="sharedWorkouts" {...tables.sharedWorkouts} onFieldHover={handleFieldHover} onFieldLeave={handleFieldLeave} />
          </div>
        </div>

        {/* Relationship summary */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { from: "auth.users", to: "daily_metrics", rel: "1 : N", note: "PK composite (user_id, date)" },
              { from: "auth.users", to: "routines", rel: "1 : N", note: "Template allenamento" },
              { from: "muscles", to: "exercises", rel: "1 : N", note: "primary_muscle_id" },
              { from: "routines", to: "routine_state", rel: "1 : N", note: "Ordine esercizi in scheda" },
              { from: "exercises", to: "routine_state", rel: "1 : N", note: "cached_config JSONB" },
              { from: "workout_logs", to: "shared_workouts", rel: "1 : 1", note: "share_token UUID univoco" },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-2 py-2 px-3 rounded-lg border border-zinc-800 bg-[#18181b]">
                <LinkSimple size={13} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[11px] text-zinc-300">{r.from}</span>
                    <span className="text-[10px] text-zinc-500 font-medium">{r.rel}</span>
                    <span className="font-mono text-[11px] text-zinc-300">{r.to}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">{r.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {infoCards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="rounded-2xl bg-white border border-zinc-100 p-8 md:p-10"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-50 text-zinc-600 flex items-center justify-center mb-5">
              <card.icon size={20} weight="regular" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 mb-2">{card.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Global tooltip */}
      {hoveredField && tooltipPos && (
        <Tooltip field={hoveredField} side={tooltipPos.side} rect={tooltipPos.rect} />
      )}
    </section>
  );
}
