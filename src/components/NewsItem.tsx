import React from 'react';
import type { NewsItem as NewsItemType, ViralityBreakdown } from '../types';

interface NewsItemProps {
  item: NewsItemType;
  isTopStory: boolean;
  className?: string;
  onShowBreakdown: (item: NewsItemType) => void;
}

const WorldIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

// --- Sentiment Icons ---
const PlusCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const MinusCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const Bars2Icon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
);

const ArrowsRightLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 6.5m0 0L16.5 11M21 6.5H3" />
    </svg>
);

const SentimentIndicator: React.FC<{ sentiment?: ViralityBreakdown['sentiment'] }> = ({ sentiment }) => {
    if (!sentiment) return null;

    // FIX: Removed explicit type to fix "Cannot find namespace 'JSX'" error by letting TypeScript infer the type.
    const styles = {
        Positive: { text: 'Positiv', icon: <PlusCircleIcon className="w-4 h-4" />, classes: 'text-green-300 bg-green-500/10' },
        Negative: { text: 'Negativ', icon: <MinusCircleIcon className="w-4 h-4" />, classes: 'text-red-400 bg-red-500/10' },
        Neutral: { text: 'Neutral', icon: <Bars2Icon className="w-4 h-4" />, classes: 'text-yellow-400 bg-yellow-500/10' },
        Mixed: { text: 'Blandad', icon: <ArrowsRightLeftIcon className="w-4 h-4" />, classes: 'text-purple-400 bg-purple-500/10' }
    };

    const currentStyle = styles[sentiment];

    return (
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${currentStyle.classes}`}>
            {currentStyle.icon}
            <span>{currentStyle.text}</span>
        </div>
    );
};


// --- Region Icon Components ---
const GlobeBackgroundIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const EuaBackgroundIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        {[...Array(5)].map((_, i) => <path key={i} d={`M${6.2+i*3} 10.27L${7.8+i*3} 14l-1.64-3.03L${9+i*3} 6.24l-3.19-.61L${6+i*3} 2`} />)}
    </svg>
);

const SwedenBackgroundIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" fill="#006aa7" />
    <rect width="24" height="6" y="9" fill="#fecc00" />
    <rect width="6" height="24" x="7" fill="#fecc00" />
  </svg>
);

const EuBackgroundIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" fill="#003399"/>
    {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = 12 + 7 * Math.cos(angle);
        const y = 12 + 7 * Math.sin(angle);
        return <path key={i} fill="#FFCC00" d={`M${x-1} ${y+0.5} l 1 -1.5 l 1 1.5 l -2 0.5 l 1 -1.5 z`} transform={`rotate(180 ${x} ${y}) rotate(${i * -30} ${x} ${y})`} />
    })}
  </svg>
);

const TrendingUpIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const TrendingDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
    </svg>
);

const RegionBackgroundIcon: React.FC<{ region?: string }> = ({ region }) => {
  const iconClasses = "absolute inset-0 w-full h-full text-white opacity-40 z-0";
  switch(region) {
    case 'GLOBAL': return <GlobeBackgroundIcon className={iconClasses} />;
    case 'USA': return <EuaBackgroundIcon className={iconClasses} />;
    case 'SE': return <SwedenBackgroundIcon className={iconClasses} />;
    case 'EU': return <EuBackgroundIcon className={iconClasses} />;
    default: return null;
  }
};

const ActivityStatusTag: React.FC<{ level: NewsItemType['currentActivityLevel'] }> = ({ level }) => {
    const styles = {
        NEW: {
            text: 'NY TREND',
            classes: 'bg-green-500/20 text-green-300 border-green-500/30',
            pulse: true,
        },
        PEAKING: {
            text: 'TRENDAR NU',
            classes: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
            pulse: true,
        },
        RESURGENT: {
            text: 'ÅTERUPPLIVAD',
            classes: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            pulse: false,
        }
    };
    const currentStyle = styles[level] || styles.PEAKING;

    return (
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${currentStyle.classes}`}>
            {currentStyle.pulse && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span></span>}
            <span>{currentStyle.text}</span>
        </div>
    );
};


const NewsItem: React.FC<NewsItemProps> = ({ item, isTopStory, className, onShowBreakdown }) => {
  const containerClasses = `
    bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-teal-500/30 
    transition-all duration-300 group transform hover:-translate-y-1
    flex flex-col
    ${className || ''}
    ${isTopStory ? 'border-2 border-teal-500/50' : ''}
  `;
  
  const contentClasses = `
    p-6 flex flex-col flex-grow relative
  `;

  const ViralityScoreDisplay = () => (
    <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (item.viralityBreakdown) {
                onShowBreakdown(item);
            }
        }}
        disabled={!item.viralityBreakdown}
        className={`flex items-center gap-2 relative group/score ${item.viralityBreakdown ? 'cursor-pointer' : 'cursor-default'}`}
        aria-label="Visa detaljerad viralitetsanalys"
    >
      { item.trendDirection === 'UP' && <TrendingUpIcon className="w-5 h-5 text-green-400" /> }
      { item.trendDirection === 'DOWN' && <TrendingDownIcon className="w-5 h-5 text-red-400" /> }
      <div className="relative flex items-center justify-center w-16 h-16 bg-teal-500/80 backdrop-blur-sm rounded-full border-2 border-teal-300 text-white shadow-lg overflow-hidden transition-transform group-hover/score:scale-110">
        <RegionBackgroundIcon region={item.primaryRegionIcon} />
        <span className="font-bold text-3xl tracking-tighter z-10 relative">{item.viralityScore}</span>
      </div>
    </button>
  );
  
  const formattedStartDate = item.startDate ? new Date(item.startDate).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
  }) : 'Okänt';

  return (
    <article className={containerClasses}>
      <div className={contentClasses}>
        <div className="absolute top-4 right-4 z-20">
            <ViralityScoreDisplay />
        </div>
        
        <div className="mb-4 pr-24"> 
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm mb-3">
                {item.currentActivityLevel && <ActivityStatusTag level={item.currentActivityLevel} />}
                <div className="flex items-center gap-1.5" title={`Regioner: ${item.regions.join(', ')}`}>
                    <WorldIcon className="w-4 h-4 text-teal-400" />
                    <span>{item.primaryRegionIcon || item.regions[0]}</span>
                </div>
                 {item.startDate && (
                    <div className="flex items-center gap-1.5" title={`Startade ${new Date(item.startDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric'})}`}>
                        <CalendarIcon className="w-4 h-4 text-teal-400" />
                        <span>Start: {formattedStartDate}</span>
                    </div>
                )}
            </div>
            <h3 className={`font-bold text-gray-100 group-hover:text-teal-300 transition-colors duration-300 leading-tight ${isTopStory ? 'text-2xl' : 'text-xl'}`}>
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0" aria-hidden="true"></span>
                {item.title}
              </a>
            </h3>
        </div>

        <p className="text-gray-400 mb-4 flex-grow">{item.summary}</p>

        <div className="flex justify-between items-center text-sm font-semibold mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
              <span className="text-gray-400">{item.sourceName}</span>
              <SentimentIndicator sentiment={item.viralityBreakdown?.sentiment} />
          </div>
          <div className="flex items-center text-teal-400 z-10 relative">
            <span>Läs mer</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;