import { useEffect } from 'react';

interface ImaginationPageProps {
  onBack: () => void;
}

interface PortfolioItem {
  title: string;
  desc: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  items: PortfolioItem[];
  gradient: string;
  accentColor: string;
}

const categories: Category[] = [
  {
    title: 'Videography',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { title: 'Brand Film', desc: 'Cinematic brand storytelling that connects with audiences on an emotional level' },
      { title: 'Documentary', desc: 'Authentic narrative production capturing real stories with cinematic quality' },
      { title: 'Commercial', desc: 'High-impact advertisements designed to drive engagement and conversions' },
      { title: 'Music Video', desc: 'Creative visual compositions that bring musical artistry to life' },
      { title: 'Event Coverage', desc: 'Professional multi-camera event capture and post-production' },
      { title: 'Social Reels', desc: 'Engaging short-form content optimized for social media platforms' },
    ],
    gradient: 'from-indigo-600 via-purple-600 to-violet-700',
    accentColor: '#6366f1',
  },
  {
    title: 'Photography',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { title: 'Portrait Session', desc: 'Expressive portrait artistry that reveals personality and emotion' },
      { title: 'Product Shoot', desc: 'Clean, detailed product photography for e-commerce and marketing' },
      { title: 'Landscape', desc: 'Breathtaking scenic captures showcasing natural beauty and scale' },
      { title: 'Fashion', desc: 'High fashion editorial photography with creative direction' },
      { title: 'Architecture', desc: 'Architectural visualization highlighting design and structure' },
      { title: 'Event Photography', desc: 'Capturing memorable moments from events and celebrations' },
    ],
    gradient: 'from-blue-600 via-cyan-600 to-teal-500',
    accentColor: '#0891b2',
  },
  {
    title: 'Design',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { title: 'Brand Identity', desc: 'Complete visual identity systems including logos, typography, and guidelines' },
      { title: 'UI/UX Design', desc: 'Intuitive digital experiences with user-centered design principles' },
      { title: 'Poster Design', desc: 'Impactful visual posters for events, campaigns, and promotions' },
      { title: 'Packaging', desc: 'Creative product packaging that stands out on the shelf' },
      { title: 'Social Media Kit', desc: 'Branded social media templates and visual content systems' },
      { title: 'Illustration', desc: 'Custom digital illustrations for brands, publications, and campaigns' },
    ],
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    accentColor: '#9333ea',
  },
  {
    title: 'Brochure',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { title: 'Corporate Brochure', desc: 'Professional corporate materials that communicate vision and values' },
      { title: 'Product Catalog', desc: 'Comprehensive product showcases with detailed visual presentation' },
      { title: 'Annual Report', desc: 'Elegant annual summaries that highlight achievements and growth' },
      { title: 'Event Program', desc: 'Event guide design with clear information hierarchy and visual appeal' },
      { title: 'Company Profile', desc: 'Compelling company stories told through thoughtful design' },
      { title: 'Marketing Flyer', desc: 'Eye-catching promotional materials designed to convert' },
    ],
    gradient: 'from-teal-600 via-emerald-600 to-green-600',
    accentColor: '#059669',
  },
];

export default function ImaginationPage({ onBack }: ImaginationPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.background = '#f8fafc';
    return () => {
      document.body.style.background = '#050505';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>

          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            AS <span className="text-blue-600">IMAGINATION</span>
          </h1>

          <div className="w-16 sm:w-20" />
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center py-16 sm:py-20 md:py-24 px-4 sm:px-6">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Our Portfolio
          </h2>
          <p className="text-blue-200/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore our diverse collection of creative works spanning videography,
            photography, design, and print media.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTIONS ===== */}
      {categories.map((category) => (
        <section
          key={category.title}
          id={category.title.toLowerCase()}
          className="py-14 sm:py-16 md:py-20 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
              <div
                className={`w-1 sm:w-1.5 h-8 sm:h-10 rounded-full bg-gradient-to-b ${category.gradient}`}
              />
              <div>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span className="text-gray-600">{category.icon}</span>
                  {category.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 ml-9" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {category.items.length} projects
                </p>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {category.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100"
                >
                  {/* Card gradient header */}
                  <div
                    className={`h-36 sm:h-40 md:h-44 bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Abstract pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white/30" />
                      <div className="absolute bottom-2 left-6 w-16 h-16 rounded-full border border-white/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/15" />
                    </div>

                    {/* Large letter */}
                    <span
                      className="text-white/20 text-6xl sm:text-7xl md:text-8xl font-black select-none relative z-10 transition-transform duration-500 group-hover:scale-110"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {item.title.charAt(0)}
                    </span>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Card content */}
                  <div className="p-4 sm:p-5">
                    <h4
                      className="font-bold text-gray-900 text-base sm:text-lg mb-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-gray-500 text-xs sm:text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.desc}
                    </p>

                    {/* View project link */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-1 text-blue-600 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>View Project</span>
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Let's Create Together
          </h3>
          <p
            className="text-blue-200/70 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to transform your vision into reality? Let's collaborate on your next creative project.
          </p>
          <button
            onClick={onBack}
            className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-gray-400 text-sm sm:text-base font-semibold tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              AS CREATION SPACE
            </p>
            <div className="flex items-center gap-6">
              {['Instagram', 'Behance', 'Vimeo'].map((social) => (
                <span
                  key={social}
                  className="text-gray-500 hover:text-blue-400 text-xs sm:text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {social}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-xs">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
