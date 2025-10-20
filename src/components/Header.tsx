import React from 'react';
import { AppStep } from '../types';                  // valor (objeto as const)
import type { AppStep as AppStepT } from '../types'; // tipo (unión numérica)
import Stepper from './Stepper';

interface HeaderProps {
  step: AppStepT;
}

const Header: React.FC<HeaderProps> = ({ step }) => {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-20">
      <div className="flex flex-col justify-center items-center">
        <span className="text-muzza-dark text-base font-bold tracking-[0.15em] leading-none font-sans">
          MUZZA
        </span>
        <span className="text-gray-500 text-[6px] font-light tracking-[0.15em] mt-0.5 font-sans">
          CEJAS & PESTAÑAS
        </span>
      </div>

      {step !== AppStep.CONFIRMATION && (
        <div className="mt-6">
          <Stepper currentStep={step} />
        </div>
      )}
    </header>
  );
};

export default Header;

