import * as React from "react";
import { User, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

  // Get customer initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
      <CardContent className="p-6">
        {/* Customer Avatar and Info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-golden/20">
            <AvatarImage
              src={testimonial.avatar}
              alt={`${testimonial.customerName} avatar`}
              className="object-cover"
            />
            <AvatarFallback className="bg-golden/10 text-golden font-semibold">
              {getInitials(testimonial.customerName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {testimonial.customerName}
              </h3>
              {testimonial.verified && (
                <Shield className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
            </div>
            {testimonial.location && (
              <p className="text-sm text-muted-foreground truncate">
                {testimonial.location}
              </p>
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <StarRating
            rating={testimonial.rating}
            size="md"
            className="mb-2"
          />
        </div>

        {/* Review Text */}
        <blockquote className="text-muted-foreground leading-relaxed mb-4">
          "{testimonial.reviewText}"
        </blockquote>

        {/* Review Source and Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {testimonial.source === 'google' && (
              <>
                <GoogleIcon size={16} />
                <span className="font-medium">Google Review</span>
              </>
            )}
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