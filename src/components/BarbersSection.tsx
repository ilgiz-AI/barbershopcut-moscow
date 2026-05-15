import React from 'react';
import { motion } from 'motion/react';
import { BARBERS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export default function BarbersSection() {
  const { t } = useLanguage();

  return (
    <section id="barbers" className="py-24 bg-surface border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">{t('barbers_subtitle')}</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">{t('barbers_title')}</h2>
          <div className="w-20 h-[1px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BARBERS.map((barber, idx) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={barber.image} 
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">{barber.role}</span>
                  <h3 className="font-serif text-2xl tracking-wide">{barber.name}</h3>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-light px-4 text-center group-hover:text-zinc-300 transition-colors">
                {barber.description}
              </p>
              <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="text-xs uppercase tracking-widest border border-gold/30 px-6 py-2 hover:bg-gold hover:text-background transition-all">
                  {t('barbers_btn')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
