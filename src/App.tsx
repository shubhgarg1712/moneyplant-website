import { useState, useEffect } from 'react';
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
import { BottomBankMarquee } from './components/BottomBankMarquee';

export function App() {
  const [isBankingSectionVisible, setIsBankingSectionVisible] = useState(false);

  useEffect(() => {
    const bankingElement = document.getElementById('banking-network');
    if (!bankingElement) return;

    // Use IntersectionObserver with rootMargin to smoothly anticipate entry/exit
    // without flickering or abrupt jumps.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBankingSectionVisible(entry.isIntersecting);
      },
      {
        rootMargin: '-60px 0px -80px 0px',
        threshold: 0,
      }
    );

    observer.observe(bankingElement);

    return () => {
      observer.disconnect();
    };
  }, []);

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
      <BottomBankMarquee isVisible={!isBankingSectionVisible} />
      <WhatsAppButton isBottomMarqueeVisible={!isBankingSectionVisible} />
    </div>
  );
}

export default App;
