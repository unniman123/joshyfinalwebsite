import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { TourSummary } from "@/lib/api";
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
      {tours.map(tour => <Card key={tour.id} className="group hover:shadow-lg transition-shadow duration-300">
          <div className="relative overflow-hidden rounded-t-lg">
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-foreground">
              {tour.category}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-golden transition-colors">
              {tour.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {tour.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{tour.category}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 flex gap-2">
            <Button variant="outline" className="flex-1 group-hover:scale-105 transition-transform" asChild>
              <Link to={`/tours/${tour.slug}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="cta" className="flex-1 group-hover:scale-105 transition-transform" asChild>
              
            </Button>
          </CardFooter>
        </Card>)}
    </div>;
};
export default ToursGrid;

// TODO: Replace placeholders with real tour data from API
// TODO: Add proper image loading states and error handling
// TODO: Implement tour detail page navigation