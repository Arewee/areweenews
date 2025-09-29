import React from 'react';

interface HeaderProps {
    onOpenSettings: () => void;
}

const GearIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const today = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-gray-900 shadow-lg shadow-teal-500/10 border-b border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-x-6 gap-y-3">
        {/* Left side: Title and subtitle */}
        <div className="flex items-baseline gap-x-4">
          <h1 className="text-3xl lg:text-4xl font-bold flex-shrink-0">
            <span className="text-white">AreWee</span>
            <span className="text-teal-400">News</span>
          </h1>
          <p className="text-gray-400 mt-1 hidden lg:block">Dina dagliga virala nyheter och trender.</p>
        </div>

        {/* Right side: Date and settings */}
        <div className="flex items-center gap-x-4 ml-auto lg:ml-0">
          <p className="font-medium text-gray-500 text-sm whitespace-nowrap">{today}</p>
          <button 
              onClick={onOpenSettings}
              className="p-2 text-gray-400 hover:text-teal-400 transition-colors rounded-full hover:bg-gray-700"
              aria-label="Öppna inställningar"
          >
              <GearIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
