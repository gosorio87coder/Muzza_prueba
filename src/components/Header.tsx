import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 flex justify-center items-center sticky top-0 z-10">
      <div className="relative w-80 h-28">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-red-500 to-amber-400 p-1 shadow-lg">
          <div className="w-full h-full bg-muzza rounded-lg flex flex-col items-center justify-center px-4">
            <span
              className="text-white text-6xl font-bold tracking-[0.25em] leading-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              MUZZA
            </span>
            <span
              className="text-white text-xs font-light tracking-[0.3em] mt-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              CEJAS & PESTAÑAS
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;