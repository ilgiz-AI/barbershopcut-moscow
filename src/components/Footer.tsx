import React from 'react';
import { Scissors, MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { LOCATION } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contacts" className="pt-24 pb-12 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 border border-gold flex items-center justify-center rotate-45">
                <Scissors className="w-4 h-4 -rotate-45 text-gold" />
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-medium ml-2 text-white">
                ARISTOCRAT
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">{t('footer_contacts')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-zinc-600 mt-1" />
                <span className="text-sm text-zinc-400 font-light">{LOCATION.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-zinc-600" />
                <span className="text-sm text-zinc-400 font-light">{LOCATION.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock size={18} className="text-zinc-600" />
                <span className="text-sm text-zinc-400 font-light">{LOCATION.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">{t('footer_sections')}</h4>
            <ul className="space-y-4">
              {[t('nav_services'), t('nav_masters'), t('nav_gallery'), t('nav_contacts')].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-gold transition-colors font-light tracking-wide">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">{t('footer_newsletter')}</h4>
            <p className="text-sm text-zinc-500 mb-6 font-light">{t('footer_newsletter_desc')}</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder={t('footer_email_placeholder')}
                className="w-full bg-surface border border-white/10 py-3 px-4 text-sm focus:outline-none focus:border-gold transition-colors font-light text-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold text-xs uppercase font-bold tracking-widest px-2">
                Ok
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            © 2026 ARISTOCRAT Moscow. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
