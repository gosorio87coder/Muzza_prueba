
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

export enum AppStep {
  DIAGNOSIS,
  SERVICE_SELECTION,
  LOCATION_DATETIME,
  CART_REVIEW,
  CHECKOUT,
  CONFIRMATION,
}