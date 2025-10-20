import React from 'react';
import type { BookingDetails, Service, Location } from '../types';

interface ConfirmationProps {
  bookingDetails: BookingDetails | null;
  service: Service | null;
  addons: Service[];
  location: Location | null;
  dateTime: { date: Date; time: string } | null;
  total: number;
  onReset: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  bookingDetails,
  service,
  addons,
  location,
  dateTime,
  total,
  onReset,
}) => {
  if (!bookingDetails || !service || !location || !dateTime) {
    return (
      <div className="text-center p-12">
        <h2 className="text-xl font-bold text-red-600">Error al cargar la confirmación.</h2>
        <p className="text-gray-600 mt-4">Faltan datos de la reserva. Por favor, intente de nuevo.</p>
        <button
          onClick={onReset}
          className="mt-8 px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark transition-colors duration-300"
        >
          Hacer una Nueva Reserva
        </button>
      </div>
    );
  }

  const registrationId = `MUZZA-${Math.floor(100000 + Math.random() * 900000)}`;
  const formattedDate = dateTime.date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="text-center py-12 px-4 animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl text-green-500">✓</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800">¡Reserva Confirmada!</h1>
      <p className="text-gray-600 mt-2">
        Hemos enviado un correo de confirmación a{' '}
        <span className="font-semibold text-muzza-dark">{bookingDetails.email}</span>.
      </p>

      <div className="mt-10 text-left max-w-lg mx-auto bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Nro. de Registro:</span>
          <span className="font-mono text-gray-800">{registrationId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Nombre:</span>
          <span className="text-gray-800">{bookingDetails.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Servicio:</span>
          <span className="text-gray-800">{service.name}</span>
        </div>
        {addons.length > 0 && (
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Adicionales:</span>
            <span className="text-gray-800 text-right">{addons.map(a => a.name).join(', ')}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Sede:</span>
          <span className="text-gray-800">{location.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Fecha:</span>
          <span className="text-gray-800 capitalize">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Hora:</span>
          <span className="text-gray-800">{dateTime.time}</span>
        </div>
        <div className="pt-4 mt-4 border-t border-dashed flex justify-between font-bold text-lg">
          <span className="text-gray-600">TOTAL PAGADO:</span>
          <span className="text-muzza-dark">S/{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-10 px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark transition-colors duration-300"
      >
        Hacer una Nueva Reserva
      </button>
    </div>
  );
};

export default Confirmation;

