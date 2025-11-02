// Navigation taxonomy derived from design sketch
// Keys are normalized to lower-case category names used in navigationItems
const navTaxonomy: Record<string, { label: string; slug: string }[]> = {
  "kerala": [
    { label: "Short Breaks in Kerala", slug: "short-breaks" },
    { label: "Cultural Tours", slug: "cultural-tours" },
    { label: "Hillstations & Wildlife", slug: "hillstations-wildlife" },
    { label: "Backwater Trips", slug: "backwater-trips" },
    { label: "Beach Paradise", slug: "beach-paradise" }
  ],
  "discover-india": [
    { label: "100 Beautiful Places in India", slug: "100-beautiful-places", href: "/top-destinations" },
    { label: "Golden Triangle", slug: "golden-triangle" },
    { label: "Silver Triangle", slug: "silver-triangle" },
    { label: "Lakshadweep", slug: "lakshadweep" },
    { label: "Andaman", slug: "andaman" },
    { label: "South India Trails", slug: "south-india-trails" },
    { label: "Odisha", slug: "odisha" },
    { label: "North East", slug: "north-east" },
    { label: "Kashmir", slug: "kashmir" }
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


