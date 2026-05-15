import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect or overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-110 animate-subtle-zoom"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000")',
          filter: 'brightness(0.3) saturate(1.2)'
        }}
      />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-10" />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gold uppercase tracking-[0.6em] text-[10px] md:text-xs font-semibold mb-6 block">
            {t('hero_subtitle')}
          </span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight leading-none uppercase">
            {t('hero_title_1')} <br />
            <span className="italic text-gold">{t('hero_title_italic')}</span> {t('hero_title_2')}
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed tracking-wide mb-12 font-light">
            {t('hero_desc')}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-gold text-background px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-500 w-full md:w-auto">
              {t('hero_btn_online')}
            </button>
            <button className="border border-white/20 px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all duration-500 w-full md:w-auto">
              {t('hero_btn_services')}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-gold/50" />
      </div>

      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate linear;
        }
      `}</style>
    </section>
  );
}
