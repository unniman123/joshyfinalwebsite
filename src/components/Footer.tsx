import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Phone, Mail, MapPin, Send } from "lucide-react";
import { getSocialIconClass, getSocialPlatformConfig } from "@/lib/utils/socialUtils";
const Footer = () => {
  const quickLinks = [{
    name: "Kerala Tours",
    href: "/tours?category=kerala"
  }, {
    name: "Discover India",
    href: "/tours?category=discover-india"
  }, {
    name: "Ayurveda",
    href: "/tours"
  }, {
    name: "Heritage Tours",
    href: "/tours?category=heritage"
  }, {
    name: "Global Holidays",
    href: "/tours?category=global"
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
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {quickLinks.map(link => <li key={link.name}>
              <Link to={link.href} className="text-white/80 hover:text-golden transition-smooth">
                {link.name}
              </Link>
            </li>)}
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            {supportLinks.map(link => (
              <li key={link.name}>
                <Link to={link.href} className="text-white/80 hover:text-golden transition-smooth">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2">Get In Touch</h3>

          {/* Contact Details */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-golden flex-shrink-0" />
              <span className="text-xs text-white/80">+91 9539 50 7516, +914712488880.</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-golden flex-shrink-0" />
              <span className="text-xs text-white/80">KeralaToursGlobal@gmail.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-golden flex-shrink-0 mt-1" />
              <span className="text-xs text-white/80">
                Kerala, India
              </span>
            </div>
          </div>
        </div>

        {/* Follow Us Section - Right Side */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
          <nav aria-label="Social media links" className="flex flex-wrap gap-2">
            <a
              href="https://www.Facebook.com/GoIntoAllTheWorld.in"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('facebook')}
              aria-label={getSocialPlatformConfig('facebook').ariaLabel}
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/keralatoursglobalktg?igsh=cmdoOGtoMWpvMm9y"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('instagram')}
              aria-label={getSocialPlatformConfig('instagram').ariaLabel}
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/joshiflabour?s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('twitter')}
              aria-label={getSocialPlatformConfig('twitter').ariaLabel}
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/keralatoursglobal_tourism-kerala-india-1/"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('linkedin')}
              aria-label={getSocialPlatformConfig('linkedin').ariaLabel}
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://pin.it/12qgTCdKJ"
              target="_blank"
              rel="noopener noreferrer"
              className={getSocialIconClass('pinterest')}
              aria-label={getSocialPlatformConfig('pinterest').ariaLabel}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <Separator className="bg-white/20 mb-2" />

    {/* Bottom Footer */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-xs text-white/80">
      <div>
        © 2024 Kerala Tours Global. All rights reserved.
      </div>
      <div className="flex gap-4">
        <Link to="/terms" className="hover:text-golden transition-smooth">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-golden transition-smooth">Privacy Policy</Link>
        <Link to="/cookies" className="hover:text-golden transition-smooth">Cookie Policy</Link>
      </div>
    </div>
  </footer>;
};
export default Footer;
