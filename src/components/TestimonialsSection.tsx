import * as React from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { testimonials } from "@/lib/types/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-golden mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Discover why travelers from around the world choose Kerala Tours Global for their unforgettable Indian adventures.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <GoogleIcon size={18} />
            <span>Verified reviews from Google</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;