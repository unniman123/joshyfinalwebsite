import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getAllTours } from "@/lib/api";
import { TourSummary } from "@/lib/api";

interface NavigationDropdownProps {
  name: string;
  href: string;
  category?: string;
}

const NavigationDropdown = ({ name, href, category }: NavigationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [openTimeout, setOpenTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch tours for this category when dropdown is opened
  useEffect(() => {
    const fetchTours = async () => {
      if (isOpen && category) {
        // Don't fetch if we already have tours for this category
        if (tours.length > 0) return;
        
        try {
          setLoading(true);
          const allTours = await getAllTours();
          const categoryTours = allTours.filter(tour => 
            tour.category.toLowerCase() === category.toLowerCase()
          );
          setTours(categoryTours);
        } catch (error) {
          console.error("Error fetching tours:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTours();
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

  // Only show dropdown for categories that have tours
  const hasDropdown = !!category;

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={href} 
        className="text-foreground hover:text-golden transition-smooth font-medium relative flex items-center gap-1 py-2"
      >
        {name}
        {hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {hasDropdown && isOpen && (
        <div 
          className="absolute left-0 mt-0 w-80 bg-white rounded-lg shadow-xl border border-border z-50 animate-fade-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-muted-foreground flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-golden mr-2"></div>
                Loading tours...
              </div>
            ) : tours.length > 0 ? (
              tours.map((tour) => (
                <Link
                  key={tour.id}
                  to={`/tours/${tour.slug}`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-golden/10 hover:text-golden transition-all duration-200 border-b border-border last:border-b-0 hover:pl-6"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold">{tour.title}</div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-muted-foreground text-sm">
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