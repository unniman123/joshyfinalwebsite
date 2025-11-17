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
              <span>+91-95395-07516</span>
            </a>
            <a href="mailto:KeralaToursGlobal@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" style={(isHome && !isScrolled) ? { color: 'white' } : { color: 'black' }} />
              <span>KeralaToursGlobal@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`border-b ${isHome ? 'bg-transparent border-transparent' : 'bg-white border-gray-200'}`} style={{ fontFamily: "'Sora', sans-serif" }}>
            <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            {/* Optimized mobile layout: smaller logo, wrapped text on tiny screens */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 max-w-[60%] md:max-w-none" aria-label="Go to homepage">
              <img src="/logo-header.png" alt="Kerala Travels" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto cursor-pointer flex-shrink-0" />
              <span className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-tight leading-tight ${isHome && !isScrolled ? 'text-white' : 'text-foreground'}`} style={{ fontFamily: "'Sora', sans-serif" }}>
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
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className={`transition-smooth font-semibold relative group whitespace-nowrap ${(isHome && !isScrolled) ? 'text-white hover:text-gray-200' : 'text-foreground hover:text-gray-600'}`}
                        style={{ fontFamily: "'Sora', sans-serif" }}
                        aria-disabled="true"
                      >
                        Heli Taxi
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: (isHome && !isScrolled) ? 'rgba(255, 255, 255, 0.8)' : '#9ca3af' }}></span>
                      </button>
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

              {/* Panel - Full width on very small screens, then 85% */}
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute right-0 top-0 h-full w-full xs:w-[85%] sm:w-4/5 max-w-sm bg-white text-foreground shadow-xl p-4 sm:p-6 overflow-y-auto animate-slide-in">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src="/logo-header.png" alt="Kerala" className="h-10 sm:h-12 w-auto" />
                    <div className="font-semibold text-sm sm:text-base">KeralaTours Travels & Organic Remedies</div>
                  </div>
                  <button aria-label="Close menu" className="p-2 sm:p-3 rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                <div className="pb-4 mb-4 border-b border-border space-y-2">
                  <a href="tel:+919539507516" className="flex items-center gap-3 py-3 text-sm text-foreground hover:text-foreground/80 hover:bg-gray-50 rounded-lg px-3 transition-smooth min-h-[48px]">
                    <Phone className="h-5 w-5 text-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">+91-95395-07516</span>
                  </a>
                  <a href="mailto:KeralaToursGlobal@gmail.com" className="flex items-center gap-3 py-3 text-sm text-foreground hover:text-foreground/80 hover:bg-gray-50 rounded-lg px-3 transition-smooth min-h-[48px]">
                    <Mail className="h-5 w-5 text-foreground flex-shrink-0" />
                    <span className="text-sm font-medium break-all">KeralaToursGlobal@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col space-y-2">
                  {navigationItems.map((item) => {
                    return item.category ? (
                    <details key={item.name} className="group">
                        <summary className="flex items-center justify-between text-foreground hover:bg-gray-50 transition-smooth font-semibold py-3 px-3 list-none cursor-pointer rounded-lg min-h-[48px]" style={{ fontFamily: "'Sora', sans-serif" }}>
                          <span className="text-base">{item.name}</span>
                          <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
                        </summary>

                        <div className="pl-4 pr-2 pb-2 pt-1 space-y-1">
                          {/* Render subcategory items from navTaxonomy */}
                          {navTaxonomy[item.category.toLowerCase()] && 
                            navTaxonomy[item.category.toLowerCase()].map((sub) => (
                              <Link
                                key={sub.slug}
                                to={sub.href ? sub.href : `/tours?category=${item.category}&subcategory=${sub.slug}`}
                                className="block text-sm text-foreground py-3 px-3 hover:text-foreground/80 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center transition-smooth"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))
                          }
                          
                          {/* View all link */}
                          <Link
                            to={item.href}
                            className="block text-sm text-foreground font-medium py-3 px-3 hover:text-foreground/80 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center border-t border-gray-200 mt-2 transition-smooth"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View all {item.name}
                          </Link>
                        </div>
                      </details>
                    ) : (
                      <div key={item.name}>
                        {item.name === 'Contact Us' && (
                          <button type="button" onClick={(e) => e.preventDefault()} className="block text-foreground hover:bg-gray-50 font-semibold py-3 px-3 min-h-[48px] flex items-center rounded-lg transition-smooth text-base mb-2" style={{ fontFamily: "'Sora', sans-serif" }} aria-disabled="true">
                            Heli Taxi
                          </button>
                        )}
                        <Link
                          to={item.href}
                          className="block text-foreground hover:bg-gray-50 hover:text-foreground/80 transition-smooth font-semibold py-3 px-3 min-h-[48px] flex items-center rounded-lg text-base"
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