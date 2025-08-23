export interface Destination {
  id: number;
  name: string;
  image: string;
  slug: string;
  description?: string; // Optional for future enhancements
}

export interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export interface PopularDestinationsSectionProps {
  className?: string;
}