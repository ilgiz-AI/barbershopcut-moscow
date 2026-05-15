import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'en' | 'kg';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  nav_services: { ru: 'Услуги', en: 'Services', kg: 'Кызматтар' },
  nav_masters: { ru: 'Мастера', en: 'Masters', kg: 'Мастерлер' },
  nav_gallery: { ru: 'Галерея', en: 'Gallery', kg: 'Галерея' },
  nav_contacts: { ru: 'Контакты', en: 'Contacts', kg: 'Байланыштар' },
  nav_book: { ru: 'Записаться', en: 'Book Now', kg: 'Жазылуу' },

  // Hero
  hero_subtitle: { ru: 'EST. 2012 • МОСКВА', en: 'EST. 2012 • MOSCOW', kg: '2012-Ж. БЕРИ • МОСКВА' },
  hero_title_1: { ru: 'Искусство', en: 'The Art of', kg: 'Эркектердин' },
  hero_title_italic: { ru: 'мужского', en: 'Male', kg: 'стилинин' },
  hero_title_2: { ru: 'стиля', en: 'Style', kg: 'искусствосу' },
  hero_desc: { 
    ru: 'Премиальный барбершоп в центре Москвы. Безупречный сервис, лучшие мастера и атмосфера закрытого мужского клуба.', 
    en: 'Premium barbershop in the center of Moscow. Impeccable service, best masters and the atmosphere of a private men\'s club.', 
    kg: 'Москванын борборундагы премиум барбершоп. Кынтыксыз тейлөө, мыкты мастерлер жана жабык эркектер клубунун атмосферасы.' 
  },
  hero_btn_online: { ru: 'Запись онлайн', en: 'Book Online', kg: 'Онлайн жазылуу' },
  hero_btn_services: { ru: 'Наши услуги', en: 'Our Services', kg: 'Биздин кызматтар' },

  // About
  about_years: { ru: 'Лет безупречной репутации', en: 'Years of impeccable reputation', kg: 'Жылдык кынтыксыз репутация' },
  about_traditions: { ru: 'ТРАДИЦИИ', en: 'TRADITIONS', kg: 'САЛТТАР' },
  about_title_1: { ru: 'Больше чем просто', en: 'More than just a', kg: 'Жөн гана' },
  about_title_italic: { ru: 'парикмахерская', en: 'barbershop', kg: 'чач тарач' },
  about_title_2: { ru: '', en: '', kg: 'эмес' },
  about_desc: {
    ru: 'ARISTOCRAT — это место, где объединяются вековые традиции классического бритья и современные техники мужских стрижек. Мы создали пространство для мужчин, которые ценят качество, время и безупречный стиль.',
    en: 'ARISTOCRAT is a place where centuries-old traditions of classical shaving and modern techniques of men\'s haircuts unite. We have created a space for men who value quality, time and impeccable style.',
    kg: 'ARISTOCRAT — бул классикалык сакал алуунун кылымдык салттары жана эркектердин чач жасалгасынын заманбап ыкмалары бириккен жай. Биз сапатты, убакытты жана кынтыксыз стилди баалаган мырзалар үчүн мейкиндик түздүк.'
  },
  about_drinks: { ru: 'Напитки', en: 'Drinks', kg: 'Суусундуктар' },
  about_drinks_desc: { ru: 'Премиальный виски и свежеобжаренный кофе для гостей.', en: 'Premium whiskey and freshly roasted coffee for guests.', kg: 'Коноктор үчүн премиум виски жана жаңы куурулган кофе.' },
  about_cosmetics: { ru: 'Косметика', en: 'Cosmetics', kg: 'Косметика' },
  about_cosmetics_desc: { ru: 'Используем только лучшие мировые бренды мужского ухода.', en: 'We use only the best world brands of men\'s care.', kg: 'Биз эркектерге кам көрүү боюнча дүйнөлүк мыкты бренддерди гана колдонобуз.' },

  // Services
  services_pricelist: { ru: 'ПРАЙС-ЛИСТ', en: 'PRICE LIST', kg: 'БААЛАР ТИЗМЕСИ' },
  services_title: { ru: 'Услуги и цены', en: 'Services & Prices', kg: 'Кызматтар жана баалар' },
  services_desc: { 
    ru: 'Мы используем только премиальную косметику и инструменты, чтобы обеспечить безупречный результат и ваш комфорт.', 
    en: 'We use only premium cosmetics and tools to ensure an impeccable result and your comfort.', 
    kg: 'Биз кынтыксыз жыйынтыкты жана сиздин ыңгайлуулугуңузду камсыз кылуу үчүн премиум косметиканы жана куралдарды гана колдонобуз.' 
  },
  services_cat_hair: { ru: 'Волосы', en: 'Hair', kg: 'Чач' },
  services_cat_beard: { ru: 'Борода', en: 'Beard', kg: 'Сакал' },
  services_cat_combo: { ru: 'Комбо', en: 'Combo', kg: 'Комбо' },
  services_cat_spa: { ru: 'Уход', en: 'Spa', kg: 'Кам көрүү' },
  services_not_found: { ru: 'Не нашли нужную услугу?', en: 'Didn\'t find what you need?', kg: 'Керектүү кызматты тапкан жоксузбу?' },
  services_not_found_desc: { 
    ru: 'Наши мастера готовы обсудить индивидуальные пожелания и предложить персональный уход.', 
    en: 'Our masters are ready to discuss individual wishes and offer personal care.', 
    kg: 'Биздин мастерлер жеке каалоолорду талкуулоого жана жеке кам көрүүнү сунуштоого даяр.' 
  },
  services_contact_us: { ru: 'Связаться с нами', en: 'Contact Us', kg: 'Биз менен байланышыңыз' },

  // Barbers
  barbers_title: { ru: 'Мастера своего дела', en: 'Masters of the Craft', kg: 'Өз ишинин чеберлери' },
  barbers_subtitle: { ru: 'НАШИ МАСТЕРА', en: 'OUR MASTERS', kg: 'БИЗДИН МАСТЕРЛЕР' },
  barbers_btn: { ru: 'К мастеру', en: 'Book Master', kg: 'Мастерге жазылуу' },

  // CTA
  cta_title: { ru: 'Готовы к преображению?', en: 'Ready for transformation?', kg: 'Өзгөрүүгө даярсызбы?' },
  cta_btn: { ru: 'Записаться сейчас', en: 'Book Now', kg: 'Азыр жазылуу' },

  // Gallery
  gallery_more: { ru: 'Больше фото в Instagram', en: 'More photos on Instagram', kg: 'Инстаграмда көбүрөөк сүрөттөр' },

  // Footer
  footer_desc: { 
    ru: 'Больше чем просто стрижка. Мы создаем образ, подчеркивающий вашу индивидуальность и статус.', 
    en: 'More than just a haircut. We create an image that emphasizes your individuality and status.', 
    kg: 'Жөн гана чач кыркуу эмес. Биз сиздин жеке сапатыңызды жана статусуңузду баса белгилеген образды түзөбүз.' 
  },
  footer_contacts: { ru: 'Контакты', en: 'Contacts', kg: 'Байланыштар' },
  footer_sections: { ru: 'Разделы', en: 'Sections', kg: 'Бөлүмдөр' },
  footer_newsletter: { ru: 'Рассылка', en: 'Newsletter', kg: 'Жазылуу' },
  footer_newsletter_desc: { ru: 'Подпишитесь на наши новости и эксклюзивные предложения.', en: 'Subscribe to our news and exclusive offers.', kg: 'Биздин жаңылыктарга жана эксклюзивдүү сунуштарга жазылыңыз.' },
  footer_email_placeholder: { ru: 'Ваш Email', en: 'Your Email', kg: 'Сиздин Email' },

  // ChatBot
  bot_welcome: { ru: 'Приветствуем в «ARISTOCRAT»! Я ваш персональный помощник. Чем могу помочь?', en: 'Welcome to ARISTOCRAT! I am your personal assistant. How can I help you?', kg: '«ARISTOCRAT» барбершопуна кош келиңиз! Мен сиздин жеке жардамчыңызмын. Кантип жардам бере алам?' },
  bot_typing: { ru: 'Печатает...', en: 'Typing...', kg: 'Жазууда...' },
  bot_placeholder: { ru: 'Ваш вопрос...', en: 'Your question...', kg: 'Сиздин сурооңуз...' },

  // Service Names
  service_h1: { ru: 'Мужская стрижка', en: 'Men\'s Haircut', kg: 'Эркектердин чач кыркуусу' },
  service_h2: { ru: 'Укладка', en: 'Hair Styling', kg: 'Чач жасалгалоо' },
  service_b1: { ru: 'Моделирование бороды', en: 'Beard Grooming', kg: 'Сакалдын формасын келтирүү' },
  service_b2: { ru: 'Бритье опасной бритвой', en: 'Straight Razor Shave', kg: 'Кооптуу устара менен сакал алуу' },
  service_c1: { ru: 'Стрижка + Борода', en: 'Haircut + Beard', kg: 'Чач + Сакал' },
  service_s1: { ru: 'SPA-уход для лица', en: 'Facial SPA Care', kg: 'Бетке SPA кам көрүү' },

  // AI Simulator
  ai_nav: { ru: 'AI Подбор', en: 'AI Try-On', kg: 'AI Тандоо' },
  ai_title: { ru: 'AI Стилист Aristocrat', en: 'Aristocrat AI Stylist', kg: 'Aristocrat AI Стилисти' },
  ai_desc: { ru: 'Загрузите портретное фото, и наш интеллект подберет идеальную стрижку под ваш тип лица.', en: 'Upload a portrait photo, and our AI will select the perfect haircut for your face shape.', kg: 'Портреттик сүрөт жүктөңүз, биздин интеллект сизге идеалдуу келген чач жасалгасын тандап берет.' },
  ai_upload: { ru: 'Загрузить фото', en: 'Upload Photo', kg: 'Сүрөт жүктөө' },
  ai_analyzing: { ru: 'Анализируем черты лица...', en: 'Analyzing facial features...', kg: 'Жүзүңүздүн өзгөчөлүктөрүн талдоодо...' },
  ai_result_title: { ru: 'Ваш идеальный стиль', en: 'Your Perfect Style', kg: 'Сиздин идеалдуу стилиңиз' },
  ai_reset: { ru: 'Попробовать снова', en: 'Try Again', kg: 'Кайра аракет кылуу' },
  ai_error: { ru: 'Не удалось проанализировать фото. Убедитесь, что лицо хорошо видно.', en: 'Could not analyze photo. Make sure the face is clearly visible.', kg: 'Сүрөттү талдоого мүмкүн болгон жок. Жүзүңүз так көрүнүп турганын текшериңиз.' },
  ai_visual_tryon: { ru: 'Визуальная примерка', en: 'Visual Try-On', kg: 'Визуалдык өлчөө' },
  ai_generating: { ru: 'Создаем превью...', en: 'Generating preview...', kg: 'Превью түзүлүүдө...' },
  ai_preview_desc: { ru: 'Модель искусственного интеллекта визуализирует вашу новую стрижку.', en: 'The AI model is visualizing your new haircut.', kg: 'ИИ модели жаңы чач жасалгаңызды визуалдаштырууда.' },
  ai_back: { ru: 'Назад к списку', en: 'Back to list', kg: 'Тизмеге кайтуу' },

  // Simulator Styles
  style_undercut: { ru: 'Андеркат', en: 'Undercut', kg: 'Андеркат' },
  style_fade: { ru: 'Фейд', en: 'Fade', kg: 'Фейд' },
  style_pompadour: { ru: 'Помпадур', en: 'Pompadour', kg: 'Помпадур' },
  style_sidepart: { ru: 'Классический пробор', en: 'Classic Side Part', kg: 'Классикалык бөлүк' },
  style_buzzcut: { ru: 'Базз-кат (короткая)', en: 'Buzz Cut', kg: 'Кыска чач' },
  style_manbun: { ru: 'Пучок (длинные)', en: 'Man Bun', kg: 'Бийик чач' },
  style_topknot: { ru: 'Топ-Кнот', en: 'Top Knot', kg: 'Топ-Кнот' },
  style_crop: { ru: 'Кроп', en: 'French Crop', kg: 'Кроп' },
  ai_video_tryon: { ru: 'Видео примерка', en: 'Video Try-On', kg: 'Видео өлчөө' },
  ai_video_desc: { ru: 'ИИ создаст реалистичное видео с выбранной стрижкой.', en: 'AI will create a realistic video with the selected haircut.', kg: 'ИИ тандалган чач жасалгасы менен реалдуу видео түзөт.' },
  ai_video_generating: { ru: 'Генерируем видео (до 2-3 минут)...', en: 'Generating video (up to 2-3 mins)...', kg: 'Видео түзүлүүдө (2-3 мүнөткө чейин)...' },
  ai_video_wait: { ru: 'Пожалуйста, не закрывайте окно. Мы создаем ваш новый образ.', en: 'Please do not close the window. We are creating your new look.', kg: 'Сураныч, терезени жаппаңыз. Биз сиздин жаңы образыңызды түзүп жатабыз.' },
  ai_select_key: { ru: 'Выбрать API ключ', en: 'Select API Key', kg: 'API ачкычын тандоо' },
  ai_key_required: { ru: 'Для генерации видео требуется платный API ключ Gemini.', en: 'A paid Gemini API key is required for video generation.', kg: 'Видео түзүү үчүн Gemini акы төлөнүүчү API ачкычы талап кылынат.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
