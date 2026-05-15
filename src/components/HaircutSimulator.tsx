import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Sparkles, Loader2, Scissors, CheckCircle2, Wand2, ArrowLeft, Download, Video, Key } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface HaircutSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StyleOption {
  id: string;
  titleKey: string;
}

const STYLES: StyleOption[] = [
  { id: 'undercut', titleKey: 'style_undercut' },
  { id: 'fade', titleKey: 'style_fade' },
  { id: 'pompadour', titleKey: 'style_pompadour' },
  { id: 'sidepart', titleKey: 'style_sidepart' },
  { id: 'buzzcut', titleKey: 'style_buzzcut' },
  { id: 'manbun', titleKey: 'style_manbun' },
  { id: 'topknot', titleKey: 'style_topknot' },
  { id: 'crop', titleKey: 'style_crop' },
];

export default function HaircutSimulator({ isOpen, onClose }: HaircutSimulatorProps) {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [visualPreview, setVisualPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkApiKey = async () => {
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setApiKeyReady(hasKey);
      return hasKey;
    } catch (err) {
      return false;
    }
  };

  const handleSelectKey = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      setApiKeyReady(true);
    } catch (err) {
      console.error('Key selection error:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVisualPreview(null);
        setSelectedStyle(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTryOnImage = async (style: StyleOption) => {
    if (!image) return;
    setIsGenerating(true);
    setSelectedStyle(style);
    setVideoPreview(null);
    setError(null);

    try {
      const localAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const base64Data = image.split(',')[1];
      
      const response = await localAi.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [
          {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: 'image/jpeg',
                },
              },
              {
                text: `Maintain the same person's identity and face but change their haircut to exactly this style: "${t(style.titleKey)}". 
                The outcome should be a high-quality, photorealistic portrait from a professional premium barbershop. 
                The person should look like they just got a fresh cut at Aristocrat Barbershop. 
                Focus on natural hair blending and realistic lighting.`,
              },
            ],
          },
        ],
      });

      let foundImage = false;
      const candidates = response.candidates;
      
      if (candidates?.[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            setVisualPreview(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error('Image not generated');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(t('ai_error'));
      setSelectedStyle(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTryOnVideo = async (style: StyleOption) => {
    if (!image) return;

    const hasKey = await checkApiKey();
    if (!hasKey) {
      setError(t('ai_key_required'));
      return;
    }

    setIsVideoGenerating(true);
    setSelectedStyle(style);
    setVisualPreview(null);
    setError(null);

    try {
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
      const localAi = new GoogleGenAI({ apiKey });
      const base64Data = image.split(',')[1];
      
      let operation = await localAi.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: `A profile video of a person showing off their new "${t(style.titleKey)}" haircut in a luxury barbershop. The person turns their head slightly to show the detail of the cut. Maintain the identity of the person in the provided image. High quality cinematic lighting.`,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/jpeg',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      while (!operation.done) {
        // Poll every 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await (localAi as any).operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = (operation as any).response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });
        const videoBlob = await videoResponse.blob();
        setVideoPreview(URL.createObjectURL(videoBlob));
      } else {
        throw new Error('Video not generated');
      }
    } catch (err) {
      console.error('Video generation error:', err);
      setError(t('ai_error'));
      setSelectedStyle(null);
    } finally {
      setIsVideoGenerating(false);
    }
  };

  const handleBack = () => {
    setVisualPreview(null);
    setVideoPreview(null);
    setSelectedStyle(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-surface border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[850px]"
          >
            {/* Close Button Mobile */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-[210] md:hidden"
            >
              <X size={20} />
            </button>

            {/* Left Side: Upload/Preview */}
            <div className="md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center bg-background/50 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 text-zinc-500 hover:text-white transition-colors z-10 hidden md:block"
              >
                <X size={24} />
              </button>

              <div className="w-full h-full flex flex-col">
                {!image ? (
                  <div 
                    className="w-full h-full border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 text-center group hover:border-gold/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Upload className="text-gold" size={32} />
                    </div>
                    <h3 className="font-serif text-2xl mb-4 text-white">{t('ai_upload')}</h3>
                    <p className="text-zinc-500 text-sm max-w-xs">{t('ai_desc')}</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                    />
                  </div>
                ) : (
                  <div className="flex-1 relative flex flex-col min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={visualPreview || 'original'}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 relative rounded-2xl overflow-hidden border border-white/10"
                      >
                        {videoPreview ? (
                          <video 
                            src={videoPreview} 
                            autoPlay 
                            loop 
                            controls 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <img 
                            src={visualPreview || image} 
                            alt="Preview" 
                            className={`w-full h-full object-cover transition-all duration-700 ${isGenerating || isVideoGenerating ? 'blur-xl grayscale' : ''}`} 
                          />
                        )}
                        
                        {(isGenerating || isVideoGenerating) && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm">
                            <div className="w-24 h-24 relative mb-6">
                              <motion.div 
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent rounded-full"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                {isVideoGenerating ? (
                                  <Video className="text-gold animate-pulse" size={32} />
                                ) : (
                                  <Scissors className="text-gold animate-bounce" size={32} />
                                )}
                              </div>
                            </div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold animate-pulse text-center px-6">
                              {isVideoGenerating ? t('ai_video_generating') : t('ai_generating')}
                            </p>
                            {isVideoGenerating && (
                              <p className="text-[10px] text-zinc-400 mt-4 animate-pulse">{t('ai_video_wait')}</p>
                            )}
                          </div>
                        )}

                        {(visualPreview || videoPreview) && !(isGenerating || isVideoGenerating) && (
                          <div className="absolute top-4 left-4 bg-gold text-background px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                            {videoPreview ? 'AI Video' : 'AI Shot'}
                          </div>
                        )}

                        <div className="absolute bottom-4 right-4 flex gap-2">
                           {(visualPreview || videoPreview) && (
                            <button 
                              className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 text-white transition-colors"
                              title="Download"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = videoPreview || visualPreview || '';
                                link.download = videoPreview ? 'barber-simulation.mp4' : 'barber-simulation.png';
                                link.click();
                              }}
                            >
                              <Download size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setImage(null);
                              setVisualPreview(null);
                              setVideoPreview(null);
                              setSelectedStyle(null);
                            }}
                            className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-red-500 text-white transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Styles Catalog */}
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto scrollbar-thin bg-surface">
              {!image ? (
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-12">
                    <h2 className="font-serif text-4xl mb-6 text-white">{t('ai_title')}</h2>
                    <div className="w-20 h-[1px] bg-gold" />
                  </div>
                  <div className="space-y-10">
                    {[
                      { icon: Scissors, title: "Выберите стиль", text: "Просто загрузите фото и выберите любую стрижку из нашего каталога." },
                      { icon: Wand2, title: "ИИ Визуализация", text: "Наша нейросеть примерит выбранную стрижку на ваше лицо в реальном времени." },
                      { icon: CheckCircle2, title: "Готовый результат", text: "Сохраните результат и покажите его вашему барберу при посещении." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                        <div className="w-12 h-12 bg-surface border border-white/10 flex items-center justify-center flex-shrink-0 text-gold rounded-lg shadow-inner">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-serif text-lg mb-1">{item.title}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed font-light">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {visualPreview || videoPreview ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col"
                    >
                      <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-zinc-500 hover:text-gold transition-colors mb-8 text-xs uppercase tracking-widest font-bold"
                      >
                        <ArrowLeft size={16} />
                        {t('ai_back')}
                      </button>
                      
                      <div className="flex-1">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
                          ВЫБРАННЫЙ СТИЛЬ
                        </span>
                        <h3 className="font-serif text-4xl mb-6 text-white">{t(selectedStyle?.titleKey || '')}</h3>
                        <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                          {videoPreview ? t('ai_video_desc') : t('ai_preview_desc')}
                        </p>
                        
                        <div className="p-8 bg-background border border-gold/20 rounded-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
                          <h4 className="text-gold font-serif text-2xl mb-4">{t(selectedStyle?.titleKey || '')}</h4>
                          <p className="text-zinc-400 text-sm italic font-light leading-relaxed">
                            {videoPreview 
                              ? 'Это видео показывает, как стрижка будет смотреться в движении. Обсудите детали с вашим барбером.'
                              : 'Эта стрижка подчеркнет ваш характер. Сохраните это изображение, чтобы обсудить детали с вашим барбером в Aristocrat.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 flex flex-col gap-4">
                        <button
                          className="w-full bg-gold text-background py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-white transition-all shadow-xl"
                        >
                          Записаться на эту стрижку
                        </button>
                        <p className="text-[9px] text-zinc-600 text-center uppercase tracking-widest">
                          * Результат является симуляцией искусственного интеллекта
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="mb-6 flex justify-between items-end">
                        <div>
                          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">
                            КАТАЛОГ СТИЛЕЙ
                          </span>
                          <h3 className="font-serif text-3xl text-white">Выберите стрижку</h3>
                        </div>
                        
                        {/* API Key Status for Video */}
                        {!apiKeyReady && (
                          <button 
                            onClick={handleSelectKey}
                            className="flex items-center gap-2 text-gold hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold border border-gold/30 px-3 py-2 rounded-lg bg-gold/5"
                          >
                            <Key size={12} />
                            {t('ai_select_key')}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 flex-1 scrollbar-thin overflow-y-auto pr-2">
                        {STYLES.map((style, i) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={style.id} 
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all group relative overflow-hidden ${
                              selectedStyle?.id === style.id 
                                ? 'border-gold bg-gold/10' 
                                : 'border-white/5 bg-background hover:border-gold/30'
                            }`}
                          >
                            <div className="relative z-10">
                              <h4 className={`font-serif text-lg ${selectedStyle?.id === style.id ? 'text-gold' : 'text-zinc-300 group-hover:text-gold'}`}>
                                {t(style.titleKey)}
                              </h4>
                            </div>
                            
                            <div className="flex gap-2 relative z-10">
                               <button
                                 onClick={() => !(isGenerating || isVideoGenerating) && generateTryOnImage(style)}
                                 disabled={isGenerating || isVideoGenerating}
                                 className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 text-zinc-500 hover:text-gold hover:border-gold/50 transition-all"
                                 title={t('ai_visual_tryon')}
                               >
                                 {selectedStyle?.id === style.id && isGenerating ? (
                                   <Loader2 size={16} className="text-gold animate-spin" />
                                 ) : (
                                   <Wand2 size={16} />
                                 )}
                               </button>

                               <button
                                 onClick={() => !(isGenerating || isVideoGenerating) && generateTryOnVideo(style)}
                                 disabled={isGenerating || isVideoGenerating}
                                 className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 text-zinc-500 hover:text-gold hover:border-gold/50 transition-all relative overflow-hidden"
                                 title={t('ai_video_tryon')}
                               >
                                 {selectedStyle?.id === style.id && isVideoGenerating ? (
                                   <Loader2 size={16} className="text-gold animate-spin" />
                                 ) : (
                                   <Video size={16} />
                                 )}
                                 {!apiKeyReady && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold rounded-full" />}
                               </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="pt-6">
                        <div className="bg-gold/5 border border-gold/10 p-3 rounded-lg flex gap-3 items-center">
                          <Sparkles className="text-gold shrink-0" size={14} />
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                            {t('ai_video_desc')} Для видео требуется платный ключ.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="absolute bottom-10 left-10 right-10 bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-xs text-center rounded-lg backdrop-blur-md animate-bounce z-[220]">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
