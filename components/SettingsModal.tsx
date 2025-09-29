import React from 'react';
import type { Source, DayInfo } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    allSources: readonly Source[];
    selectedSources: Source[];
    onSourcesChange: (newSources: Source[]) => void;
    dayInfo: DayInfo | null;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, allSources, selectedSources, onSourcesChange, dayInfo }) => {
    if (!isOpen) return null;

    const handleCheckboxChange = (source: Source) => {
        const newSelection = selectedSources.includes(source)
            ? selectedSources.filter(s => s !== source)
            : [...selectedSources, source];
        onSourcesChange(newSelection);
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
        >
            <div 
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md m-4 p-6 border border-gray-700 relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                    aria-label="Stäng inställningar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 id="settings-title" className="text-2xl font-bold text-teal-300 mb-6">Inställningar</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Välj nyhetskällor</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {allSources.map(source => (
                            <label key={source} className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-md cursor-pointer hover:bg-gray-700">
                                <input
                                    type="checkbox"
                                    checked={selectedSources.includes(source)}
                                    onChange={() => handleCheckboxChange(source)}
                                    className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-teal-500 focus:ring-teal-500"
                                />
                                <span className="text-gray-300 font-medium">{source}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {dayInfo && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-200 mb-3">Dagens Information</h3>
                        <div className="space-y-2 text-sm bg-gray-700/50 p-4 rounded-md">
                            {dayInfo.nameDays && dayInfo.nameDays.length > 0 && (
                                <p><span className="font-semibold text-gray-300">Namnsdag:</span> <span className="text-gray-400">{dayInfo.nameDays.join(', ')}</span></p>
                            )}
                            {dayInfo.themeDay && (
                                <p><span className="font-semibold text-gray-300">Temadag:</span> <span className="text-gray-400">{dayInfo.themeDay}</span></p>
                            )}
                            {dayInfo.weekNumber && (
                                <p><span className="font-semibold text-gray-300">Vecka:</span> <span className="text-gray-400">{dayInfo.weekNumber}</span></p>
                            )}
                            {dayInfo.nameDaySource && (
                                 <p className="text-xs text-gray-500 pt-2 mt-2 border-t border-gray-600/50">Källa namnsdagar: {dayInfo.nameDaySource}</p>
                            )}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Om Viralitetspoängen</h3>
                    <p className="text-sm text-gray-400">
                        Poängen (1-100) är en AI-genererad uppskattning av en trends genomslagskraft. Den baseras på faktorer som delningsfrekvens och engagemang på de valda plattformarna. Appen fokuserar på <strong className="text-gray-300">underrapporterade trender</strong>, så en hög poäng betyder att det är en av de mest virala trenderna inom sitt sociala ekosystem, inte nödvändigtvis den största globala nyheten.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
