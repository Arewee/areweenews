import React, { useMemo } from 'react';
import type { UpcomingEvent } from '../types';
import EventItem from './EventItem';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {

  const groupedEvents = useMemo(() => {
    return events.reduce((acc, event) => {
      const category = event.category || 'Övrigt';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(event);
      return acc;
    }, {} as Record<string, UpcomingEvent[]>);
  }, [events]);

  const categoryOrder = ['Lokalt Norrtälje', 'Lokalt Stockholm', 'Svensk Politik', 'Internationellt', 'Tech', 'Nöje'];
  
  const sortedCategories = Object.keys(groupedEvents).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg shadow-indigo-500/10 space-y-6">
      {sortedCategories.length > 0 ? (
        sortedCategories.map(category => (
          <div key={category}>
            <h4 className="text-xl font-semibold mb-3 text-indigo-300">{category}</h4>
            <div className="space-y-3">
              {groupedEvents[category].map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">Inga kommande händelser att visa.</div>
      )}
    </div>
  );
};

export default UpcomingEvents;
