import aboutImage from '@/assets/about-us-image.jpg';

const AboutUsSection = () => {
  return (
    <section className="py-8" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch max-w-5xl mx-auto shadow-card rounded-2xl overflow-hidden">

          {/* Left: Image (20%) */}
          <div className="w-full lg:w-1/5 h-40 lg:h-auto">
            <img
              src={aboutImage}
              alt="Family enjoying attractions"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right: Content (80%) */}
          <div className="w-full lg:w-4/5 p-6 lg:pl-8 flex flex-col justify-center text-white bg-promo-magenta rounded-tr-2xl rounded-br-2xl" role="region" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4">
              NAMASTE !
            </h2>

            <div className="w-20 h-1 bg-gradient-brand mb-4"></div>

            <p className="text-base mb-4 leading-relaxed max-w-3xl text-justify">
              We are engaged in tourism industry for the last 3 decades. First half was in Kerala promoting Indian subcontinent to the Incoming tourists & Second half of the period was in Dubai promoting global tourism to the expatriates and locals. Back to India again as holiday makers with the sound geographical knowledge & experiences of exceptional services.
            </p>
            <p className="text-base mb-4 leading-relaxed max-w-3xl text-justify">
              We are also experienced in arranging Group Tours for Employees of Institutions, Corporate Executives, Government Officials, Families, Pilgrims, Special Interest Groups, School Children & others. The Programmes include Excursions, Get-togethers (Weekend & Vacations) and Sponsored Holidays, Meetings, Institutional Holidays, Conferences, Study Tours, Water Cruises, Pilgrim Centre Visits & more. Therefore we can confidently claim to offer the best services available in the industry to your complete satisfaction.
            </p>
            <p className="text-base leading-relaxed max-w-3xl text-justify">
              Now please click on your area of interest and reach us to enjoy your precious vacations, which can be either local or international. Whether your travel intention is Relaxation, Discovery, Exploration, Spiritual, Tourism, Vacationing, Research for gathering information, Building interpersonal relationships, Business, Healthcare, School Excursion we are at your finger tips.
            </p>
            <a href="/contact" className="inline-block w-max border border-white/60 rounded-md px-5 py-2 hover:bg-white/10 transition focus:outline-none focus:ring-4 focus:ring-white/20 mt-6 text-sm" aria-label="Contact Us">
              Contact us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;