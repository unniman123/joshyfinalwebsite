// Navigation taxonomy derived from design sketch and database categories
// Keys are normalized to lower-case category names used in navigationItems
// Includes both existing categories and newly added subcategories
const navTaxonomy: Record<string, { label: string; slug: string; href?: string }[]> = {
  "kerala": [
    // Existing categories
    { label: "Short Breaks in Kerala", slug: "short-breaks" },
    { label: "Cultural Tours", slug: "cultural-tours" },
    { label: "Hillstations & Wildlife", slug: "hillstations-wildlife" },
    { label: "Backwater Trips", slug: "backwater-trips" },
    { label: "Beach Paradise", slug: "beach-paradise" },
    // Newly added categories
    { label: "Kerala Tours", slug: "kerala-tours" },
    { label: "Rice Trails", slug: "rice-trails" },
    { label: "Beach Holidays", slug: "beach-holidays-kerala" },
    { label: "Weekends in Kerala", slug: "weekends-in-kerala" },
    { label: "Short Breaks", slug: "short-breaks-kerala" },
    { label: "2 - 4 Weeks Tours", slug: "2-4-weeks-tours" },
    { label: "Wildlife Tours", slug: "wildlife-tours-kerala" },
    { label: "Spiritual", slug: "spiritual-kerala" },
    { label: "Heritage Tours", slug: "heritage-tours-kerala" },
    { label: "Cultural Tours in Kerala", slug: "cultural-tours-in-kerala" },
    { label: "Offbeat Tours", slug: "offbeat-tours-kerala" }
  ],
  "discover-india": [
    // Existing categories
    { label: "100 Beautiful Places in India", slug: "100-beautiful-places" },
    { label: "Golden Triangle", slug: "golden-triangle" },
    { label: "Silver Triangle", slug: "silver-triangle" },
    { label: "Lakshadweep", slug: "lakshadweep" },
    { label: "Andaman", slug: "andaman" },
    { label: "South India Trails", slug: "south-india-trails" },
    { label: "Odisha", slug: "odisha" },
    { label: "North East", slug: "north-east" },
    { label: "Kashmir", slug: "kashmir" },
    // Newly added categories
    { label: "Beautiful Places in India", slug: "beautiful-places-in-india" },
    { label: "Kerala Travels", slug: "kerala-travels-discover" },
    { label: "South India", slug: "south-india" },
    { label: "Golden Triangle", slug: "golden-triangle-discover" },
    { label: "Silver Triangle", slug: "silver-triangle-discover" },
    { label: "Indian Short Tours", slug: "indian-short-tours" },
    { label: "Kashmir", slug: "kashmir-discover" },
    { label: "Goa", slug: "goa-discover" },
    { label: "Gujarat", slug: "gujarat-discover" },
    { label: "Rajasthan", slug: "rajasthan-discover" },
    { label: "Summer Escapes", slug: "summer-escapes" },
    { label: "Lakshadweep", slug: "lakshadweep-discover" },
    { label: "Hyderabad", slug: "hyderabad-discover" },
    { label: "Indian Wildlife Tours", slug: "indian-wildlife-tours" },
    { label: "Andaman Archipelago", slug: "andaman-archipelago" },
    { label: "Beach Holidays", slug: "beach-holidays-discover" },
    { label: "Tamil Nadu", slug: "tamil-nadu-discover" },
    { label: "Himachal Pradesh", slug: "himachal-pradesh-discover" },
    { label: "Heritage Tours", slug: "heritage-tours-discover" },
    { label: "Spiritual Tours", slug: "spiritual-tours-discover" },
    { label: "Indian River Cruises", slug: "indian-river-cruises" },
    { label: "Odisha", slug: "odisha-discover" },
    { label: "North East", slug: "north-east-discover" },
    { label: "Uttarakhand", slug: "uttarakhand-discover" },
    { label: "Luxury Train Tours", slug: "luxury-train-tours" },
    { label: "Buddhist Holidays", slug: "buddhist-holidays" }
  ],
  "global": [
    { label: "Maldives", slug: "maldives" },
    { label: "Thailand", slug: "thailand" },
    { label: "Vietnam", slug: "vietnam" },
    { label: "Sri Lanka", slug: "sri-lanka" },
    { label: "Bhutan", slug: "bhutan" },
    { label: "Nepal", slug: "nepal" },
    { label: "Indonesia", slug: "indonesia" },
    { label: "Malaysia", slug: "malaysia" },
    { label: "Singapore", slug: "singapore" }
  ]
};

export default navTaxonomy;