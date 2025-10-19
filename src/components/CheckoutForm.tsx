import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import SpinnerIcon from './icons/SpinnerIcon';

interface CheckoutFormProps {
  totalCost: number;
  onPay: (details: BookingDetails) => void;
  onBack: () => void;
}

type FormErrors = {
  [key in keyof BookingDetails]?: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalCost, onPay, onBack }) => {
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    email: '',
    phone: '',
    dni: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!formData.email.includes('@')) newErrors.email = 'Debe ser un email válido.';
    if (!/^\d{8,}$/.test(formData.phone)) newErrors.phone = 'El teléfono debe tener al menos 8 dígitos.';
    if (!/^\d{7,8}$/.test(formData.dni)) newErrors.dni = 'El DNI debe tener 7 u 8 dígitos.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      setTimeout(() => {
        onPay(formData);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Información de Contacto y Pago</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre y Apellido</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-muzza focus:border-muzza sm:text-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-muzza focus:border-muzza sm:text-sm" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-muzza focus:border-muzza sm:text-sm" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
            <input type="text" name="dni" id="dni" value={formData.dni} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-muzza focus:border-muzza sm:text-sm" />
            {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t-2 border-dashed">
            <div className="flex justify-between items-center text-2xl font-bold">
                <span className="text-gray-800">Total a Pagar:</span>
                <span className="text-muzza-dark">${totalCost.toFixed(2)}</span>
            </div>
        </div>
        
        <div className="flex justify-between mt-12">
          <button type="button" onClick={onBack} disabled={isProcessing} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors duration-300">
            ← Volver
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark disabled:bg-muzza-dark/70 disabled:cursor-not-allowed flex items-center justify-center w-48 transition-colors duration-300"
          >
            {isProcessing ? (
              <>
                <SpinnerIcon className="w-5 h-5 mr-3" />
                Procesando...
              </>
            ) : (
              `Pagar $${totalCost.toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;