
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  dni: string;
}

export const AppStep = {
  DIAGNOSIS: 0,
  SERVICE_SELECTION: 1,
  LOCATION_DATETIME: 2,
  CART_REVIEW: 3,
  CHECKOUT: 4,
  CONFIRMATION: 5,
} as const;

export type AppStep = (typeof AppStep)[keyof typeof AppStep];