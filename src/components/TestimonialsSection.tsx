import * as React from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/types/testimonials";
import type { CarouselApi } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-rotation effect - same pattern as HeroBanner
  React.useEffect(() => {
    if (!api) return;

    const timer = setInterval(() => {
      if (isPaused) return; // respect pause on hover/focus
      const nextIndex = (current + 1) % testimonials.length;
      api.scrollTo(nextIndex);
      setCurrent(nextIndex);
    }, 5000); // 5 second intervals like HeroBanner

    return () => clearInterval(timer);
  }, [api, current, testimonials.length, isPaused]);

  // Update current index when carousel changes
  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
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
    <section className="py-12 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>
            What our customers say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-golden to-golden-dark mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">

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
            setApi={setApi}
            opts={{
              align: "start",
              loop: true, // Enable loop for seamless auto-rotation
              duration: 30, // 0.3s transition duration
              containScroll: "trimSnaps",
            }}
            className="relative"
            onKeyDown={(event) => handleKeyDown(event, api)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <CarouselContent
              className="-ml-2 md:-ml-4"
              aria-live="polite"
              aria-label="Customer testimonials"
            >
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length} from ${testimonial.customerName}`}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    className="animate-fade-in-up"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Indicators (dots) */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={current === idx}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${current === idx ? 'bg-brand-green' : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'}`}
                  onClick={() => {
                    api?.scrollTo(idx);
                    setCurrent(idx);
                  }}
                />
              ))}
            </div>
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