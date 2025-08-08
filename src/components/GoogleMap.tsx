interface GoogleMapProps {
  locations: { lat: number; lng: number }[];
}

const GoogleMap = ({ locations }: GoogleMapProps) => {
  // TODO: Integrate Google Maps React component
  return (
    <div className="bg-muted/30 p-12 rounded-lg text-center min-h-96">
      <p className="text-muted-foreground mb-4">
        Interactive Google Map will be displayed here showing tour locations and route
      </p>
      {locations.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">Tour Locations:</p>
          {locations.map((location, index) => (
            <p key={index}>
              Location {index + 1}: {location.lat}, {location.lng}
            </p>
          ))}
        </div>
      )}
      {/* TODO: Replace with actual Google Maps component */}
      {/* TODO: Add markers for each location */}
      {/* TODO: Add route display between locations */}
      {/* TODO: Add zoom and pan controls */}
    </div>
  );
};

export default GoogleMap;