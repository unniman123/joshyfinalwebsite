import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getAllTours, getTourCategories, getToursByCategory, TourSummary } from "@/lib/api";
import navTaxonomy from "@/data/navTaxonomy";

interface NavigationDropdownProps {
  name: string;
  href: string;
  category?: string;
}

const NavigationDropdown = ({ name, href, category }: NavigationDropdownProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [openTimeout, setOpenTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch tours for this category when dropdown is opened (lazy-load)
  useEffect(() => {
    let cancelled = false;

    const fetchTours = async () => {
      if (isOpen && category) {
        // Don't fetch if we already have tours for this category
        if (tours.length > 0) return;

        try {
          setLoading(true);

          // Use API helper to fetch tours for this category (with optional limit)
          const categoryTours = await getToursByCategory(category, 8);

          if (!cancelled) setTours(categoryTours);
        } catch (error) {
          console.error("Error fetching tours:", error);
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
    };

    fetchTours();

    return () => {
      cancelled = true;
    };
  }, [isOpen, category, tours.length]);

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    // Clear any existing close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }

    // Clear any existing open timeout
    if (openTimeout) {
      clearTimeout(openTimeout);
    }

    // Set new open timeout (150ms delay)
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 150);
    setOpenTimeout(timeout);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    // Clear any existing open timeout
    if (openTimeout) {
      clearTimeout(openTimeout);
      setOpenTimeout(null);
    }

    // Clear any existing close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }

    // Set new close timeout (300ms delay)
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 300);
    setCloseTimeout(timeout);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (openTimeout) clearTimeout(openTimeout);
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [openTimeout, closeTimeout]);

  // Only show dropdown for categories that have tours or category prop
  const hasDropdown = !!category;

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={href}
        className={`transition-smooth font-semibold relative flex items-center gap-1 py-2 ${(isHome && !isScrolled) ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-gray-600'}`}
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {name}
        {hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: (isHome && !isScrolled) ? 'rgba(255, 255, 255, 0.8)' : '#9ca3af' }}></span>
      </Link>

      {hasDropdown && isOpen && (
        <div
          className="absolute left-0 mt-0 w-80 bg-white rounded-lg shadow-xl border border-border z-50 animate-fade-in"
          style={{ fontFamily: "'Sora', sans-serif" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-3 px-3 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                <div className="text-sm text-muted-foreground">Loading tours...</div>
              </div>
            ) : tours.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {/* If taxonomy exists for this category, render subcategory headings */}
                {navTaxonomy[category?.toLowerCase() || ""] && (
                  <div className="mb-2">
                    {navTaxonomy[category!.toLowerCase()].map((sub: any) => (
                      <Link
                        key={sub.slug}
                        to={sub.href ? sub.href : `/tours?category=${category}&subcategory=${sub.slug}`}
                        className="block text-sm text-foreground font-medium px-2 py-1 rounded transition-colors hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                    <div className="my-1 border-t border-border" />
                  </div>
                )}
                {tours.map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/tours/${tour.slug}`}
                    className="flex items-center gap-3 px-2 py-2 rounded transition-all hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <img src={tour.image} alt={tour.title} className="h-12 w-20 object-cover rounded" />
                    <div className="text-sm">
                      <div className="font-semibold text-foreground line-clamp-2">{tour.title}</div>
                      <div className="text-muted-foreground text-xs">{tour.duration} days</div>
                    </div>
                  </Link>
                ))}
                <Link
                  to={href || `/tours?category=${encodeURIComponent((name || '').toLowerCase().replace(/\s+/g, '-'))}`}
                  className="mt-2 block text-center text-sm font-medium text-gray-600 hover:text-gray-800 hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  View all {name}
                </Link>
              </div>
            ) : (
              <div className="px-2 py-2 text-muted-foreground text-sm">
                No tours available in this category
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationDropdown;