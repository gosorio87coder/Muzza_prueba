import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

interface DiagnosisStepProps {
  onNext: () => void;
}

const ImageUploadBox: React.FC<{
  label: string;
  onUpload: (file: File) => void;
  preview: string | null;
  disabled: boolean;
}> = ({ label, onUpload, preview, disabled }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-muzza transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} disabled={disabled} accept="image/*" />
      {preview ? (
        <img src={preview} alt={`${label} preview`} className="mx-auto h-32 w-32 object-cover rounded-md" />
      ) : (
        <div className="flex flex-col items-center justify-center h-32">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <p className="mt-2 text-sm text-gray-600">{label}</p>
        </div>
      )}
    </div>
  );
};

const DiagnosisStep: React.FC<DiagnosisStepProps> = ({ onNext }) => {
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [frontPhotoPreview, setFrontPhotoPreview] = useState<string | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [skipDiagnosis, setSkipDiagnosis] = useState(false);

  const handleFrontPhotoUpload = (file: File) => {
    setFrontPhoto(file);
    setFrontPhotoPreview(URL.createObjectURL(file));
  };

  const handleProfilePhotoUpload = (file: File) => {
    setProfilePhoto(file);
    setProfilePhotoPreview(URL.createObjectURL(file));
  };

  const isNextEnabled = skipDiagnosis || (frontPhoto !== null && profilePhoto !== null);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Diagnóstico Opcional</h2>
      <p className="text-center text-gray-600 mb-8">Sube fotos de tus cejas para una recomendación personalizada o salta este paso si ya sabes qué servicio deseas.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ImageUploadBox label="Foto Frontal" onUpload={handleFrontPhotoUpload} preview={frontPhotoPreview} disabled={skipDiagnosis} />
        <ImageUploadBox label="Foto de Perfil" onUpload={handleProfilePhotoUpload} preview={profilePhotoPreview} disabled={skipDiagnosis} />
      </div>

      <div className="flex items-center justify-center mb-8">
        <input
          type="checkbox"
          id="skip"
          checked={skipDiagnosis}
          onChange={() => setSkipDiagnosis(!skipDiagnosis)}
          className="h-4 w-4 text-muzza focus:ring-muzza border-gray-300 rounded"
        />
        <label htmlFor="skip" className="ml-2 block text-sm text-gray-900">
          No necesito diagnóstico, ya sé lo que quiero.
        </label>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!isNextEnabled}
          className="px-8 py-3 bg-muzza text-gray-800 font-semibold rounded-lg shadow-md hover:bg-muzza-dark focus:outline-none focus:ring-2 focus:ring-muzza-dark focus:ring-opacity-75 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DiagnosisStep;