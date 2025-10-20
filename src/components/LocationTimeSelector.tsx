import React, { useState, useEffect, useMemo } from 'react';
import type { Location } from '../types';
import { LOCATIONS, TIME_SLOTS } from '../constants';
import SpinnerIcon from './icons/SpinnerIcon';

interface LocationTimeSelectorProps {
  onNext: (location: Location, date: Date, time: string) => void;
  onBack: () => void;
}

const LocationTimeSelector: React.FC<LocationTimeSelectorProps> = ({ onNext, onBack }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const daysInMonth = useMemo(() => {
    const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0);
    return date.getDate();
  }, [currentMonthDate]);

  const startDayOfMonth = useMemo(() => {
    const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
    return date.getDay(); // 0 domingo, 1 lunes, ...
  }, [currentMonthDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (selectedDate && selectedLocation) {
      setIsLoadingTimes(true);
      setAvailableTimes([]);
      setSelectedTime(null);

      const timer = setTimeout(() => {
        const day = selectedDate.getDate();
        let unavailableSlots: string[] = [];
        if (day % 3 === 0) {
          if (selectedLocation.id === 1) {
            unavailableSlots = ['10:30'];
          } else if (selectedLocation.id === 2) {
            unavailableSlots = ['09:00', '15:00'];
          }
        }
        setAvailableTimes(TIME_SLOTS.filter(slot => !unavailableSlots.includes(slot)));
        setIsLoadingTimes(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedDate, selectedLocation]);

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);
    if (date >= today) setSelectedDate(date);
  };

  const isNextEnabled = !!selectedLocation && !!selectedDate && !!selectedTime;

  const Calendar = () => (
    <div className="mt-6 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonthDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>&lt;</button>
        <h3 className="font-bold">
          {currentMonthDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => setCurrentMonthDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(d => (
          <div key={d} className="font-semibold text-gray-500">
            {d}
          </div>
        ))}

        {Array.from({ length: startDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);
          const isPast = date < today;
          const isSelected = selectedDate?.getTime() === date.getTime();

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              disabled={isPast}
              className={`w-10 h-10 rounded-full transition-colors duration-200
                ${isSelected ? 'bg-muzza text-gray-800 font-semibold' : ''}
                ${!isSelected && !isPast ? 'hover:bg-muzza-light' : ''}
                ${isPast ? 'text-gray-400 cursor-not-allowed' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Selecciona Sede, Fecha y Hora
      </h2>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">1. Sede</h3>
        <div className="flex gap-4">
          {LOCATIONS.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`px-6 py-3 rounded-lg border-2 transition-colors duration-200 ${
                selectedLocation?.id === loc.id
                  ? 'bg-muzza text-gray-800 font-semibold border-muzza'
                  : 'border-gray-300 hover:border-muzza'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-3">2. Fecha</h3>
          <Calendar />
        </div>
      )}

      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-3">3. Horario</h3>
          {isLoadingTimes ? (
            <div className="flex items-center justify-center h-24">
              <SpinnerIcon className="w-8 h-8 text-muzza" />
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {TIME_SLOTS.map(time => {
                const isAvailable = availableTimes.includes(time);
                return (
                  <button
                    key={time}
                    onClick={() => isAvailable && setSelectedTime(time)}
                    disabled={!isAvailable}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors duration-200
                      ${selectedTime === time ? 'bg-muzza text-gray-800 font-semibold border-muzza' : 'border-gray-300'}
                      ${isAvailable ? 'hover:border-muzza' : 'text-gray-400 bg-gray-100 cursor-not-allowed line-through'}
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between mt-12">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
          ← Volver
        </button>
        <button
          onClick={() => onNext(selectedLocation!, selectedDate!, selectedTime!)}
          disabled={!isNextEnabled}
          className="px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default LocationTimeSelector;
