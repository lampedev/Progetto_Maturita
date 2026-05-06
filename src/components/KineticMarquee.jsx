import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function KineticMarquee() {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track1Ref.current, {
        x: '-50%',
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
      gsap.fromTo(
        track2Ref.current,
        { x: '-50%' },
        {
          x: '0%',
          duration: 35,
          ease: 'none',
          repeat: -1,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const words = [
    'REACT',
    'TYPESCRIPT',
    'PWA',
    'SUPABASE',
    'POSTGRESQL',
    'OAUTH2',
    'RLS',
    'OFFLINE',
    'JSONB',
    'WORKBOX',
    'NETLIFY',
    'CACHE',
    'JWT',
    'SERVICE_WORKER',
    'TAILWIND',
    'VITE',
  ];

  const renderTrack = (ref) => (
    <div ref={ref} className="flex whitespace-nowrap will-change-transform">
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span key={i} className="inline-flex items-center mx-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-100 select-none">
          {w}
          <span className="mx-6 w-2 h-2 rounded-full bg-accent/30" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="py-16 md:py-24 overflow-hidden border-y border-zinc-100">
      <div className="mb-6">
        {renderTrack(track1Ref)}
      </div>
      <div>
        {renderTrack(track2Ref)}
      </div>
    </section>
  );
}
