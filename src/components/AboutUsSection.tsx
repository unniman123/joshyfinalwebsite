

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-background" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Image Section - Left Aligned - Reduced to 15% */}
          <div className="lg:w-[15%] w-full">
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

          {/* Content Section - Right Aligned - Expanded to 85% */}
          <div className="lg:w-[85%] w-full">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 text-left" style={{ fontFamily: "'Book Antiqua', 'Palatino Linotype', Palatino, serif" }}>
                Namaste!
              </h2>

              <div className="w-24 h-1 bg-gradient-golden mb-6"></div>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are engaged in tourism industry for the last 3 decades. First half was in Kerala promoting Indian subcontinent to the Incoming tourists & Second half of the period was in Dubai promoting global tourism to the expatriates and locals. Back to India again as holiday makers with the sound geographical knowledge & experiences of exceptional services.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are also experienced in arranging Group Tours for Employees of Institutions, Corporate Executives, Government Officials, Families, Pilgrims, Special Interest Groups, School Children & others. The Programmes include Excursions, Get-togethers (Weekend & Vacations) and Sponsored Holidays, Meetings, Institutional Holidays, Conferences, Study Tours, Water Cruises, Pilgrim Centre Visits & more. Therefore we can confidently claim to offer the best services available in the industry to your complete satisfaction.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Now please click on your area of interest and reach us to enjoy your precious vacations, which can be either local or international. Whether your travel intention is Relaxation, Discovery, Exploration, Spiritual, Tourism, Vacationing, Research for gathering information, Building interpersonal relationships, Business, Healthcare, School Excursion we are at your finger tips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
