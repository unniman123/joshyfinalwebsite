import React, { useRef } from 'react';
import { ItineraryDay, TourImage } from '@/lib/api';

interface ItineraryHighlightCarouselProps {
  days: ItineraryDay[];
  images?: TourImage[];
}

const ItineraryHighlightCarousel: React.FC<ItineraryHighlightCarouselProps> = ({ days, images = [] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Render up to first 6 highlights from itinerary days
  const highlights = days.slice(0, 6).map(day => ({
    id: day.id,
    title: day.title || `Day ${day.dayNumber}`,
    excerpt: (day.description || '').slice(0, 120)
  }));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const scrollAmount = el.clientWidth * 0.7;

    if (e.key === 'ArrowRight') {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      role="list"
      aria-label="Itinerary highlights carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex gap-6 overflow-x-auto no-scrollbar pb-4 focus:outline-none"
    >
      {highlights.map((h, idx) => (
        <article
          key={h.id}
          role="listitem"
          tabIndex={-1}
          aria-label={`${h.title} highlight`}
          className="min-w-[260px] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 focus:scale-105 focus:shadow-2xl"
        >
          <div className="h-36 overflow-hidden rounded-t-lg">
            <img
              src={(images[idx] && images[idx].url) || '/placeholder-600x400.png'}
              alt={h.title}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
          <div className="p-3 bg-white">
            <h3 className="text-md font-semibold text-foreground mb-1">{h.title}</h3>
            <p className="text-sm text-muted-foreground">{h.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ItineraryHighlightCarousel;


