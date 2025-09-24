import React from 'react';
import { ItineraryDay, TourImage } from '@/lib/api';

interface ItineraryHighlightListProps {
  days: ItineraryDay[];
  images?: TourImage[];
}

const ItineraryHighlightList: React.FC<ItineraryHighlightListProps> = ({ days, images = [] }) => {
  // Render vertical cards: one card per day
  return (
    <div className="space-y-6">
      {days.map((day, idx) => (
        <article
          key={day.id}
          role="article"
          aria-labelledby={`day-title-${day.id}`}
          tabIndex={0}
          className="group overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl focus:scale-[1.02] focus:shadow-2xl"
        >
          <div className="relative w-full h-64 overflow-hidden rounded-lg">
            <img
              src={(images[idx] && images[idx].url) || '/placeholder-600x400.png'}
              alt={day.title || `Day ${day.dayNumber}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Theme-aware frame badge (looks like a hanging photo frame) */}
            <div className="absolute -translate-y-1/2 left-6 top-6">
              <div className="relative">
                <div className="w-14 h-14 rounded-md flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-900" aria-hidden="true">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground dark:text-muted-foreground">Day</div>
                    <div className="text-sm font-bold text-foreground dark:text-white">{day.dayNumber}</div>
                  </div>
                </div>
                {/* small hanging cord */}
                <div className="absolute left-1/2 top-[-10px] w-px h-4 bg-gray-300 dark:bg-gray-700 -translate-x-1/2 rounded" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="px-3 py-4 bg-transparent">
            <div className="flex items-center justify-between mb-1">
              <h3 id={`day-title-${day.id}`} className="text-lg md:text-xl font-semibold text-foreground">{day.title || `Day ${day.dayNumber}`}</h3>
              {day.date && (
                <time className="text-sm text-muted-foreground" dateTime={day.date}>
                  {new Date(day.date).toLocaleDateString()}
                </time>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">{day.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ItineraryHighlightList;


