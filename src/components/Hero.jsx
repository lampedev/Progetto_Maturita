import { useEffect, useRef } from 'react';
import { ArrowRight, Barbell } from '@phosphor-icons/react';
import gsap from 'gsap';

const screenshots = [
  'photo_6043851415018475232_y.jpg',
  'photo_6043851415018475230_y.jpg',
  'photo_6043851415018475229_y.jpg',
];

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      });
      gsap.from('.phone-stack', {
        y: 80, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out',
      });
      gsap.from('.phone-float', {
        y: 60, opacity: 0, duration: 1.2, delay: 0.5, stagger: 0.15, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-wrapper mx-auto w-full px-6 py-12 md:py-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div ref={textRef} className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-dark text-sm font-medium mb-8">
              <Barbell weight="fill" size={16} />
              <span>PWA per il fitness</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-none text-zinc-900 mb-6">
              GymLogPWA —{' '}
              <span className="text-accent-dark">Progressive Web App per il fitness</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-[55ch] mb-10">
              Una PWA per il tracciamento avanzato degli allenamenti in palestra, sviluppata con architettura cloud, autenticazione OAuth 2.0 e sicurezza a livello di riga, progettata ad hoc per le mie esigenze e per atleti orientati alla massima performance, con gestione dati dettagliata e monitoraggio evoluto dei progressi.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://latmachine.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-medium transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98]"
              >
                Prova la demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#origine"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-200 text-zinc-700 text-sm font-medium transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
              >
                Esplora il progetto
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex -space-x-2">
                {['A','M','G','L','R'].map((l,i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-zinc-500">
                    {l}
                  </div>
                ))}
              </div>
              <span>Usata da 10+ persone</span>
            </div>
          </div>

          <div ref={visualRef} className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-[300px] md:w-[360px] h-[500px] md:h-[580px]">
              <div className="phone-stack absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[280px]">
                <div className="absolute -inset-6 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] blur-2xl opacity-60" />
                <div className="relative bg-zinc-900 rounded-[2.5rem] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2)] rotate-[-2deg]">
                  <div className="bg-zinc-800 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                    <img src={`${import.meta.env.BASE_URL}screenshots/${screenshots[0]}`} alt="Dashboard" className="w-full h-full object-cover" loading="eager" />
                  </div>
                </div>
              </div>
              <div className="phone-float absolute top-0 right-0 w-[160px] md:w-[190px]">
                <div className="bg-zinc-900 rounded-[2rem] p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rotate-[8deg]">
                  <div className="bg-zinc-800 rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
                    <img src={`${import.meta.env.BASE_URL}screenshots/${screenshots[1]}`} alt="Workout" className="w-full h-full object-cover" loading="eager" />
                  </div>
                </div>
              </div>
              <div className="phone-float absolute bottom-0 left-0 w-[150px] md:w-[180px]">
                <div className="bg-zinc-900 rounded-[2rem] p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rotate-[-6deg]">
                  <div className="bg-zinc-800 rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
                    <img src={`${import.meta.env.BASE_URL}screenshots/${screenshots[2]}`} alt="Analytics" className="w-full h-full object-cover" loading="eager" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
