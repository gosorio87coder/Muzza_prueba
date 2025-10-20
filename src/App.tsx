import React, { useState } from 'react';

// Importa el VALOR AppStep y los TIPOS por separado
import { AppStep } from './types';
import type { AppStep as AppStepT, Service, Location, BookingDetails } from './types';

import Header from './components/Header';
import DiagnosisStep from './components/DiagnosisStep';
import ServiceSelector from './components/ServiceSelector';
import LocationTimeSelector from './components/LocationTimeSelector';
import CartReview from './components/CartReview';
import CheckoutForm from './components/CheckoutForm';
import Confirmation from './components/Confirmation';

const App: React.FC = () => {
  // Tipar explícitamente el estado para que sea el union 0|1|2|3|4|5
  const [step, setStep] = useState<AppStepT>(AppStep.DIAGNOSIS);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Castear para mantener el union en incrementos/decrementos
  const goToNextStep = () => setStep(prev => (prev + 1) as AppStepT);
  const goToPrevStep = () => setStep(prev => (prev - 1) as AppStepT);

  const handleDiagnosisNext = () => goToNextStep();

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    goToNextStep();
  };

  const handleLocationTimeSelect = (location: Location, date: Date, time: string) => {
    setSelectedLocation(location);
    setSelectedDateTime({ date, time });
    goToNextStep();
  };

  const handleCartReview = (addons: Service[], total: number) => {
    setSelectedAddons(addons);
    setTotalCost(total);
    goToNextStep();
  };

  const handlePayment = (details: BookingDetails) => {
    setBookingDetails(details);
    goToNextStep();
  };

  const handleReset = () => {
    setStep(AppStep.DIAGNOSIS);
    setSelectedService(null);
    setSelectedAddons([]);
    setSelectedLocation(null);
    setSelectedDateTime(null);
    setBookingDetails(null);
    setTotalCost(0);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.DIAGNOSIS:
        return <DiagnosisStep onNext={handleDiagnosisNext} />;

      case AppStep.SERVICE_SELECTION:
        return <ServiceSelector onSelectService={handleServiceSelect} onBack={goToPrevStep} />;

      case AppStep.LOCATION_DATETIME:
        return <LocationTimeSelector onNext={handleLocationTimeSelect} onBack={goToPrevStep} />;

      case AppStep.CART_REVIEW:
        if (!selectedService) return null;
        return <CartReview mainService={selectedService} onNext={handleCartReview} onBack={goToPrevStep} />;

      case AppStep.CHECKOUT:
        return <CheckoutForm totalCost={totalCost} onPay={handlePayment} onBack={goToPrevStep} />;

      case AppStep.CONFIRMATION:
        return (
          <Confirmation
            bookingDetails={bookingDetails}
            service={selectedService}
            addons={selectedAddons}
            location={selectedLocation}
            dateTime={selectedDateTime}
            total={totalCost}
            onReset={handleReset}
          />
        );

      default:
        return <DiagnosisStep onNext={handleDiagnosisNext} />;
    }
  };

  const isConfirmationStep = step === AppStep.CONFIRMATION;
  const getMainPaddingTop = () => (isConfirmationStep ? 'pt-8' : 'pt-12');

  return (
    <div className="min-h-screen font-sans">
      <Header step={step} />
      <main className={`px-4 pb-12 ${getMainPaddingTop()}`}>
        <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-lg ${!isConfirmationStep ? 'p-8' : ''}`}>
          {renderStep()}
        </div>
      </main>
    </div>
  );
};

export default App;




