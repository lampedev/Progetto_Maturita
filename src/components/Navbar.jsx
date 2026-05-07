import { useState, useEffect, useRef } from 'react';
import { Barbell, List, X } from '@phosphor-icons/react';

const links = [
  { href: '#origine', label: 'Perché questo progetto' },
  { href: '#requisiti', label: 'Requisiti' },
  { href: '#architettura', label: 'Architettura' },
  { href: '#sicurezza', label: 'Sicurezza' },
  { href: '#database', label: 'Database' },
  { href: '#stato', label: 'Stato' },
  { href: '#tech', label: 'Tech' },
  { href: '#iterazioni', label: 'Iterazioni' },
  { href: '#interfaccia', label: 'Interfaccia' },
  { href: '#ai', label: 'AI' },
  { href: '#apprendimento', label: 'Apprendimento' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(links[0].href.replace('#', ''));
  const ticking = useRef(false);

  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''));

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const offset = 120;
          let current = sectionIds[0];

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= offset) {
                current = id;
              }
            }
          }

          setActiveSection(current);
          ticking.current = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-wrapper mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2.5 text-zinc-900">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white">
              <Barbell weight="fill" size={18} />
            </div>
            <span className="text-lg font-semibold tracking-tight">GymLogPWA</span>
          </a>

          <div className="hidden lg:flex items-center gap-0.5 bg-zinc-100/60 rounded-full p-1">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace('#', '');
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-accent-dark bg-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:block">
            <a href="https://latmachine.netlify.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium transition-all hover:bg-zinc-800 active:scale-[0.98]">
              Prova l'app
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-700" aria-label="Menu">
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-zinc-200/50 px-6 pb-6 pt-2">
          <div className="flex flex-col gap-1">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace('#', '');
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'text-zinc-900 bg-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <a href="https://latmachine.netlify.app" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium">
              Prova l'app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
