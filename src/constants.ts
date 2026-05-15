import { Service, Barber } from './types';

export const SERVICES: Service[] = [
  { id: 'h1', name: 'Мужская стрижка', price: 3000, duration: '60 мин', category: 'hair' },
  { id: 'h2', name: 'Укладка', price: 1500, duration: '30 мин', category: 'hair' },
  { id: 'b1', name: 'Моделирование бороды', price: 2000, duration: '45 мин', category: 'beard' },
  { id: 'b2', name: 'Бритье опасной бритвой', price: 2500, duration: '45 мин', category: 'beard' },
  { id: 'c1', name: 'Стрижка + Борода', price: 4500, duration: '90 мин', category: 'combo' },
  { id: 's1', name: 'SPA-уход для лица', price: 2500, duration: '40 мин', category: 'spa' },
];

export const BARBERS: Barber[] = [
  { 
    id: '1', 
    name: 'Александр Романов', 
    role: 'Топ-Барбер', 
    image: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?auto=format&fit=crop&q=80&w=400',
    description: 'Мастер классических форм и безупречных переходов.'
  },
  { 
    id: '2', 
    name: 'Виктор Той', 
    role: 'Барбер-стилист', 
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    description: 'Специалист по креативным стрижкам и моделированию бороды.'
  },
  { 
    id: '3', 
    name: 'Максим Белый', 
    role: 'Ведущий мастер', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    description: 'Более 10 лет в индустрии. Знает о мужском стиле всё.'
  },
];

export const LOCATION = {
  address: 'Москва, ул. Тверская, 12, стр. 1',
  phone: '+7 (495) 123-45-67',
  hours: 'Пн-Вс: 10:00 — 22:00',
};
