import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { TourSummary } from "@/lib/api";
import navTaxonomy from '@/data/navTaxonomy';
interface ToursGridProps {
  tours: TourSummary[];
  loading?: boolean;
}
const ToursGrid = ({
  tours,
  loading = false
}: ToursGridProps) => {
  if (loading) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {Array.from({
        length: 6
      }).map((_, index) => <Card key={index} className="animate-pulse">
        <div className="h-40 sm:h-44 md:h-48 bg-muted rounded-t-lg" />
        <CardHeader>
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </CardHeader>
      </Card>)}
    </div>;
  }
  if (tours.length === 0) {
    return <div className="text-center py-8 sm:py-10 md:py-12">
      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
        <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2 px-4">No tours found</h3>
      <p className="text-muted-foreground text-sm sm:text-base px-4">
        Try adjusting your filters to see more results.
      </p>
    </div>;
  }
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
    {tours.map(tour => <Link
      key={tour.id}
      to={`/tours/${tour.slug}`}
      className="block group transition-all duration-300 hover:shadow-lg"
      aria-label={`View details for ${tour.title} tour`}
    >
      <Card className="border-2 border-border/30 hover:border-border/50 group-hover:shadow-lg hover:shadow-brand-green/20 transition-all duration-300 h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img src={tour.image} alt={tour.title} className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <CardHeader className="p-3 sm:p-4 md:p-6">
          <CardTitle className="line-clamp-2 group-hover:text-brand-green transition-colors text-base sm:text-lg md:text-xl">
            {tour.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-xs sm:text-sm">
            {tour.description}
          </CardDescription>
          <div className="mt-2 sm:mt-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {(tour.subcategories && tour.subcategories.length > 0 ? tour.subcategories.slice(0, 2) : (tour.categories || [])).map((sub) => {
                // resolve label from taxonomy if available
                const label = Object.values(navTaxonomy).flat().find(s => s.slug === sub)?.label || sub;
                return (
                  <Link key={sub} to={`/tours?category=${(tour.categories && tour.categories[0]) || (tour.category || '')}&subcategory=${sub}`} className="text-[10px] sm:text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded font-medium hover:bg-brand-green/20 min-h-[28px] flex items-center">
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5 sm:gap-2">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tour.duration} days</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Removed duration and category display */}
        </CardContent>
      </Card>
    </Link>)}
  </div>;
};
export default ToursGrid;

// TODO: Replace placeholders with real tour data from API
// TODO: Add proper image loading states and error handling
// TODO: Implement tour detail page navigation
