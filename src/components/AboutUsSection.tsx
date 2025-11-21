import namasteImage from '@/assets/Namaste Image.jpg';

const AboutUsSection = () => {
  return (
    <section className="py-6 sm:py-8 md:py-10" id="about">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col lg:flex-row items-stretch max-w-5xl mx-auto shadow-card rounded-xl lg:rounded-2xl overflow-hidden">

          {/* Left: Image Card */}
          <div className="w-full lg:w-1/4 flex items-start lg:items-center justify-center p-4 sm:p-6 lg:p-8 bg-white lg:bg-transparent">
            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-white rounded-lg lg:rounded-xl overflow-hidden shadow-card">
              <img
                src={namasteImage}
                alt="Namaste greeting"
                className="w-full h-full object-contain"
                style={{ objectPosition: 'center' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content (75%) */}
          <div className="w-full lg:w-3/4 p-4 sm:p-6 lg:pl-8 flex flex-col justify-center text-gray-900 bg-gray-100 rounded-b-xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-bl-none" role="region" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-green-600">
              Namaste !
            </h2>

            <div className="w-16 sm:w-20 h-1 bg-gradient-brand mb-3 sm:mb-4"></div>

            <p className="text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed max-w-3xl text-justify">
              We are engaged in tourism industry for the last 3 decades. First half was in Kerala promoting Indian subcontinent to the Incoming tourists & Second half of the period was in Dubai promoting global tourism to the expatriates and locals. Back to India again as holiday makers with the sound geographical knowledge & experiences of exceptional services.
            </p>
            <p className="text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed max-w-3xl text-justify">
              We are also experienced in arranging Group Tours for Employees of Institutions, Corporate Executives, Government Officials, Families, Pilgrims, Special Interest Groups, School Children & others. The Programmes include Excursions, Get-togethers (Weekend & Vacations) and Sponsored Holidays, Meetings, Institutional Holidays, Conferences, Study Tours, Water Cruises, Pilgrim Centre Visits & more. Therefore we can confidently claim to offer the best services available in the industry to your complete satisfaction.
            </p>
            <p className="text-sm sm:text-base leading-relaxed max-w-3xl text-justify">
              Now please click on your area of interest and reach us to enjoy your precious vacations, which can be either local or international. Whether your travel intention is Relaxation, Discovery, Exploration, Spiritual, Tourism, Vacationing, Research for gathering information, Building interpersonal relationships, Business, Healthcare, School Excursion we are at your finger tips.
            </p>
            {/* Contact button removed as requested */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;