import { Tour } from "@/lib/api";

interface OverviewSectionProps {
  tour: Tour;
}

const OverviewSection = ({ tour }: OverviewSectionProps) => {
  // Get the first image for overview section
  const getOverviewImage = () => {
    if (tour.images && tour.images.length > 0) {
      return tour.images[0];
    }
    // Fallback to tour card image if no images array
    return tour.image;
  };

  const overviewImage = getOverviewImage();

  // Content validation for overview
  const getOverviewContent = () => {
    if (tour.detailedContent?.trim()) {
      return tour.detailedContent.trim();
    }
    return "Tour overview coming soon...";
  };

  const overviewContent = getOverviewContent();

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 50-50 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left side - Overview Image (50%) */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={overviewImage}
                alt={`${tour.title} overview`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
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