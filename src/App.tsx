import React, { useState } from 'react';
import { AppStep } from './types'; // valor (objeto as const)
import type { Service, Location, BookingDetails } from './types';

import Header from './components/Header';
import DiagnosisStep from './components/DiagnosisStep';
import ServiceSelector from './components/ServiceSelector';
import LocationTimeSelector from './components/LocationTimeSelector';
import CartReview from './components/CartReview';
import CheckoutForm from './components/CheckoutForm';
import Confirmation from './components/Confirmation';

const initialState = {
  step: AppStep.DIAGNOSIS,
  selectedService: null as Service | null,
  selectedAddons: [] as Service[],
  selectedLocation: null as Location | null,
  selectedDateTime: null as { date: Date; time: string } | null,
  bookingDetails: null as BookingDetails | null,
  totalCost: 0,
};

const App: React.FC = () => {
  const [step, setStep] = useState(initialState.step);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  const goToNextStep = () => setStep(prev => prev + 1);
  const goToPrevStep = () => setStep(prev => prev - 1);

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
    setStep(initialState.step);
    setSelectedService(initialState.selectedService);
    setSelectedAddons(initialState.selectedAddons);
    setSelectedLocation(initialState.selectedLocation);
    setSelectedDateTime(initialState.selectedDateTime);
    setBookingDetails(initialState.bookingDetails);
    setTotalCost(initialState.totalCost);
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



