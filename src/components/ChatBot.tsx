import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatBot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: t('bot_welcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([{ role: 'bot', content: t('bot_welcome') }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `Вы — вежливый и профессиональный администратор премиального барбершопа "ARISTOCRAT" в Москве на Тверской. 
          Текущий язык интерфейса: ${language.toUpperCase()}. 
          Отвечайте на том языке, на котором к вам обращается клиент. Если язык непонятен — используйте русский или английский.
          Ваша цель — отвечать на вопросы клиентов об услугах, мастерах, ценах и атмосфере. Вы звучите уверенно, спокойно и гостеприимно. Используйте вежливое обращение. Кратко отвечайте на вопросы. 
          Если спрашивают про запись — советуйте нажать кнопку "Записаться" на сайте. 
          Вы знаете, что у нас есть: Мужская стрижка (3000р), Моделирование бороды (2000р), Топ-Барберы Александр, Виктор и Максим. Мы работаем с 10:00 до 22:00.`,
        }
      });

      const botResponse = response.text || 'Извините, произошла небольшая заминка. Попробуйте еще раз или позвоните нам напрямую.';
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Error connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-gold text-background rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors duration-300"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-surface border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gold p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-background/20 overflow-hidden bg-background flex items-center justify-center">
                  <Bot size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-background font-serif font-bold tracking-wider leading-none">ARISTOCRAT</h4>
                  <span className="text-[10px] text-background/60 uppercase tracking-widest font-bold">Bot Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-background/50 hover:text-background">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${m.role === 'user' ? 'bg-gold text-background' : 'bg-background border border-white/10 text-gold'}`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-gold/10 text-gold rounded-tr-none' : 'bg-background border border-white/5 text-zinc-300 rounded-tl-none font-light'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-gold">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-white/5 text-gold flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs uppercase tracking-widest font-bold">{t('bot_typing')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-background/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('bot_placeholder')}
                  className="flex-1 bg-surface border border-white/10 p-3 text-sm focus:outline-none focus:border-gold transition-colors font-light text-white"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 bg-gold text-background flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[9px] text-zinc-600 mt-2 text-center uppercase tracking-widest">
                AI Assistant Powered by Gemini
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
