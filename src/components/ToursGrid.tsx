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
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({
        length: 6
      }).map((_, index) => <Card key={index} className="animate-pulse">
        <div className="h-48 bg-muted rounded-t-lg" />
        <CardHeader>
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </CardHeader>
      </Card>)}
    </div>;
  }
  if (tours.length === 0) {
    return <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <MapPin className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tours found</h3>
      <p className="text-muted-foreground">
        Try adjusting your filters to see more results.
      </p>
    </div>;
  }
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {tours.map(tour => <Link
      key={tour.id}
      to={`/tours/${tour.slug}`}
      className="block group transition-all duration-300 hover:shadow-lg"
      aria-label={`View details for ${tour.title} tour`}
    >
      <Card className="border-2 border-brand-green/30 hover:border-brand-green/50 group-hover:shadow-lg hover:shadow-brand-green/20 transition-all duration-300 h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-brand-green transition-colors">
            {tour.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {tour.description}
          </CardDescription>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {(tour.subcategories && tour.subcategories.length > 0 ? tour.subcategories.slice(0, 2) : (tour.categories || [])).map((sub) => {
                // resolve label from taxonomy if available
                const label = Object.values(navTaxonomy).flat().find(s => s.slug === sub)?.label || sub;
                return (
                  <Link key={sub} to={`/tours?category=${(tour.categories && tour.categories[0]) || (tour.category || '')}&subcategory=${sub}`} className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded font-medium hover:bg-brand-green/20">
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
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
