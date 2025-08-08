const AboutUsSection = () => {
  return (
    <section className="py-16 bg-gradient-warm" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Image Section - Left Aligned */}
          <div className="lg:w-1/2 w-full">
            <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-105">
              <img 
                src="/src/assets/about-us-image.jpg" 
                alt="About Us - Travel Experience" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Section - Right Aligned */}
          <div className="lg:w-1/2 w-full">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Us - Namaste
              </h2>
              
              <div className="w-24 h-1 bg-gradient-golden mb-6"></div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are passionate about creating unforgettable travel experiences that showcase the beauty, culture, and heritage of India. Our expert team designs personalized itineraries that cater to your unique preferences and interests.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                No need of capcha in any of these. entries that is required will be shared by me, do as per your idea must be attractive user friendly, themes mainly, dont use dark colours for the page parts, website loading time should be shorter. also a link that is popping up in the side when we scroll (as an image of WhatsApp if added would be better so once clicked will be able to message us over there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
