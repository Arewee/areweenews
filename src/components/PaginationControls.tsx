import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
  isLoadingMore: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  onNext,
  onPrev,
  isLoadingMore,
  canGoPrev,
  canGoNext
}) => {
  return (
    <div className="flex items-center justify-center mt-8 space-x-4">
      <button
        onClick={onPrev}
        disabled={!canGoPrev || isLoadingMore}
        className="px-6 py-2 font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Föregående sida"
      >
        Föregående
      </button>

      {isLoadingMore ? (
        <div className="flex items-center space-x-2 text-teal-300">
          <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Laddar...</span>
        </div>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="px-6 py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Nästa sida med nyheter"
        >
          {canGoNext ? 'Fler nyheter' : 'Inga fler nyheter'}
        </button>
      )}
    </div>
  );
};

export default PaginationControls;