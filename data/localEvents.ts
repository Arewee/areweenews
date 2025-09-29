import type { UpcomingEvent } from '../types';

// This list contains manually verified, important local events for Norrtälje.
// It acts as a source of truth to prevent the AI from providing incorrect dates for critical events.
export const localEvents: Omit<UpcomingEvent, 'id'>[] = [
  {
    category: 'Lokalt Norrtälje',
    title: 'Höstmarknad i Norrtälje',
    description: 'Traditionell höstmarknad i stadskärnan med knallar, tivoli och lokala produkter. En dag fylld med smaker och stämning.',
    eventDate: 'Tis 1 okt 2024',
    rawDate: '2024-10-01',
    sourceUrl: 'https://www.norrtaljehandelsstad.se/evenemang/hostmarknad-i-norrtalje-stadskarna',
  },
  // Add other important, recurring local events here with correct dates
  // Example:
  // {
  //   category: 'Lokalt Norrtälje',
  //   title: 'Custom Bike Show',
  //   description: 'Norrtälje Custom Bike Show i Societetsparken.',
  //   eventDate: 'Lör 7 jun 2025', // Note: Example for next year
  //   rawDate: '2025-06-07', 
  //   sourceUrl: 'https://www.visitroslagen.se/evenemang',
  // }
];
