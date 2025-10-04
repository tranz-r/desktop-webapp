import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Professional Corporate Header */}
      <Header />
      
      {/* About Hero Section */}
      <section className="py-20 bg-webflow-subtle-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 mb-6">
              About TRANZR Group Limited
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              We are building the infrastructure for tomorrow's connected world,
              creating seamless experiences that bridge the gap between people,
              places, and possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                  Pioneering Smart Mobility Solutions
                </h2>
                <div className="w-16 h-1 bg-blue-600 mb-8"></div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Established as a leading technology conglomerate, TRANZR Group Limited operates 
                  at the forefront of smart mobility solutions, delivering innovative transportation 
                  services that enhance urban connectivity and improve quality of life through 
                  sustainable technology.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our comprehensive platform integrates ride-sharing, courier services, removal, 
                  collection, and delivery solutions, creating a unified ecosystem that serves 
                  both individual consumers and enterprise clients with unmatched efficiency and reliability.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">∞</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Innovation</h3>
                    <p className="text-sm text-slate-600">Continuous innovation drives our mission to revolutionize transportation technology.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Sustainability</h3>
                    <p className="text-sm text-slate-600">Committed to eco-friendly solutions that reduce environmental impact.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Excellence</h3>
                    <p className="text-sm text-slate-600">Leading industry standards through quality, reliability, and performance.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">🌐</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Connectivity</h3>
                    <p className="text-sm text-slate-600">Building bridges between communities through smart transportation networks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                Our Mission & Vision
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To revolutionize transportation and logistics through innovative technology, 
                  creating seamless, sustainable, and accessible mobility solutions that connect 
                  people, businesses, and communities while reducing environmental impact and 
                  improving quality of life.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">🔮</span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To become the global leader in smart mobility solutions, transforming how 
                  people and goods move through intelligent transportation networks that are 
                  efficient, sustainable, and universally accessible, creating a more connected 
                  and prosperous world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                Our Core Values
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The principles that guide our decisions, shape our culture, and drive our commitment to excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Integrity</h3>
                <p className="text-slate-600 leading-relaxed">
                  We conduct business with the highest ethical standards, maintaining transparency 
                  and trust in all our relationships with customers, partners, and stakeholders.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  We embrace cutting-edge technology and creative thinking to develop solutions 
                  that anticipate future needs and exceed current expectations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Sustainability</h3>
                <p className="text-slate-600 leading-relaxed">
                  We are committed to environmental responsibility, developing solutions that 
                  reduce carbon footprint while creating long-term value for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Commitment */}
      <section className="py-24 bg-slate-800 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Leadership in Transportation Technology
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              As industry pioneers, we combine deep technical expertise with strategic vision 
              to deliver transportation solutions that not only meet today's challenges but 
              anticipate tomorrow's opportunities.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-slate-800 hover:bg-slate-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-xl">
                View Leadership Team
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
                Investor Relations
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Professional Corporate Footer */}
      <Footer />
    </div>
  );
}
