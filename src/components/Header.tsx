import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import NavigationDropdown from "@/components/NavigationDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    {
      name: "Top Destinations",
      href: "/top-destinations"
    },
    {
      name: "Ayurveda",
      href: "/tours",
      category: "ayurveda"
    },
    {
      name: "Contact Us",
      href: "/contact"
    }
  ];

  return (
    <header className="w-full bg-background shadow-warm">
      {/* Top Contact Bar */}
      <div className="bg-gradient-golden px-4 py-2 text-sm font-medium text-primary-foreground">
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
      <nav className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/src/assets/logo-header.png.png" alt="Kerala Travels" className="h-10 w-auto cursor-pointer" />
              <span className="text-lg font-semibold text-golden" style={{ fontFamily: "'Book Antiqua', 'Palatino Linotype', Palatino, serif" }}>
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
                    className="text-foreground hover:text-golden transition-smooth font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden transition-all duration-300 group-hover:w-full"></span>
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
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className="text-foreground hover:text-golden transition-smooth font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
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