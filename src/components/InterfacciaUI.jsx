import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  { src: 'photo_6043851415018475226_y.jpg', name: 'Template', caption: 'CRUD schemi allenamento con drag-and-drop degli esercizi' },
  { src: 'photo_6043851415018475227_y.jpg', name: 'Metriche', caption: 'Form giornaliero con validazione lato client e hint contestuali' },
  { src: 'photo_6043851415018475228_y.jpg', name: 'Cronologia', caption: 'Lista paginata dei set con evidenziazione del PR personale' },
  { src: 'photo_6043851415018475229_y.jpg', name: 'Andamento 1RM', caption: 'Grafico SVG responsive con tooltip interattivo' },
  { src: 'photo_6043851415018475230_y.jpg', name: 'Riassunto', caption: 'Aggregazione dati sessione: volume, serie, tempo' },
  { src: 'photo_6043851415018475231_y.jpg', name: 'Dettaglio', caption: 'Nested routing per esercizio con cronologia filtrabile' },
  { src: 'photo_6043851415018475232_y.jpg', name: 'Dashboard', caption: 'Aggregazioni per periodo con React Query cache' },
  { src: 'photo_6043851415018475233_y.jpg', name: 'Lista template', caption: 'State management ottimistico per avvio workout' },
];

export default function InterfacciaUI() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ui-heading > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ui-heading',
          start: 'top 80%',
        },
      });
      gsap.from('.ui-device', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ui-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="interfaccia" ref={sectionRef} className="py-32 md:py-40">
      <div className="max-w-wrapper mx-auto px-6">
        <div className="ui-heading mb-16 md:mb-24">
          <p className="text-sm font-medium text-accent-dark tracking-wide uppercase mb-4">
            Interfaccia utente
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6 md:max-w-[70%]">
            Design ottimizzato per l'uso in palestra
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            L'interfaccia è stata progettata mobile-first, con touch target di almeno 48px, contrasti elevati e layout che minimizzano gli input necessari durante l'allenamento.
          </p>
        </div>

        <div className="ui-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {screenshots.map((s, i) => (
            <div key={i} className="ui-device group">
              <div className="relative mx-auto max-w-[240px]">
                <div className="relative bg-zinc-900 rounded-[2.5rem] p-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-zinc-700/80 z-10" />
                  <div className="bg-zinc-800 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                    <img
                      src={`${import.meta.env.BASE_URL}screenshots/${s.src}`}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="mt-5 text-center text-sm font-semibold text-zinc-700 tracking-tight">
                  {s.name}
                </p>
                <p className="mt-1 text-center text-xs text-zinc-400 leading-snug px-2">
                  {s.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
