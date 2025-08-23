import { DestinationCardProps } from "@/lib/types/destinations";
import { cn } from "@/lib/utils";

const DestinationCard = ({ destination, className }: DestinationCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-card hover:shadow-warm transition-all duration-300 cursor-pointer",
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${destination.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Future: Handle navigation to destination detail page
          console.log(`Navigate to ${destination.slug}`);
        }
      }}
      onClick={() => {
        // Future: Handle navigation to destination detail page
        console.log(`Navigate to ${destination.slug}`);
      }}
      onFocus={(e) => {
        // Add focus styling
        e.currentTarget.classList.add('ring-2', 'ring-golden', 'ring-offset-2');
      }}
      onBlur={(e) => {
        // Remove focus styling
        e.currentTarget.classList.remove('ring-2', 'ring-golden', 'ring-offset-2');
      }}
    >
      {/* Destination Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={destination.image}
          alt={`Scenic view of ${destination.name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Destination name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
            {destination.name}
          </h3>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-golden/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default DestinationCard;