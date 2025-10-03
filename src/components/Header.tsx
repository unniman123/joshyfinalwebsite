import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import NavigationDropdown from "@/components/NavigationDropdown";

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

  const navigationItems = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Kerala Travels",
      href: "/tours?category=kerala",
      category: "kerala travels"
    },
    {
      name: "Discover India",
      href: "/tours?category=discover-india",
      category: "discover india"
    },
    {
      name: "Global Holidays",
      href: "/tours?category=global",
      category: "global"
    },
    // Top Destinations removed from main header; reachable via Discover India dropdown
    {
      name: "Ayurveda",
      href: "/tours"
    },
    {
      name: "Contact Us",
      href: "/contact"
    }
  ];

  return (
    <header className={isHome ? `w-full fixed top-0 left-0 z-40 transition-colors duration-200 ${isScrolled ? 'bg-white text-foreground shadow-md' : 'bg-black/30 text-white'}` : 'w-full sticky top-0 bg-white text-foreground shadow-md z-40'}>
      {/* Top Contact Bar */}
      <div className={`px-4 py-2 text-sm font-medium ${isHome ? 'bg-transparent' : 'bg-gray-50'}`}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            {/* Removed KeralaToursGlobal text */}
          </div>
          <div className="flex items-center gap-4 text-sm" style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}}>
            <div className="flex items-center gap-2">
              <Phone className={`h-4 w-4 ${isHome ? 'drop-shadow-lg' : ''}`} style={!isHome ? { color: 'hsl(345 65% 45%)' } : {}} />
              <span>+91-9539507516</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className={`h-4 w-4 ${isHome ? 'drop-shadow-lg' : ''}`} style={!isHome ? { color: 'hsl(345 65% 45%)' } : {}} />
              <span>KeralaToursGlobal@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`border-b ${isHome ? 'bg-transparent border-transparent' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/src/assets/logo-header.png.png" alt="Kerala Travels" className={`h-10 w-auto cursor-pointer ${isHome ? 'drop-shadow-lg' : ''}`} />
              <span className={`site-title text-lg font-extrabold ${isHome ? '' : 'text-foreground'}`} style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}}>
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
                    className={`transition-smooth font-bold relative group ${isHome ? 'hover:text-rose-300' : 'text-foreground'}`}
                    style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}}
                    onMouseEnter={!isHome ? (e) => e.currentTarget.style.color = 'hsl(345 65% 45%)' : undefined}
                    onMouseLeave={!isHome ? (e) => e.currentTarget.style.color = '' : undefined}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: isHome ? 'rgb(253 164 175)' : 'hsl(345 65% 45%)' }}></span>
                  </Link>
                );

                if (item.name === 'Contact Us') {
                  return (
                    <div key={item.name} className="flex items-center gap-4">
                      <Link
                        to="/heli-taxi"
                        className={`transition-smooth font-bold relative group ${isHome ? 'hover:text-rose-300' : 'text-foreground'}`}
                        style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.8)' } : {}}
                        onMouseEnter={!isHome ? (e) => e.currentTarget.style.color = 'hsl(345 65% 45%)' : undefined}
                        onMouseLeave={!isHome ? (e) => e.currentTarget.style.color = '' : undefined}
                      >
                        Heli Taxi
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: isHome ? 'rgb(253 164 175)' : 'hsl(345 65% 45%)' }}></span>
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
                className="drop-shadow-lg"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20 animate-fade-in bg-black/40">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => {
                  item.category ? (
                    <details key={item.name} className="group">
                      <summary className="flex items-center justify-between text-white hover:text-rose-300 transition-smooth font-bold py-2 list-none cursor-pointer" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        <span>{item.name}</span>
                      </summary>

                      <div className="pl-3 pb-2">
                        {/* Lazy render a link to view all and let dropdown pages handle subcategory links */}
                        <Link
                          to={item.href}
                          className="block text-sm text-white/90 py-2 hover:text-rose-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          View all {item.name}
                        </Link>
                      </div>
                    </details>
                  ) : (
                    <div key={item.name}>
                      {item.name === 'Contact Us' && (
                        <div className="pb-2">
                          <Button variant="default" onClick={() => setIsMenuOpen(false)} className="w-full mb-2">Heli Taxi</Button>
                        </div>
                      )}
                      <Link
                        to={item.href}
                        className="text-white hover:text-rose-300 transition-smooth font-bold py-2"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;