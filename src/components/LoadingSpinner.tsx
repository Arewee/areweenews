import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-gray-300">Laddar nyheter...</p>
    </div>
  );
};

export default LoadingSpinner;