
import React from 'react';
import type { AppStep } from '../types';

interface StepperProps {
  currentStep: AppStep;
}

const steps = ['Diagnóstico', 'Servicio', 'Fecha y Hora', 'Carrito', 'Pago'];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          const isFuture = currentStep < index;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-muzza' : ''}
                    ${isCurrent ? 'border-2 border-muzza' : ''}
                    ${isFuture ? 'border-2 border-gray-300' : ''}
                  `}
                >
                  {isCompleted ? (
                    <span className="text-white font-bold">✓</span>
                  ) : isCurrent ? (
                    <div className="w-3 h-3 bg-muzza rounded-full"></div>
                  ) : null}
                </div>
                <p className={`mt-2 text-xs md:text-sm text-center
                  ${isCurrent ? 'text-muzza-dark font-semibold' : 'text-gray-500'}
                `}>{step}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 transition-colors duration-300
                  ${isCompleted ? 'bg-muzza' : 'bg-gray-300'}
                `}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;