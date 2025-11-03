import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
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
  const [openTimeout, setOpenTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Note: Removed tour preview fetching/rendering per design request.
  // Dropdown now only shows subcategory links and the "View all" link.

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
        className={`transition-smooth font-semibold relative flex items-center gap-1 py-2 whitespace-nowrap ${(isHome && !isScrolled) ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-gray-600'}`}
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
            <div className="grid grid-cols-1 gap-2">
              {/* Render subcategory headings if taxonomy exists - ALWAYS show regardless of tours */}
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

              {/* View all link - always show */}
              <Link
                to={href || `/tours?category=${encodeURIComponent((name || '').toLowerCase().replace(/\s+/g, '-'))}`}
                className="mt-2 block text-center text-sm font-medium text-gray-600 hover:text-gray-800 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View all {name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationDropdown;