import { Tour } from "@/lib/api";
import { getOverviewImages, getOverviewContent } from "@/lib/admin-utils";
import OverviewImageGallery from "@/components/OverviewImageGallery";

interface OverviewSectionProps {
  tour: Tour;
}

const OverviewSection = ({ tour }: OverviewSectionProps) => {
  // Use admin-ready utility functions for dynamic content
  const overviewImages = getOverviewImages(tour);
  const overviewContent = getOverviewContent(tour);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 50-50 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left side - Interactive Overview Image Gallery (50%) */}
          <div className="order-2 lg:order-1">
            <OverviewImageGallery
              images={overviewImages}
              tourTitle={tour.title}
            />
          </div>

          {/* Right side - Overview Content (50%) */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {/* Section heading using tour title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {tour.title}
              </h2>

              {/* Full overview content with no line limitations */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {overviewContent}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OverviewSection;