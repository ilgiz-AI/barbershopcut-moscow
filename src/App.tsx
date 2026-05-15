import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import BarbersSection from './components/BarbersSection';
import MapSection from './components/MapSection';
import ChatBot from './components/ChatBot';
import HaircutSimulator from './components/HaircutSimulator';
import Footer from './components/Footer';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const { t } = useLanguage();
  const [isAISimulatorOpen, setIsAISimulatorOpen] = React.useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background selection:bg-gold selection:text-background text-zinc-100">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Decorative background noise / grain effect */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <Navbar onOpenAISimulator={() => setIsAISimulatorOpen(true)} />
      
      <main>
        <Hero />
        
        {/* About Short Section */}
        <section className="py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-square border border-gold/20 p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1599351431202-1e0f013d899a?auto=format&fit=crop&q=80&w=1000" 
                    alt="Barbershop Atmosphere" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-surface p-8 border border-white/5 hidden md:block">
                  <span className="text-gold text-5xl font-serif mb-4 block italic leading-none">12+</span>
                  <p className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400">{t('about_years')}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">{t('about_traditions')}</span>
                <h2 className="font-serif text-4xl md:text-6xl font-light mb-8 leading-tight">
                  {t('about_title_1')} <br /><span className="italic text-gold">{t('about_title_italic')}</span> {t('about_title_2')}
                </h2>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 font-light tracking-wide">
                  {t('about_desc')}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="uppercase tracking-widest text-xs font-bold mb-2">{t('about_drinks')}</h4>
                    <p className="text-zinc-600 text-xs font-light">{t('about_drinks_desc')}</p>
                  </div>
                  <div>
                    <h4 className="uppercase tracking-widest text-xs font-bold mb-2">{t('about_cosmetics')}</h4>
                    <p className="text-zinc-600 text-xs font-light">{t('about_cosmetics_desc')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ServiceSection />
        
        {/* Parallax / CTA Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512690196252-7396ef5ba866?auto=format&fit=crop&q=80&w=2000")' }}
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h3 className="font-serif text-4xl md:text-7xl italic font-light mb-10">{t('cta_title')}</h3>
            <button className="bg-gold text-background px-12 py-5 text-sm uppercase tracking-[0.4em] font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95 duration-500">
              {t('cta_btn')}
            </button>
          </div>
        </section>

        <BarbersSection />
        <MapSection />

        {/* Gallery Preview */}
        <section id="gallery" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1621605815841-2ae28170c0c1?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1622286332618-f281a8281564?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square overflow-hidden group border border-white/5"
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="text-xs uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-1 hover:text-gold hover:border-gold transition-colors">
                {t('gallery_more')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />
      <HaircutSimulator isOpen={isAISimulatorOpen} onClose={() => setIsAISimulatorOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
