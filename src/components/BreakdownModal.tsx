import React from 'react';
import type { NewsItem, ViralityScoreMetric, ViralityQualitativeMetric } from '../types';

interface BreakdownModalProps {
    item: NewsItem;
    onClose: () => void;
}

type Metric = ViralityScoreMetric | ViralityQualitativeMetric;

const BreakdownItem: React.FC<{ label: string; metric: Metric; }> = ({ label, metric }) => {
    const isScoreMetric = 'score' in metric;

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg">
            <span className="text-sm font-medium text-gray-400 block mb-1">
                {isScoreMetric ? `${label} (100)` : label}
            </span>
            {isScoreMetric ? (
                <div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5 my-1">
                        <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${(metric as ViralityScoreMetric).score}%` }}></div>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-xs font-medium text-gray-300">{metric.explanation}</span>
                        <span className="text-lg font-bold text-teal-300">{(metric as ViralityScoreMetric).score}</span>
                    </div>
                </div>
            ) : (
                <div>
                    <span className="text-xl font-semibold text-gray-200">{(metric as ViralityQualitativeMetric).value}</span>
                    <p className="text-xs text-gray-400 font-medium">{metric.explanation}</p>
                </div>
            )}
        </div>
    );
}

const BreakdownModal: React.FC<BreakdownModalProps> = ({ item, onClose }) => {
    const { viralityBreakdown: breakdown, title } = item;
    if (!breakdown) return null;

    const sentimentColors = {
        Positive: 'text-green-400 bg-green-900/50 border-green-500/50',
        Negative: 'text-red-400 bg-red-900/50 border-red-500/50',
        Neutral: 'text-yellow-400 bg-yellow-900/50 border-yellow-500/50',
        Mixed: 'text-purple-400 bg-purple-900/50 border-purple-500/50',
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="breakdown-title"
        >
            <div 
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg m-4 border border-gray-700 relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-700">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        aria-label="Stäng analysfönster"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-sm uppercase tracking-wider text-teal-400 font-semibold">Virality Analysis</h2>
                    <h3 id="breakdown-title" className="text-xl font-bold text-gray-100 mt-1 pr-8">{title}</h3>
                </div>

                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BreakdownItem label="Virality Rate" metric={breakdown.viralityRate} />
                        <BreakdownItem label="Engagement Rate" metric={breakdown.engagementRate} />
                        <BreakdownItem label="Estimated Reach" metric={breakdown.estimatedReach} />
                        <BreakdownItem label="Impression Volume" metric={breakdown.impressionVolume} />
                    </div>
                    
                    <BreakdownItem label="Share Velocity" metric={breakdown.shareVelocity} />
                    
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                             <p className="text-sm font-semibold text-gray-300">Sentiment</p>
                             <span className={`font-bold px-2.5 py-1 rounded-md text-xs border ${sentimentColors[breakdown.sentiment] || ''}`}>
                                {breakdown.sentiment}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">
                            <span className="font-semibold text-gray-300">Key Factors:</span> {breakdown.keyFactors}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakdownModal;