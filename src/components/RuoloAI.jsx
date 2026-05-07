import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Robot, User } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const conversations = [
  {
    title: 'Come l\'AI ha aiutato',
    subtitle: 'Un assistente, non un sostituto',
    messages: [
      {
        type: 'user',
        text: 'Le animazioni GSAP non funzionano: gli elementi restano con opacity 0 anche dopo il mount.',
      },
      {
        type: 'ai',
        text: 'Il problema è che in React StrictMode i componenti si montano/smontano due volte. Con gsap.from() gli elementi partono da opacity 0 e se l\'animazione non triggera correttamente al secondo mount, restano invisibili. Usa gsap.fromTo() per forzare lo stato finale.',
      },
      {
        type: 'action',
        text: 'Ho sostituito tutte le animazioni con fromTo(), specificando esplicitamente lo stato finale.',
      },
      {
        type: 'user',
        text: 'Come funziona Row Level Security in PostgreSQL?',
      },
      {
        type: 'ai',
        text: 'RLS è una feature di PostgreSQL che filtra automaticamente le righe in base all\'utente autenticato. Ogni policy SQL valuta se l\'utente ha accesso a una riga specifica. Con Supabase, auth.uid() restituisce l\'ID dell\'utente loggato.',
      },
      {
        type: 'action',
        text: 'Ho implementato le policy RLS su tutte le tabelle, con CHECK constraints e trigger per l\'audit.',
      },
    ],
  },
  {
    title: 'Cosa ho imparato',
    subtitle: 'Lezioni dal dialogo con l\'AI',
    messages: [
      {
        type: 'user',
        text: 'Non funziona! Errore strano in console.',
      },
      {
        type: 'ai',
        text: 'Ho bisogno di più dettagli: quale file, quale riga, qual è l\'errore esatto?',
      },
      {
        type: 'action',
        text: 'Ho imparato a formulare domande precise: contesto, codice, errore, cosa ho già provato.',
      },
      {
        type: 'user',
        text: 'L\'AI suggerisce di usare Zustand per lo stato. È la scelta giusta?',
      },
      {
        type: 'ai',
        text: 'Zustand è leggero e semplice, ma React Query gestisce già lo stato server. Per lo stato client, valuta se serve davvero un altro store.',
      },
      {
        type: 'action',
        text: 'Ho imparato a non fidarmi ciecamente: ogni suggerimento va valutato nel contesto del progetto.',
      },
    ],
  },
  {
    title: 'Cosa l\'AI non può fare',
    subtitle: 'Il confine dell\'assistente',
    messages: [
      {
        type: 'user',
        text: 'Devo scegliere tra Firebase e Supabase. Quale è meglio?',
      },
      {
        type: 'ai',
        text: 'Entrambe hanno pro e contro. Firebase ha un ecosistema più maturo, Supabase offre PostgreSQL open-source con RLS. Dipende dai tuoi requisiti specifici.',
      },
      {
        type: 'action',
        text: 'L\'AI non può decidere per me: solo io conosco il contesto (scuola, palestra, maturità). Ho scelto Supabase per RLS e PostgreSQL.',
      },
      {
        type: 'user',
        text: 'L\'app va usata in palestra con le mani sudate. Come devo progettare l\'UI?',
      },
      {
        type: 'ai',
        text: 'Touch targets di almeno 48px, contrasti elevati, gesture grandi. Questi sono principi generali di mobile UX.',
      },
      {
        type: 'action',
        text: 'L\'AI non può provare l\'app in palestra: solo testandola ho capito che servivano pulsanti più grandi e feedback aptici.',
      },
    ],
  },
];

function ChatBubble({ message, index }) {
  const isUser = message.type === 'user';
  const isAction = message.type === 'action';

  if (isAction) {
    return (
      <div className="flex items-center gap-3 my-4 py-3 px-5 bg-accent/5 rounded-2xl border-l-4 border-accent">
        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <User size={16} weight="fill" className="text-accent-dark" />
        </div>
        <p className="text-sm text-zinc-700 leading-relaxed">{message.text}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-zinc-900' : 'bg-accent/10'
        }`}
      >
        {isUser ? (
          <User size={16} weight="fill" className="text-white" />
        ) : (
          <Robot size={16} weight="fill" className="text-accent-dark" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-5 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-zinc-900 text-white rounded-[2rem_2rem_0.5rem_2rem]'
            : 'bg-white border border-zinc-200 text-zinc-700 rounded-[2rem_2rem_2rem_0.5rem] shadow-sm'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default function RuoloAI() {
  const sectionRef = useRef(null);
  const blocksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ai-heading > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ai-heading',
          start: 'top 80%',
        },
      });

      blocksRef.current.forEach((block, i) => {
        gsap.from(block, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          },
        });

        const bubbles = block.querySelectorAll('.chat-bubble');
        gsap.from(bubbles, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ai" ref={sectionRef} className="py-32 md:py-40 bg-zinc-50">
      <div className="max-w-wrapper mx-auto px-6">
        <div className="ai-heading mb-16 md:mb-24 md:pr-[20vw]">
          <p className="text-sm font-medium text-accent-dark tracking-wide uppercase mb-4">
            Intelligenza Artificiale
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-tight text-zinc-900 mb-6">
            Il ruolo dell'AI nello sviluppo
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch]">
            L'AI non ha scritto il codice al posto mio, ma è stata un
            acceleratore di apprendimento. Ogni risposta è stata un'occasione
            per capire il "perché" dietro il "come".
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {conversations.map((conv, blockIndex) => (
            <div
              key={conv.title}
              ref={(el) => (blocksRef.current[blockIndex] = el)}
            >
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight mb-2">
                  {conv.title}
                </h3>
                <p className="text-sm text-zinc-500">{conv.subtitle}</p>
              </div>

              <div className="max-w-2xl">
                {conv.messages.map((msg, msgIndex) => (
                  <div key={msgIndex} className="chat-bubble">
                    <ChatBubble message={msg} index={msgIndex} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
