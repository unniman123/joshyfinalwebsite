import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Send } from "lucide-react";
const Footer = () => {
  const quickLinks = [{
    name: "Kerala Tours",
    href: "/tours/kerala"
  }, {
    name: "Discover India",
    href: "/tours/india"
  }, {
    name: "Ayurveda",
    href: "/tours/ayurveda"
  }, {
    name: "Heritage Tours",
    href: "/tours/heritage"
  }, {
    name: "Global Holidays",
    href: "/tours/global"
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
  }, {
    name: "Cancellation Policy",
    href: "/cancellation"
  }];
  return <footer className="bg-blue-500 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-white/80 hover:text-golden transition-smooth">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Support Links & Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/80 hover:text-golden transition-smooth">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media Icons */}
            <div className="pt-4">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="w-8 h-8 bg-white/10 hover:bg-golden/20 rounded-full flex items-center justify-center transition-smooth">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 bg-white/10 hover:bg-golden/20 rounded-full flex items-center justify-center transition-smooth">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 bg-white/10 hover:bg-golden/20 rounded-full flex items-center justify-center transition-smooth">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 bg-white/10 hover:bg-golden/20 rounded-full flex items-center justify-center transition-smooth">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            
            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-golden flex-shrink-0" />
                <span className="text-white/80">+91 9539 50 7516, +914712488880.</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-golden flex-shrink-0" />
                <span className="text-white/80">KeralaToursGlobal@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-golden flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  Kerala, India
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">Subscribe to Our Newsletter</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                <Button variant="secondary" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <div>
            © 2024 Kerala Tours Global. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-golden transition-smooth">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-golden transition-smooth">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-golden transition-smooth">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
