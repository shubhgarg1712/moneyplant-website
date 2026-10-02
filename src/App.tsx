import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { Services } from './components/Services';
import { WhyMoneyPlant } from './components/WhyMoneyPlant';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { FinancialCalculators } from './components/FinancialCalculators';
import { BankingNetwork } from './components/BankingNetwork';
import { FinancialEducation } from './components/FinancialEducation';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-fresh/30 selection:text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Services />
        <WhyMoneyPlant />
        <HowItWorks />
        <AboutSection />
        <FinancialCalculators />
        <BankingNetwork />
        <FinancialEducation />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
