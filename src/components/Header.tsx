import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import NavigationDropdown from "@/components/NavigationDropdown";
import useFocusTrap from "@/hooks/use-focus-trap";
import navTaxonomy from "@/data/navTaxonomy";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(drawerRef, isMenuOpen, () => setIsMenuOpen(false));

  const navigationItems = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Kerala Travels",
      href: "/tours?category=kerala",
      category: "kerala"
    },
    {
      name: "Discover India",
      href: "/tours?category=discover-india",
      category: "discover-india"
    },
    {
      name: "Global Holidays",
      href: "/tours?category=global",
      category: "global"
    },
    // Top Destinations removed from main header; reachable via Discover India dropdown
    {
      name: "Ayurveda",
      href: "/ayurveda-coming-soon"
    },
    {
      name: "Contact Us",
      href: "/contact"
    }
  ];

  return (
    <header
      className={isHome ? `w-full fixed top-0 left-0 z-40 transition-colors duration-200 ${isScrolled ? 'bg-white text-foreground shadow-md' : 'bg-black/30 text-white'}` : 'w-full sticky top-0 bg-white text-foreground shadow-md z-40'}
      style={{}}
      data-testid="site-header"
    >
      {/* Top Contact Bar - Hidden on mobile, visible on tablet+ */}
      <div className={`hidden md:block px-4 py-2 text-sm font-medium ${isHome ? 'bg-transparent' : 'bg-gray-50'}`}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            {/* Removed KeralaToursGlobal text */}
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
            <a href="tel:+919539507516" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" style={(isHome && !isScrolled) ? { color: 'white' } : { color: 'black' }} />
              <span>+91-9539-507516</span>
            </a>
            <a href="mailto:KeralaToursGlobal@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" style={(isHome && !isScrolled) ? { color: 'white' } : { color: 'black' }} />
              <span>KeralaToursGlobal@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`border-b ${isHome ? 'bg-transparent border-transparent' : 'bg-white border-gray-200'}`}>
            <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            {/* On very small screens stack logo above full brand name so the complete title is visible */}
            <Link to="/" className="flex flex-col sm:flex-row items-center gap-2 md:gap-3" aria-label="Go to homepage">
              <img src="/logo-header.png" alt="Kerala Travels" className="h-12 md:h-16 w-auto cursor-pointer" />
              <span className={`text-sm md:text-base lg:text-lg font-bold tracking-tight text-center sm:text-left ${isHome && !isScrolled ? 'text-white' : 'text-foreground'}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                KeralaTours Travels & Organic Remedies
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                // Insert Heli Taxi button immediately before Contact Us
                const renderItem = item.category ? (
                  <NavigationDropdown
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    category={item.category}
                  />
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-smooth font-semibold relative group whitespace-nowrap ${(isHome && !isScrolled) ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-gray-600'}`}
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: (isHome && !isScrolled) ? 'rgba(255, 255, 255, 0.8)' : '#9ca3af' }}></span>
                  </Link>
                );

                if (item.name === 'Contact Us') {
                  return (
                    <div key={item.name} className="flex items-center gap-4">
                      <Link
                        to="/heli-taxi"
                        className={`transition-smooth font-semibold relative group whitespace-nowrap ${(isHome && !isScrolled) ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-gray-600'}`}
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        Heli Taxi
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: (isHome && !isScrolled) ? 'rgba(255, 255, 255, 0.8)' : '#9ca3af' }}></span>
                      </Link>
                      {renderItem}
                    </div>
                  );
                }

                return renderItem;
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className={`drop-shadow-lg ${isHome && !isScrolled ? 'text-white hover:bg-white/20' : 'text-foreground hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            // Overlay drawer for mobile menu to avoid layout shifting and title overlap
            <div className="md:hidden fixed inset-0 z-50">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

              {/* Panel */}
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white text-foreground shadow-xl p-4 overflow-y-auto animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src="/logo-header.png" alt="Kerala" className="h-10 w-auto" />
                    <div className="font-semibold">KeralaTours</div>
                  </div>
                  <button aria-label="Close menu" className="p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="pb-3 mb-3 border-b border-border">
                  <a href="tel:+919539507516" className="flex items-center gap-2 py-2 text-sm text-foreground hover:text-foreground/80 transition-smooth min-h-[44px]">
                    <Phone className="h-4 w-4 text-foreground" />
                    <span className="text-sm">+91-9539-507516</span>
                  </a>
                  <a href="mailto:KeralaToursGlobal@gmail.com" className="flex items-center gap-2 py-2 text-sm text-foreground hover:text-foreground/80 transition-smooth min-h-[44px]">
                    <Mail className="h-4 w-4 text-foreground" />
                    <span className="text-sm">KeralaToursGlobal@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col space-y-3">
                  {navigationItems.map((item) => {
                    return item.category ? (
                    <details key={item.name} className="group">
                        <summary className="flex items-center justify-between text-foreground hover:text-rose-300 transition-smooth font-semibold py-2 list-none cursor-pointer" style={{ fontFamily: "'Sora', sans-serif" }}>
                          <span>{item.name}</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
                        </summary>

                        <div className="pl-3 pb-2 space-y-1">
                          {/* Render subcategory items from navTaxonomy */}
                          {navTaxonomy[item.category.toLowerCase()] && 
                            navTaxonomy[item.category.toLowerCase()].map((sub) => (
                              <Link
                                key={sub.slug}
                                to={sub.href ? sub.href : `/tours?category=${item.category}&subcategory=${sub.slug}`}
                                className="block text-sm text-foreground py-2 hover:text-foreground/80 hover:bg-gray-50 px-2 rounded min-h-[44px] flex items-center"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))
                          }
                          
                          {/* View all link */}
                          <Link
                            to={item.href}
                            className="block text-sm text-foreground font-medium py-2 hover:text-foreground/80 hover:bg-gray-50 px-2 rounded min-h-[44px] flex items-center border-t border-gray-200 mt-2 pt-3"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View all {item.name}
                          </Link>
                        </div>
                      </details>
                    ) : (
                      <div key={item.name}>
                        {item.name === 'Contact Us' && (
                          <>
                            <Link to="/heli-taxi" onClick={() => setIsMenuOpen(false)}>
                              {/* Make Heli Taxi match nav link styling instead of a full-width button */}
                              <span className="text-foreground font-semibold">Heli Taxi</span>
                            </Link>
                          </>
                        )}
                        <Link
                          to={item.href}
                          className="block text-foreground hover:text-foreground/80 transition-smooth font-semibold py-2 min-h-[44px] flex items-center"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;