import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface SocialLinksProps {
  links: { name: string; url: string }[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  // TODO: Use actual icons and link URLs from links
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      default:
        return <div className="w-6 h-6 bg-muted rounded" />;
    }
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-semibold">Follow Us</h2>
      <div className="flex justify-center space-x-6">
        {/* TODO: Use actual icons and link URLs from links */}
        {links && links.length > 0 ? (
          links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
            >
              {getSocialIcon(link.name)}
            </a>
          ))
        ) : (
          // Placeholder social links
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Facebook className="w-6 h-6 text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Instagram className="w-6 h-6 text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Twitter className="w-6 h-6 text-primary" />
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Youtube className="w-6 h-6 text-primary" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;