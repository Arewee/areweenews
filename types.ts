export interface ViralityScoreMetric {
  score: number;
  explanation: string;
}

export interface ViralityQualitativeMetric {
  value: string;
  explanation: string;
}

export interface ViralityBreakdown {
  viralityRate: ViralityScoreMetric;
  engagementRate: ViralityScoreMetric;
  estimatedReach: ViralityQualitativeMetric;
  impressionVolume: ViralityQualitativeMetric;
  shareVelocity: ViralityQualitativeMetric;
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  keyFactors: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  viralityScore: number;
  regions: string[];
  primaryRegionIcon?: 'GLOBAL' | 'USA' | 'EU' | 'SE';
  trendDirection: 'UP' | 'DOWN' | 'STABLE';
  currentActivityLevel: 'NEW' | 'PEAKING' | 'RESURGENT'; // New field for time context
  startDate?: string;
  viralityHistory?: number[];
  viralityBreakdown?: ViralityBreakdown;
}

export interface UpcomingEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  eventDate: string; // The user-friendly display date string
  rawDate: string; // YYYY-MM-DD for reliable sorting
  sourceUrl?: string;
}

export interface DayInfo {
  nameDays: string[];
  nameDaySource: string | null;
  themeDay: string | null;
  weekNumber: number | null;
}

export const ALL_SOURCES = ['TikTok', 'Reddit', 'X', 'Instagram', 'YouTube'] as const;
export type Source = typeof ALL_SOURCES[number];
