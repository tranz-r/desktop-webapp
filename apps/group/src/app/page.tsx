import Header from "../components/Header";
import Footer from "../components/Footer";
import TranzrGroupLogo from "../../components/logo/TranzrGroupLogo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Professional Corporate Header */}
      <Header />
      
      {/* Hero Section */}
             <section className="relative overflow-hidden bg-webflow-animated-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center text-white space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-corporate-slide-up">
              Shaping the future of movement and services.
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-corporate-slide-up">
              TRANZR GROUP LIMITED is pioneering the next generation of transportation
              and service solutions, connecting communities through innovative technology.
            </p>

            {/* CTA */}
            <div className="pt-6 animate-corporate-slide-up">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
                Explore Our Products
              </button>
            </div>
          </div>
        </div>
      </section>

             {/* Company Introduction */}
             <section className="py-16 bg-webflow-subtle-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About TRANZR Group Limited
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are building the infrastructure for tomorrow's connected world,
              creating seamless experiences that bridge the gap between people,
              places, and possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Products & Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Innovative solutions transforming how people move and connect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tranzr Moves */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6">
                <TranzrGroupLogo className="h-8 w-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tranzr Moves</h3>
              <p className="text-muted-foreground mb-6">
                Consumer-facing transportation platform connecting riders with drivers through
                smart matching and transparent pricing.
              </p>
              <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                Visit Tranzr Moves →
              </button>
            </div>

            {/* Placeholder Products */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow opacity-60">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-muted-foreground/50 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tranzr CRM</h3>
              <p className="text-muted-foreground mb-6">
                Advanced customer relationship management platform designed for transportation companies.
              </p>
              <span className="text-muted-foreground font-medium">Coming Soon</span>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow opacity-60">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-muted-foreground/50 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Tranzr Recovery</h3>
              <p className="text-muted-foreground mb-6">
                Intelligent vehicle recovery and asset management system for fleet operators.
              </p>
              <span className="text-muted-foreground font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              News & Insights
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest developments and industry insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* News Cards Placeholder */}
            {[1, 2, 3].map((item) => (
              <article key={item} className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-corporate-navy-100"></div>
                <div className="p-6">
                  <div className="w-20 bg-accent h-4 rounded mb-3"></div>
                  <div className="w-full bg-primary h-6 rounded mb-2"></div>
                  <div className="w-3/4 bg-muted-foreground h-4 rounded mb-4"></div>
                  <div className="w-full bg-muted-foreground h-3 rounded mb-1"></div>
                  <div className="w-2/3 bg-muted-foreground h-3 rounded"></div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              View All News →
            </button>
          </div>
        </div>
      </section>

      {/* Careers Teaser */}
      <section className="py-20 bg-accent-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're looking for passionate individuals who want to shape the future of transportation
            and build solutions that make the world more connected.
          </p>
          <button className="bg-background text-primary hover:bg-background/90 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
            View Open Roles
          </button>
        </div>
      </section>

      {/* Professional Corporate Footer */}
      <Footer />
    </div>
  );
}