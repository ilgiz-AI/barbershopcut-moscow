export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: 'hair' | 'beard' | 'combo' | 'spa';
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface Booking {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
}
