import React from 'react';
import type { UpcomingEvent } from '../types';

interface EventItemProps {
  event: UpcomingEvent;
}

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
    const getIcon = () => {
        switch (category.toLowerCase()) {
            case 'lokalt stockholm':
            case 'lokalt norrtälje':
                return 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z\nM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z';
            case 'svensk politik':
                return 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5';
            case 'internationellt':
                return 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z';
            case 'tech':
                return 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3';
            case 'nöje':
                return 'M19.114 5.593a.75.75 0 01.093 1.054l-4.25 5.25a.75.75 0 01-1.11.034l-3.25-3.25a.75.75 0 011.06-1.06l2.672 2.672 3.7-4.566a.75.75 0 011.054-.093zM12 21a9 9 0 100-18 9 9 0 000 18z';
            default:
                return 'M9.594 3.94c.09-.542.56-1.008 1.11-1.11.55-.102 1.11.054 1.46.464.35-.41.91-.566 1.46-.464.55.102 1.02.568 1.11 1.11.102.55-.054 1.11-.464 1.46.41.35.566.91.464 1.46-.102.55-.568 1.02-1.11 1.11-.55.102-1.11-.054-1.46-.464a2.007 2.007 0 01-2.92 0c-.41.41-.97.566-1.46.464-.55-.102-1.02-.568-1.11-1.11-.102-.55.054-1.11.464-1.46-.41-.35-.566-.91-.464-1.46z';
        }
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-indigo-400 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d={getIcon()} />
        </svg>
    )
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const baseClasses = "flex items-start bg-gray-900 p-3 rounded-lg border border-gray-700/50 transition-all duration-200";
  const hoverClasses = event.sourceUrl ? "hover:border-indigo-500/50 hover:bg-gray-800/50 cursor-pointer" : "";
  const finalClasses = `${baseClasses} ${hoverClasses}`;

  const content = (
    <>
      <CategoryIcon category={event.category} />
      <div className="flex-1">
        <h5 className="font-semibold text-gray-200">{event.title}</h5>
        {event.eventDate && (
            <p className="text-sm font-medium text-indigo-300 mt-1">{event.eventDate}</p>
        )}
        <p className="text-sm text-gray-400 mt-1">{event.description}</p>
      </div>
       {event.sourceUrl && (
        <div className="ml-3 flex-shrink-0 self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </div>
      )}
    </>
  );

  if (event.sourceUrl) {
    return (
      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${finalClasses} group`}
        aria-label={`Läs mer om ${event.title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={finalClasses}>
      {content}
    </div>
  );
};

export default EventItem;
