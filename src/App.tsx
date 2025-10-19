import React, { useState, useCallback } from 'react';
import { AppStep } from './types';
import type { Service, Location, BookingDetails } from './types';

import Header from './components/Header';
import Stepper from './components/Stepper';
import DiagnosisStep from './components/DiagnosisStep';
import ServiceSelector from './components/ServiceSelector';
import LocationTimeSelector from './components/LocationTimeSelector';
import CartReview from './components/CartReview';
import CheckoutForm from './components/CheckoutForm';
import Confirmation from './components/Confirmation';

const initialState: {
  step: AppStep;
  selectedService: Service | null;
  selectedAddons: Service[];
  selectedLocation: Location | null;
  selectedDateTime: { date: Date; time: string } | null;
  bookingDetails: BookingDetails | null;
  totalCost: number;
} = {
  step: AppStep.DIAGNOSIS,
  selectedService: null,
  selectedAddons: [],
  selectedLocation: null,
  selectedDateTime: null,
  bookingDetails: null,
  totalCost: 0,
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.DIAGNOSIS);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Limita los pasos al rango válido
  const goToNextStep = () => setStep(s => Math.min(AppStep.CONFIRMATION, s + 1));
  const goToPrevStep = () => setStep(s => Math.max(AppStep.DIAGNOSIS, s - 1));

  const handleDiagnosisNext = () => goToNextStep();

  const handleServiceSelect = useCallback((service: Service) => {
    setSelectedService(service);
    goToNextStep();
  }, []);

  const handleLocationTimeSelect = useCallback((location: Location, date: Date, time: string) => {
    setSelectedLocation(location);
    setSelectedDateTime({ date, time });
    goToNextStep();
  }, []);

  const handleCartReview = useCallback((addons: Service[], total: number) => {
    setSelectedAddons(addons);
    setTotalCost(total);
    goToNextStep();
  }, []);

  const handlePayment = useCallback((details: BookingDetails) => {
    setBookingDetails(details);
    goToNextStep();
  }, []);

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
        return (
          <ServiceSelector
            onSelectService={handleServiceSelect}
            onBack={goToPrevStep}
          />
        );

      case AppStep.LOCATION_DATETIME:
        return (
          <LocationTimeSelector
            onNext={handleLocationTimeSelect}
            onBack={goToPrevStep}
          />
        );

      case AppStep.CART_REVIEW:
        if (!selectedService) return null;
        return (
          <CartReview
            mainService={selectedService}
            onNext={handleCartReview}
            onBack={goToPrevStep}
          />
        );

      case AppStep.CHECKOUT:
        return (
          <CheckoutForm
            totalCost={totalCost}
            onPay={handlePayment}
            onBack={goToPrevStep}
          />
        );

      case AppStep.CONFIRMATION:
        if (!bookingDetails) return null;
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

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Header />
      <main className="py-10 px-4">
        {step !== AppStep.CONFIRMATION && <Stepper currentStep={step} />}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
          {renderStep()}
        </div>
      </main>
    </div>
  );
};

export default App;

