import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin } from "lucide-react";
import { getSocialIconClass, getSocialPlatformConfig } from "@/lib/utils/socialUtils";
const Footer = () => {
  const quickLinks = [{
    name: "Kerala Travels",
    href: "/tours?category=kerala"
  }, {
    name: "Discover India",
    href: "/tours?category=discover-india"
  }, {
    name: "Global Holidays",
    href: "/tours?category=global"
  }, {
    name: "Ayurveda",
    href: "/tours"
  }, {
    name: "Heritage Tours",
    href: "/tours?category=heritage"
  }];
  const supportLinks = [{
    name: "Contact Us",
    href: "/contact"
  }, {
    name: "About Us",
    href: "/about"
  }, {
    name: "Terms & Conditions",
    href: "/terms"
  }, {
    name: "Privacy Policy",
    href: "/privacy"
  }];
  return <footer className="bg-slate-900 text-white w-full">
    <div className="container mx-auto px-4 py-5">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Quick Links</h3>
          <ul className="space-y-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            {quickLinks.map(link => <li key={link.name}>
              <Link to={link.href} className="text-white/80 hover:text-gray-300 transition-smooth">
                {link.name}
              </Link>
            </li>)}
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Support</h3>
          <ul className="space-y-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            {supportLinks.map(link => (
              <li key={link.name}>
                <Link to={link.href} className="text-white/80 hover:text-gray-300 transition-smooth">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Get In Touch</h3>

          {/* Contact Details */}
          <div className="space-y-1.5" style={{ fontFamily: "'Sora', sans-serif" }}>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0 text-white" />
              <span className="text-xs text-white/80">
                <a href="tel:+919539507516" className="hover:text-white transition-colors">+91-95395-07516</a>
                {", "}
                <a href="tel:+914712488880" className="hover:text-white transition-colors">+91-471-2488880</a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 flex-shrink-0 text-white" />
              <span className="text-xs text-white/80">
                <a href="mailto:KeralaToursGlobal@gmail.com" className="hover:text-white transition-colors">KeralaToursGlobal@gmail.com</a>
                {", "}
                <a href="mailto:flabour@gmail.com" className="hover:text-white transition-colors">flabour@gmail.com</a>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-white" />
              <span className="text-xs text-white/80">
                Kovalam Beach, Thiruvananthapuram, Kerala, India
              </span>
            </div>
          </div>
        </div>

        {/* Find Us Section - Right Side */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Follow Us</h3>
          <nav aria-label="Social media links" className="flex flex-wrap gap-2">
            <a
              href="https://www.Facebook.com/GoIntoAllTheWorld.in"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('facebook')}
              aria-label={getSocialPlatformConfig('facebook').ariaLabel}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/keralatoursglobalktg?igsh=cmdoOGtoMWpvMm9y"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('instagram')}
              aria-label={getSocialPlatformConfig('instagram').ariaLabel}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://x.com/joshiflabour?s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('twitter')}
              aria-label="Follow us on X (formerly Twitter)"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/keralatoursglobal_tourism-kerala-india-1/"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('linkedin')}
              aria-label={getSocialPlatformConfig('linkedin').ariaLabel}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://pin.it/12qgTCdKJ"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('pinterest')}
              aria-label={getSocialPlatformConfig('pinterest').ariaLabel}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.90-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <Separator className="bg-white/20 mb-2" />

    {/* Bottom Footer */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-xs text-white/80" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="font-medium">
        © KeralaTours Travels & Organic Remedies. All rights reserved.
      </div>
      <div className="flex gap-4">
        <Link to="/terms" className="hover:text-gray-300 transition-smooth">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-gray-300 transition-smooth">Privacy Policy</Link>
        <Link to="/cookies" className="hover:text-gray-300 transition-smooth">Cookie Policy</Link>
      </div>
    </div>
  </footer>;
};
export default Footer;
