

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

interface InteractiveItineraryProps {
  itinerary?: string;
  itineraryDays?: Array<Partial<ItineraryDay>>;
  tourTitle: string;
}

const InteractiveItinerary = ({ itinerary, itineraryDays, tourTitle }: InteractiveItineraryProps) => {
  // Simplified parsing logic - admin controlled content
  const parseItinerary = (itineraryText: string): ItineraryDay[] => {
    // If structured itineraryDays provided, prefer them (more reliable)
    if (itineraryDays && itineraryDays.length) {
      return itineraryDays
        .map(d => ({
          dayNumber: d.dayNumber || 0,
          title: d.title || `Day ${d.dayNumber || 0}`,
          description: (d.description || '').toString().trim()
        }))
        .filter(d => d.dayNumber > 0);
    }

    // Support multi-line day descriptions in legacy `itinerary` string: a line starting with "Day N:" begins a new day;
    // subsequent non-header lines are appended to the previous day's description.
    const rawLines = (itineraryText || '').split('\n');
    const days: ItineraryDay[] = [];
    let currentDay: ItineraryDay | null = null;

    rawLines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const dayMatch = trimmed.match(/Day (\d+):?\s*(.*)/i);
      if (dayMatch) {
        const dayNumber = parseInt(dayMatch[1]);
        const content = dayMatch[2] || '';
        currentDay = {
          dayNumber,
          title: `Day ${dayNumber}`,
          description: content.trim(),
        };
        days.push(currentDay);
      } else if (currentDay) {
        // Append this line to the current day's description, preserving paragraph breaks
        currentDay.description = `${currentDay.description}\n${trimmed}`.trim();
      }
    });

    return days;
  };

  const days = parseItinerary(itinerary);

  if (!days.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Itinerary coming soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Itinerary
      </h2>

      {/* Single content box with paragraphed content */}
      <div className="bg-white rounded-lg shadow-warm border border-border p-8">
        <div className="prose prose-lg max-w-none">
          {days.map((day, index) => (
            <div key={day.dayNumber} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day {day.dayNumber}: {day.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base mb-4 whitespace-pre-line">
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