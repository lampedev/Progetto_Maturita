import { Barbell, ArrowUpRight } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-wrapper mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-white mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Barbell weight="fill" size={18} />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                GymLogPWA
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[40ch] text-zinc-500">
              Un'applicazione PWA per il tracking degli allenamenti in
              palestra. Costruita per chi vuole il controllo totale dei propri
              dati.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Link
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://latmachine.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Apri l'app
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#funzionalita"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Funzionalità
                </a>
              </li>
              <li>
                <a
                  href="#tecnologie"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Tecnologie
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} GymLogPWA. Progetto personale.
          </p>
          <p className="text-xs text-zinc-600">
            Costruito con cura e sudore.
          </p>
        </div>
      </div>
    </footer>
  );
}
