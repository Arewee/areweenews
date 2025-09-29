import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AreWeeNews. Alla rättigheter förbehållna.</p>
        <p className="text-sm mt-1">Drivs av Gemini API</p>
      </div>
    </footer>
  );
};

export default Footer;