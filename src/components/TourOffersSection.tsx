import { Link } from "react-router-dom";
import keralaTourCard from "@/assets/kerala-tour-card.jpg";
import heroRajasthanPalace from "@/assets/hero-rajasthan-palace.jpg";
import heroAyurvedaSpa from "@/assets/hero-ayurveda-spa.jpg";

const TourOffersSection = () => {
  const tourOffers = [
    {
      id: 1,
      title: "Kerala Backwaters",
      image: keralaTourCard,
      slug: "kerala-backwaters-explorer"
    },
    {
      id: 2,
      title: "Rajasthan Royal",
      image: heroRajasthanPalace,
      slug: "rajasthan-royal-heritage"
    },
    {
      id: 3,
      title: "Ayurveda Wellness",
      image: heroAyurvedaSpa,
      slug: "ayurveda-wellness-retreat"
    },
    {
      id: 4,
      title: "Kerala Beaches",
      image: keralaTourCard,
      slug: "kerala-beaches"
    },
    {
      id: 5,
      title: "Hill Stations",
      image: keralaTourCard,
      slug: "kerala-hill-stations"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Top Selling Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
        </div>

        {/* Tour Packages Grid - 4-5 items per row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tourOffers.map((tour) => (
            <Link
              key={tour.id}
              to={`/tours/${tour.slug}`}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-semibold text-center px-2">
                  {tour.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourOffersSection;
