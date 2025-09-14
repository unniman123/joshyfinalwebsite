import * as React from "react";
import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestimonialCardProps } from "@/lib/types/testimonials";

const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  TestimonialCardProps
>(({ testimonial, className, ...props }, ref) => {


  return (
    <Card
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-smooth card-hover-lift",
        "bg-card border-2 border-brand-green/30 hover:border-brand-green/50",
        "hover:shadow-brand-green/20 animate-fade-in-up",
        className
      )}
      {...props}
    >
      <CardContent className="p-4">
        {/* Customer Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">
              {testimonial.customerName}
            </h3>
            {testimonial.verified && (
              <Shield className="h-4 w-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          {testimonial.location && (
            <p className="text-sm text-muted-foreground">
              {testimonial.location}
            </p>
          )}
        </div>

        {/* Review Text */}
        <blockquote
          className="text-muted-foreground leading-relaxed"
          aria-label={`Customer review: ${testimonial.reviewText}`}
        >
          "{testimonial.reviewText}"
        </blockquote>
      </CardContent>
    </Card>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };