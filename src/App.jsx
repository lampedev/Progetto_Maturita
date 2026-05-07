import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PerchéQuestoProgetto from './components/PerchéQuestoProgetto';
import Requisiti from './components/Requisiti';
import Architettura from './components/Architettura';
import Sicurezza from './components/Sicurezza';
import DatabaseDesign from './components/DatabaseDesign';
import StateManagement from './components/StateManagement';
import TechStackDeep from './components/TechStackDeep';
import Iterazioni from './components/Iterazioni';
import InterfacciaUI from './components/InterfacciaUI';
import RuoloAI from './components/RuoloAI';
import KineticMarquee from './components/KineticMarquee';
import CosaHoImparato from './components/CosaHoImparato';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <PerchéQuestoProgetto />
        <Requisiti />
        <Architettura />
        <Sicurezza />
        <DatabaseDesign />
        <StateManagement />
        <TechStackDeep />
        <Iterazioni />
        <InterfacciaUI />
        <RuoloAI />
        <KineticMarquee />
        <CosaHoImparato />
      </main>
      <Footer />
    </div>
  );
}

export default App;
