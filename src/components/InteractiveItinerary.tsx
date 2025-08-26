

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

interface InteractiveItineraryProps {
  itinerary: string;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, tourTitle }: InteractiveItineraryProps) => {
  // Simplified parsing logic - admin controlled content
  const parseItinerary = (itineraryText: string): ItineraryDay[] => {
    const lines = itineraryText.split('\n').filter(line => line.trim());
    const days: ItineraryDay[] = [];

    lines.forEach(line => {
      const dayMatch = line.match(/Day (\d+):?\s*(.+)/i);
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        const content = dayMatch[2];

        days.push({
          dayNumber,
          title: `Day ${dayNumber}`,
          description: content,
        });
      }
    });

    return days;
  };

  const days = parseItinerary(itinerary);

  if (!days.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Detailed Itinerary
      </h2>

      {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-8">
        <div className="prose prose-lg max-w-none">
          {days.map((day, index) => (
            <div key={day.dayNumber} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day {day.dayNumber}: {day.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base mb-4">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveItinerary;