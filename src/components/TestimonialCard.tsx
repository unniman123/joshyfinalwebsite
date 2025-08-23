import * as React from "react";
import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { cn } from "@/lib/utils";
import { TestimonialCardProps } from "@/lib/types/testimonials";

const TestimonialCard = React.forwardRef<
  HTMLDivElement,
  TestimonialCardProps
>(({ testimonial, className, ...props }, ref) => {
  // Format the review date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "h-full transition-all duration-300 ease-smooth",
        "hover:shadow-warm hover:scale-[1.02]",
        "bg-card border border-border/50",
        "animate-fade-in",
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

        {/* Star Rating */}
        <div className="mb-3">
          <StarRating
            rating={testimonial.rating}
            size="md"
            className="mb-2"
          />
          <span className="sr-only">
            Rating: {testimonial.rating} out of 5 stars
          </span>
        </div>

        {/* Review Text */}
        <blockquote
          className="text-muted-foreground leading-relaxed mb-3"
          aria-label={`Customer review: ${testimonial.reviewText}`}
        >
          "{testimonial.reviewText}"
        </blockquote>

        {/* Review Source and Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">

          </div>
          <div>
            {formatDate(testimonial.reviewDate)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };