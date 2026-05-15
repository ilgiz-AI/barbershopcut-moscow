import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Scissors, Globe, Sparkles } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAISimulator: () => void;
}

export default function Navbar({ onOpenAISimulator }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_services'), href: '#services' },
    { name: t('nav_masters'), href: '#barbers' },
    { name: t('nav_gallery'), href: '#gallery' },
    { name: t('nav_contacts'), href: '#contacts' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
    { code: 'kg', label: 'KG' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border border-gold flex items-center justify-center rotate-45 group-hover:bg-gold transition-colors duration-500">
            <Scissors className="w-5 h-5 -rotate-45 text-gold group-hover:text-background transition-colors duration-500" />
          </div>
          <span className="font-serif text-2xl tracking-[0.2em] font-medium ml-2">
            ARISTOCRAT
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.3em] hover:text-gold transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-3 border-x border-white/10 px-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] font-bold tracking-widest transition-colors ${
                  language === lang.code ? 'text-gold' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button 
            onClick={onOpenAISimulator}
            className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
          >
            <Sparkles size={14} className="animate-pulse" />
            {t('ai_nav')}
          </button>

          <button className="px-6 py-2 border border-gold text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-background transition-all duration-500">
            {t('nav_book')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
          <div className="flex items-center gap-3">
             {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] font-bold tracking-widest ${
                  language === lang.code ? 'text-gold' : 'text-zinc-500'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <button 
            className="text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden shadow-2xl"
          >
            <button 
              className="absolute top-8 right-8 text-gold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif tracking-[0.2em] hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                onOpenAISimulator();
                setIsMobileMenuOpen(false);
              }}
              className="text-2xl font-serif tracking-[0.2em] text-gold animate-pulse"
            >
              {t('ai_nav')}
            </button>
            <button className="mt-4 px-10 py-4 border border-gold text-gold text-sm uppercase tracking-[0.2em]">
              {t('nav_book')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
