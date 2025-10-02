import { TourSection } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminControllableSectionProps {
  section: TourSection;
  className?: string;
}

const AdminControllableSection = ({ section, className = "" }: AdminControllableSectionProps) => {
  // Don't render if section is not visible (admin controlled)
  if (!section.isVisible) {
    return null;
  }

  // Render different section types based on admin configuration
  const renderSectionContent = () => {
    switch (section.type) {
      case 'overview':
        return (
          <div className="prose prose-lg max-w-none">
            <div
              className="text-lg md:text-xl text-muted-foreground leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
          </div>
        );

      case 'inclusions':
        return (
          <div className="space-y-4">
            <div
              className="text-muted-foreground leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
          </div>
        );

      case 'gallery':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {section.settings?.images?.map((image: string, index: number) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-warm group cursor-pointer border-2 border-transparent hover:border-brand-green/50 transition-all duration-300 hover:shadow-brand">
                <img
                  src={image}
                  alt={`${section.title} ${index + 1}`}
                  className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-warm-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div
            className="text-muted-foreground leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: section.content || '' }}
          />
        );
    }
  };

  return (
    <section className={`py-6 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <Card className="border-border hover:border-brand-green/50 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderSectionContent()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminControllableSection;