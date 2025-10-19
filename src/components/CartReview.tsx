import React, { useState, useMemo } from 'react';
import type { Service } from '../types';
import { ADDON_SERVICES } from '../constants';

interface CartReviewProps {
  mainService: Service;
  onNext: (addons: Service[], total: number) => void;
  onBack: () => void;
}

const CartReview: React.FC<CartReviewProps> = ({ mainService, onNext, onBack }) => {
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);

  const toggleAddon = (addon: Service) => {
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const totalCost = useMemo(() => {
    return mainService.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  }, [mainService, selectedAddons]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Revisa tu Reserva</h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-lg text-muzza-dark mb-2">Servicio Principal</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">{mainService.name}</p>
          <p className="font-semibold text-gray-800">${mainService.price.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg text-muzza-dark mb-4">Servicios Adicionales (Opcional)</h3>
        <div className="space-y-4">
          {ADDON_SERVICES.map(addon => {
            const isSelected = selectedAddons.some(a => a.id === addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon)}
                className={`flex justify-between items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${isSelected ? 'border-muzza bg-muzza-light' : 'border-gray-300 hover:border-muzza-dark'}
                `}
              >
                <div>
                  <p className="font-semibold text-gray-800">{addon.name}</p>
                  <p className="text-sm text-gray-600">{addon.description}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 mr-4">${addon.price.toFixed(2)}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-muzza bg-muzza' : 'border-gray-400'}`}>
                    {isSelected && <span className="text-white text-sm">✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t-2 border-dashed">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-gray-800">Total:</span>
          <span className="text-muzza-dark">${totalCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300">
          ← Volver
        </button>
        <button onClick={() => onNext(selectedAddons, totalCost)} className="px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark transition-colors duration-300">
          Continuar al Pago
        </button>
      </div>
    </div>
  );
};

export default CartReview;