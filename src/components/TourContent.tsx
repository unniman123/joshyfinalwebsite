import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tour } from "@/lib/api";
import GoogleMap from "@/components/GoogleMap";
import ContactForm from "@/components/ContactForm";
interface TourContentProps {
  tour: Tour;
}
const TourContent = ({
  tour
}: TourContentProps) => {
  return <div className="container mx-auto max-w-7xl px-4 py-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 py-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-4">Tour Overview</h3>
            {/* TODO: Populate with tour.overview */}
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground">
                {tour.detailedContent}
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="itinerary" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
            {/* TODO: Populate with tour.itinerary */}
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground">
                {tour.itinerary}
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inclusions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-600">What's Included</h3>
              {/* TODO: Populate with tour.inclusions */}
              <div className="bg-green-50 p-6 rounded-lg">
                <ul className="space-y-2">
                  {tour.inclusions.map((item, index) => <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-600">What's Not Included</h3>
              {/* TODO: Populate with tour.exclusions */}
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="space-y-2">
                  {tour.exclusions.map((item, index) => <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Tour Locations</h3>
            {/* TODO: Integrate Google Maps with tour.mapLocation */}
            <GoogleMap locations={tour.mapLocation ? [tour.mapLocation] : []} />
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get More Information</h3>
            <ContactForm tourId={tour.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default TourContent;