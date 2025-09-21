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

  const useDarkLinks = !isHome || isScrolled;

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
    <header className={isHome ? `w-full fixed top-0 left-0 z-40 transition-colors duration-200 ${isScrolled ? 'bg-white/95 text-foreground shadow-md' : 'bg-transparent text-white'}` : 'w-full relative bg-white/95 text-foreground shadow-md'}>
      {/* Top Contact Bar - transparent to blend with hero */}
      <div className={`${isScrolled ? 'bg-white/0 text-foreground' : 'bg-transparent text-white'} px-4 py-2 text-sm font-medium backdrop-blur-sm`}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            {/* Removed KeralaToursGlobal text */}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 9539 50 7516</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>KeralaToursGlobal@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="backdrop-blur-sm bg-white/5 border-b border-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/src/assets/logo-header.png.png" alt="Kerala Travels" className="h-10 w-auto cursor-pointer" />
              <span className={`site-title text-lg font-extrabold ${isScrolled ? 'text-foreground' : 'text-white/90'}`}>
                KeralaTours Travels & Organic Remedies
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                item.category ? (
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
                    className={`transition-smooth font-medium relative group ${useDarkLinks ? 'text-foreground hover:text-brand-green' : 'text-white hover:text-white/80'}`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  item.category ? (
                    <details key={item.name} className="group">
                      <summary className="flex items-center justify-between text-foreground hover:text-brand-green transition-smooth font-medium py-2 list-none cursor-pointer">
                        <span>{item.name}</span>
                      </summary>

                      <div className="pl-3 pb-2">
                        {/* Lazy render a link to view all and let dropdown pages handle subcategory links */}
                        <Link
                          to={item.href}
                          className="block text-sm text-foreground py-2 hover:text-brand-green"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          View all {item.name}
                        </Link>
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-foreground hover:text-brand-green transition-smooth font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;