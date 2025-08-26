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
        {/* 30-70 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-start">

          {/* Left side - Images (30%) */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            {overviewImages && overviewImages.length > 0 ? (
              <OverviewImageGallery
                images={overviewImages}
                tourTitle={tour.title}
              />
            ) : (
              /* Placeholder rectangular images for testing */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image 1</span>
                  </div>
                  <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image 2</span>
                  </div>
                </div>
                <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image 3</span>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Content (70%) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
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