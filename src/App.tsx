import React, { useState, useEffect, useCallback } from 'react';
import { fetchViralNews, fetchUpcomingEvents, fetchDayInfo } from './services/geminiService';
import type { NewsItem, UpcomingEvent, DayInfo, Source } from './types';
import { ALL_SOURCES } from './types';
import { getCachedData, setCachedData, CACHE_KEYS } from './utils/cache';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import UpcomingEvents from './components/UpcomingEvents';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import PaginationControls from './components/PaginationControls';
import SettingsModal from './components/SettingsModal';
import BreakdownModal from './components/BreakdownModal';

const App: React.FC = () => {
  const [newsPages, setNewsPages] = useState<NewsItem[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<Source[]>(() => getCachedData<Source[]>(CACHE_KEYS.SOURCES) || [...ALL_SOURCES]);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [selectedNewsItemForModal, setSelectedNewsItemForModal] = useState<NewsItem | null>(null);

  const fetchAndCacheContent = useCallback(async (sources: Source[]) => {
    setError(null);
    try {
      const [initialNews, events, dayData] = await Promise.all([
        fetchViralNews([], sources),
        fetchUpcomingEvents(),
        fetchDayInfo(new Date()),
      ]);

      setNewsPages([initialNews]);
      setUpcomingEvents(events);
      setDayInfo(dayData);
      setCurrentPage(0);
      setHasMoreNews(initialNews.length > 0);

      // Cache the new data
      setCachedData(CACHE_KEYS.NEWS, [initialNews]);
      setCachedData(CACHE_KEYS.EVENTS, events);
      setCachedData(CACHE_KEYS.DAY_INFO, dayData);
      setCachedData(CACHE_KEYS.CURRENT_PAGE, 0);

    } catch (err) {
      console.error("Failed to load content:", err);
      setError("Kunde inte ladda nyhetsflödet. Kontrollera att din API-nyckel är korrekt konfigurerad och försök igen.");
    }
  }, []);

  const handleUpdate = async () => {
      setIsUpdating(true);
      await fetchAndCacheContent(selectedSources);
      setIsUpdating(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const cachedNews = getCachedData<NewsItem[][]>(CACHE_KEYS.NEWS);
      const cachedEvents = getCachedData<UpcomingEvent[]>(CACHE_KEYS.EVENTS);
      const cachedDayInfo = getCachedData<DayInfo>(CACHE_KEYS.DAY_INFO);
      const cachedPage = getCachedData<number>(CACHE_KEYS.CURRENT_PAGE);

      if (cachedNews && cachedEvents && cachedDayInfo) {
        setNewsPages(cachedNews);
        setUpcomingEvents(cachedEvents);
        setDayInfo(cachedDayInfo);
        setCurrentPage(cachedPage ?? 0);
        setHasMoreNews(true); // Assume there might be more news
      } else {
        // No cache, fetch fresh data
        await fetchAndCacheContent(selectedSources);
      }
      setIsLoading(false);
    };

    loadInitialData();
    // We only want this to run once on initial mount, so the dependency array is empty.
    // The selectedSources are loaded from cache initially, and any subsequent changes
    // won't trigger an automatic refetch, adhering to the new manual update flow.
  }, [fetchAndCacheContent]);


  const handleNextPage = async () => {
    if (currentPage < newsPages.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setCachedData(CACHE_KEYS.CURRENT_PAGE, newPage);
      return;
    }

    if (!hasMoreNews) return;

    setIsLoadingMore(true);
    try {
      const allTitles = newsPages.flat().map(item => item.title);
      const newNews = await fetchViralNews(allTitles, selectedSources);
      if (newNews && newNews.length > 0) {
        const updatedNewsPages = [...newsPages, newNews];
        setNewsPages(updatedNewsPages);
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        setCachedData(CACHE_KEYS.NEWS, updatedNewsPages);
        setCachedData(CACHE_KEYS.CURRENT_PAGE, newPage);
      } else {
        setHasMoreNews(false);
      }
    } catch (err) {
      setError("Kunde inte ladda fler nyheter.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setCachedData(CACHE_KEYS.CURRENT_PAGE, newPage);
    }
  };
  
  const handleSourcesChange = (newSources: Source[]) => {
      setSelectedSources(newSources);
      setCachedData(CACHE_KEYS.SOURCES, newSources);
  };
  
  const handleShowBreakdown = (item: NewsItem) => {
    setSelectedNewsItemForModal(item);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <main className="flex-grow container mx-auto p-4 lg:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Ett fel uppstod</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center border-b-2 border-teal-500/30 pb-2 mb-6">
                <h2 className="text-3xl font-bold text-teal-300">
                  Virala Trender
                </h2>
                <span className="text-gray-400 font-semibold">Sida {currentPage + 1}</span>
              </div>
              <NewsFeed 
                newsItems={newsPages[currentPage] || []} 
                onShowBreakdown={handleShowBreakdown}
              />
              <PaginationControls
                currentPage={currentPage}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
                isLoadingMore={isLoadingMore}
                canGoPrev={currentPage > 0}
                canGoNext={hasMoreNews}
              />
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-6 text-indigo-300 border-b-2 border-indigo-500/30 pb-2">
                Veckans Händelser
              </h2>
              <UpcomingEvents events={upcomingEvents} />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        allSources={[...ALL_SOURCES]}
        selectedSources={selectedSources}
        onSourcesChange={handleSourcesChange}
        dayInfo={dayInfo}
      />
      {selectedNewsItemForModal && (
        <BreakdownModal
            item={selectedNewsItemForModal}
            onClose={() => setSelectedNewsItemForModal(null)}
        />
      )}
    </div>
  );
};

export default App;