import React from 'react';
import type { NewsItem as NewsItemType } from '../types';
import NewsItem from './NewsItem';

interface NewsFeedProps {
  newsItems: NewsItemType[];
  onShowBreakdown: (item: NewsItemType) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ newsItems, onShowBreakdown }) => {
  const sortedNews = React.useMemo(() => {
    return [...newsItems].sort((a, b) => (b.viralityScore || 0) - (a.viralityScore || 0));
  }, [newsItems]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sortedNews.length > 0 ? (
        sortedNews.map((item, index) => (
          <NewsItem 
            key={item.id} 
            item={item} 
            isTopStory={index === 0}
            onShowBreakdown={onShowBreakdown}
          />
        ))
      ) : (
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-gray-400">Inga nyheter att visa just nu.</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;