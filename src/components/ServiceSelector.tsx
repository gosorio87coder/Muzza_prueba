import React from 'react';
import type { Service } from '../types';
import { MAIN_SERVICES } from '../constants';

interface ServiceSelectorProps {
  onSelectService: (service: Service) => void;
  onBack: () => void;
}

const ServiceCard: React.FC<{ service: Service; onSelect: () => void }> = ({ service, onSelect }) => {
  const isMicropigmentacion = service.name.startsWith('Micropigmentación');

  const renderTitle = () => {
    if (isMicropigmentacion) {
      const technique = service.name.replace('Micropigmentación ', '');
      return (
        <>
          <span className="block text-gray-500 font-medium leading-tight">Micropigmentación</span>
          <span className="block leading-tight">{technique}</span>
        </>
      );
    }
    return service.name;
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-base font-bold text-muzza-dark h-12">
        {renderTitle()}
      </h3>
      <p className="text-xs text-gray-600 my-3 flex-grow">{service.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-gray-800">S/{service.price}</span>
        <button
          onClick={onSelect}
          className="px-5 py-2 text-sm bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark focus:outline-none focus:ring-2 focus:ring-muzza-dark focus:ring-opacity-75 transition-colors duration-300"
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onSelectService, onBack }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Elige un Servicio Principal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MAIN_SERVICES.map(service => (
          <ServiceCard key={service.id} service={service} onSelect={() => onSelectService(service)} />
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default ServiceSelector;
