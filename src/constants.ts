
import type { Service, Location } from './types';

export const MAIN_SERVICES: Service[] = [
  { id: 1, name: 'Micropigmentación Técnica Natural', description: 'Cejas perfectas con un acabado hiperrealista y natural, pelo a pelo.', price: 350, duration: 90 },
  { id: 2, name: 'Micropigmentación Técnica Tradicional', description: 'Un look más definido y maquillado con nuestra técnica de sombreado.', price: 300, duration: 90 },
  { id: 3, name: 'Mantenimiento microblading', description: 'Retoque anual para mantener la forma y el color de tu micropigmentación.', price: 150, duration: 90 },
  { id: 4, name: 'Remoción Láser', description: 'Corrección o eliminación de pigmentos no deseados de forma segura.', price: 250, duration: 90 }
];

export const ADDON_SERVICES: Service[] = [
  { id: 101, name: 'Rizado de Pestañas', description: 'Curva tus pestañas naturales para una mirada más abierta.', price: 50, duration: 0 },
  { id: 102, name: 'Extensiones de Pestañas', description: 'Añade volumen y longitud para una mirada impactante.', price: 120, duration: 0 },
  { id: 103, name: 'Lifting de Pestañas', description: 'Alarga y eleva tus pestañas desde la raíz para un efecto natural.', price: 150, duration: 0 }
];

export const LOCATIONS: Location[] = [
  { id: 1, name: 'Jesus Maria', address: 'Av. Gral. Juan Antonio Álvarez de Arenales 1245' },
  { id: 2, name: 'Bellavista', address: 'Av. Oscar r Benavides 1150' }
];

export const TIME_SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];
