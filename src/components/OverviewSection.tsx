import { Tour } from "@/lib/api";
import { getOverviewContent } from "@/lib/admin-utils";

interface OverviewSectionProps {
  tour: Tour;
}

const OverviewSection = ({ tour }: OverviewSectionProps) => {
  // Use admin-ready utility functions for dynamic content
  const overviewContent = getOverviewContent(tour);

  return (
    <section className="py-2 md:py-3 lg:py-4">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Full-width content layout (no images) */}
        <div className="w-full">
          <div className="space-y-6">
            {/* Removed duplicate title - using general tour title in TourContentSections */}

            {/* Full overview content with no line limitations */}
            <div className="prose prose-lg max-w-none">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-justify">
                {overviewContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;