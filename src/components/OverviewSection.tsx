import React, { useState } from "react";
import { Tour } from "@/lib/api";
import { getOverviewContent } from "@/lib/admin-utils";

interface OverviewSectionProps {
  tour: Tour;
}

const OverviewSection = ({ tour }: OverviewSectionProps) => {
  // Use admin-ready utility functions for dynamic content
  const overviewContent = getOverviewContent(tour) || "";

  // Derive a short TL;DR summary from the first paragraph (fallback to substring)
  const firstParagraph = overviewContent.split(/\n\s*\n/)[0] || overviewContent;
  const tldr = firstParagraph.length > 360 ? firstParagraph.slice(0, 360).trim() + "..." : firstParagraph;

  // Extract Highlights block if present (e.g., "Highlights: ...")
  const highlightsMatch = overviewContent.match(/Highlights:\s*([\s\S]*?)(?:\n\s*\n|$)/i);
  const highlightsRaw = highlightsMatch ? highlightsMatch[1].replace(/\n/g, " ") : "";
  const highlights = highlightsRaw
    ? highlightsRaw.split(/[,•–—;]\s*/).map(h => h.trim()).filter(Boolean)
    : [];

  // Practical info extraction: Arrival, Departure, Duration
  const arrivalMatch = overviewContent.match(/Arrival Point:\s*(.+)/i);
  const departureMatch = overviewContent.match(/Departure Point:\s*(.+)/i);
  const durationMatch = overviewContent.match(/Duration:\s*(.+)/i);
  const arrivalPoint = arrivalMatch ? arrivalMatch[1].trim() : undefined;
  const departurePoint = departureMatch ? departureMatch[1].trim() : undefined;
  const durationText = durationMatch ? durationMatch[1].trim() : (typeof tour.duration === 'number' ? `${tour.duration} days` : undefined);

  // Read-more state for long content
  const [expanded, setExpanded] = useState(false);
  const FULL_LENGTH_THRESHOLD = 1200;
  const needsCollapse = overviewContent.length > FULL_LENGTH_THRESHOLD;

  const collapsedContent = needsCollapse && !expanded ? overviewContent.slice(0, FULL_LENGTH_THRESHOLD) + '...' : overviewContent;

  return (
    <section className="py-2 md:py-3 lg:py-4">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Full-width content layout (no images) */}
        <div className="w-full">
          <div className="space-y-6">
            {/* Removed duplicate title - using general tour title in TourContentSections */}

            {/* TL;DR summary card */}
            <div className="bg-muted/10 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Summary</h4>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify mt-2">
                {tldr}
              </p>
            </div>

            {/* Highlights card (if any) */}
            {highlights.length > 0 && (
              <div className="bg-white p-4 rounded-md border border-border shadow-sm">
                <h4 className="text-sm font-semibold mb-3">Highlights</h4>
                <ul className="list-disc ml-5 [&>li]:mt-1 text-muted-foreground">
                  {highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical info card (arrival/departure/duration) */}
            {(arrivalPoint || departurePoint || durationText) && (
              <div className="bg-muted/5 p-4 rounded-md border border-border">
                <h4 className="text-sm font-semibold mb-2">Practical Info</h4>
                <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                  {durationText && <div><strong>Duration:</strong> {durationText}</div>}
                  {arrivalPoint && <div><strong>Arrival:</strong> {arrivalPoint}</div>}
                  {departurePoint && <div><strong>Departure:</strong> {departurePoint}</div>}
                </div>
              </div>
            )}

            {/* Full overview content with progressive disclosure */}
            <div className="prose prose-lg max-w-none">
              <div className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify px-4">
                {collapsedContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3 last:mb-0">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              {needsCollapse && (
                <div className="mt-3">
                  <button
                    onClick={() => setExpanded(v => !v)}
                    className="text-sm font-medium text-brand-green hover:underline"
                  >
                    {expanded ? 'Show less' : 'Read more'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;