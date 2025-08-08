import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tour } from "@/lib/api";
import { Clock, MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
interface RelatedToursProps {
  tours: Tour[];
}
const RelatedTours = ({
  tours
}: RelatedToursProps) => {
  if (tours.length === 0) {
    return null;
  }
  return <section className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Related Tours
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover more amazing destinations and experiences
        </p>
      </div>
      
      {/* TODO: Replace with real related tour data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <Link to={`/tours/${tour.slug}`}>
                <CardTitle className="text-xl mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                  {tour.title}
                </CardTitle>
              </Link>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {tour.description}
              </p>
              
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration} Days</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.category}</span>
                </div>
                {tour.price && <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    <span>{tour.price}</span>
                  </div>}
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              {/* TODO: Verify navigation to /tours/${tour.slug} works as expected */}
              <Link to={`/tours/${tour.slug}`} className="w-full">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>)}
      </div>
    </section>;
};
export default RelatedTours;