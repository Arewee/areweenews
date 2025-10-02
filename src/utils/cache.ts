
const CACHE_PREFIX = 'areweenews-';
const CACHE_EXPIRATION_MS = 4 * 60 * 60 * 1000; // 4 hours

interface CacheItem<T> {
    data: T;
    timestamp: number;
}

export const CACHE_KEYS = {
    NEWS: 'newsPages',
    EVENTS: 'upcomingEvents',
    DAY_INFO: 'dayInfo',
    SOURCES: 'selectedSources',
    CURRENT_PAGE: 'currentPage',
};

export function setCachedData<T>(key: string, data: T): void {
    try {
        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (error) {
        console.error(`Error writing to cache for key "${key}":`, error);
    }
}

export function getCachedData<T>(key: string): T | null {
    try {
        const itemStr = localStorage.getItem(CACHE_PREFIX + key);
        if (!itemStr) {
            return null;
        }
        
        const item: CacheItem<T> = JSON.parse(itemStr);
        const isExpired = Date.now() - item.timestamp > CACHE_EXPIRATION_MS;
        
        if (isExpired) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        
        return item.data;
    } catch (error) {
        console.error(`Error reading from cache for key "${key}":`, error);
        // Attempt to clean up corrupted item
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
    }
}
