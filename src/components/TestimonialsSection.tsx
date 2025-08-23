import * as React from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { testimonials } from "@/lib/types/testimonials";

const TestimonialsSection = () => {
  // Keyboard navigation handler
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent, api: any) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        api?.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        api?.scrollNext();
      }
    },
    []
  );

  return (
    <section className="py-16 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-golden to-golden-dark mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Discover why travelers from around the world choose Kerala Tours Global for their unforgettable Indian adventures.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">

            <span></span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="max-w-7xl mx-auto"
          role="region"
          aria-label="Customer testimonials carousel"
          aria-describedby="carousel-instructions"
        >
          <div className="sr-only" id="carousel-instructions">
            Use arrow keys to navigate through customer testimonials, or click the navigation buttons.
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: false,
              duration: 30, // 0.3s transition duration
              containScroll: "trimSnaps",
            }}
            className="relative"
            onKeyDown={(event) => handleKeyDown(event, undefined)}
          >
            <CarouselContent
              className="-ml-2 md:-ml-4"
              aria-live="polite"
              aria-label="Customer testimonials"
            >
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length} from ${testimonial.customerName}`}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    className="h-full animate-fade-in"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="hidden sm:flex -left-6 md:-left-8 lg:-left-12 h-10 w-10 hover:bg-golden/10 hover:border-golden/30 hover:shadow-golden/20 transition-all duration-300 ease-smooth"
              aria-label="View previous testimonials"
            />
            <CarouselNext
              className="hidden sm:flex -right-6 md:-right-8 lg:-right-12 h-10 w-10 hover:bg-golden/10 hover:border-golden/30 hover:shadow-golden/20 transition-all duration-300 ease-smooth"
              aria-label="View next testimonials"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;