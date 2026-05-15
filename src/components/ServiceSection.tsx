import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceSection() {
  const { t } = useLanguage();

  const categories = [
    { key: 'hair', label: t('services_cat_hair') },
    { key: 'beard', label: t('services_cat_beard') },
    { key: 'combo', label: t('services_cat_combo') },
    { key: 'spa', label: t('services_cat_spa') },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">{t('services_pricelist')}</span>
            <h2 className="font-serif text-4xl md:text-6xl font-light">{t('services_title')}</h2>
          </div>
          <p className="max-w-md text-zinc-500 text-sm leading-relaxed font-light">
            {t('services_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-serif text-gold italic">0{idx + 1}</span>
                <h3 className="uppercase tracking-[0.3em] font-semibold text-sm">{cat.label}</h3>
                <div className="flex-1 h-[1px] bg-white/10 group-hover:bg-gold/30 transition-colors" />
              </div>

              <div className="space-y-6">
                {SERVICES.filter(s => s.category === cat.key).map((service) => (
                  <div key={service.id} className="flex justify-between items-end group/item cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-serif group-hover/item:text-gold transition-colors">
                          {t(`service_${service.id}`)}
                        </span>
                        <div className="flex-1 border-b border-dashed border-white/10 mb-1" />
                      </div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{service.duration}</span>
                    </div>
                    <div className="pl-6 text-right">
                      <span className="font-serif text-xl">{service.price} ₽</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 border border-white/5 bg-surface/50 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
          <div className="relative z-10">
            <h4 className="font-serif text-3xl mb-4 italic">{t('services_not_found')}</h4>
            <p className="text-zinc-500 mb-8 max-w-lg mx-auto text-sm">
              {t('services_not_found_desc')}
            </p>
            <button className="text-gold text-xs uppercase tracking-[0.3em] font-bold border-b border-gold pb-1 hover:text-white hover:border-white transition-colors">
              {t('services_contact_us')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
