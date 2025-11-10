// Navigation taxonomy - synchronized with database categories
// Keys are normalized to lower-case category names used in navigationItems
const navTaxonomy: Record<string, { label: string; slug: string; href?: string }[]> = {
  "kerala": [
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
    { label: "Beautiful Places in India", slug: "beautiful-places-in-india" },
    { label: "Kerala Travels", slug: "kerala-travels-discover" },
    { label: "South India", slug: "south-india" },
    { label: "Golden Triangle", slug: "golden-triangle" },
    { label: "Silver Triangle", slug: "silver-triangle" },
    { label: "Indian Short Tours", slug: "indian-short-tours" },
    { label: "Kashmir", slug: "kashmir" },
    { label: "Goa", slug: "goa" },
    { label: "Gujarat", slug: "gujarat" },
    { label: "Rajasthan", slug: "rajasthan" },
    { label: "Summer Escapes", slug: "summer-escapes" },
    { label: "Lakshadweep", slug: "lakshadweep" },
    { label: "Hyderabad", slug: "hyderabad" },
    { label: "Indian Wildlife Tours", slug: "indian-wildlife-tours" },
    { label: "Andaman Archipelago", slug: "andaman-archipelago" },
    { label: "Beach Holidays", slug: "beach-holidays-india" },
    { label: "Tamil Nadu", slug: "tamil-nadu" },
    { label: "Himachal Pradesh", slug: "himachal-pradesh" },
    { label: "Heritage Tours", slug: "heritage-tours-india" },
    { label: "Spiritual Tours", slug: "spiritual-tours-india" },
    { label: "Indian River Cruises", slug: "indian-river-cruises" },
    { label: "Odisha", slug: "odisha" },
    { label: "North East", slug: "north-east" },
    { label: "Uttarakhand", slug: "uttarakhand" },
    { label: "Luxury Train Tours", slug: "luxury-train-tours" },
    { label: "Buddhist Holidays", slug: "buddhist-holidays" }
  ],
  "global": [
    { label: "Egypt", slug: "egypt" },
    { label: "Hong Kong", slug: "hong-kong" },
    { label: "Albania", slug: "albania" },
    { label: "Azerbaijan", slug: "azerbaijan" },
    { label: "Turkey", slug: "turkey" },
    { label: "Kazakhstan", slug: "kazakhstan" },
    { label: "Mauritius", slug: "mauritius" },
    { label: "Cambodia", slug: "cambodia" },
    { label: "Jordan", slug: "jordan" },
    { label: "Morocco", slug: "morocco" }
  ]
};

export default navTaxonomy;