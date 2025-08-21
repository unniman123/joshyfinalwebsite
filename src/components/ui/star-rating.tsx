import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRatingProps } from "@/lib/types/testimonials";

const StarRating = React.forwardRef<
  HTMLDivElement,
  StarRatingProps
>(({ rating, maxStars = 5, size = 'md', className, ...props }, ref) => {
  // Ensure rating is within valid range
  const validRating = Math.max(0, Math.min(rating, maxStars));

  // Size variants for stars
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  // Generate array of star elements
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starNumber = index + 1;
    const isFilled = starNumber <= validRating;

    return (
      <Star
        key={index}
        className={cn(
          sizeClasses[size],
          "transition-colors duration-200",
          isFilled
            ? "fill-golden text-golden"
            : "fill-none text-muted-foreground"
        )}
        aria-hidden="true"
      />
    );
  });

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${validRating} out of ${maxStars} stars`}
      {...props}
    >
      {stars}
      <span className="sr-only">
        {validRating} out of {maxStars} stars
      </span>
    </div>
  );
});

StarRating.displayName = "StarRating";

export { StarRating };