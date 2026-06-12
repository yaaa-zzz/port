import { useEffect, useRef, useState } from 'react';
import ButterflyCursor from '../components/ButterflyCursor';
import AnimatedBackground from '../components/AnimatedBackground';

interface LandingPageProps {
  onGetStarted: () => void;
}

const skills = [
  {
    name: 'Creative Direction',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Strategic visual storytelling',
  },
  {
    name: 'Photography',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Capturing extraordinary moments',
  },
  {
    name: 'Videography',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Cinematic visual narratives',
  },
  {
    name: 'Graphic Design',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Compelling visual identities',
  },
  {
    name: 'Branding',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Building iconic brands',
  },
];

const titleText = 'AS CREATION SPACE';

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sequential reveals
  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 2800);
    const t2 = setTimeout(() => setShowScroll(true), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page relative min-h-screen" style={{ background: '#050505' }}>
      <AnimatedBackground />
      <ButterflyCursor />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
        {/* Title with letter animation */}
        <div className="relative overflow-hidden mb-2">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider text-white text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {titleText.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  animationDelay: `${0.4 + i * 0.1}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Light sweep overlay */}
          <div className="absolute inset-0 pointer-events-none light-sweep" />
        </div>

        {/* Subtitle */}
        <p
          className="mt-8 text-base sm:text-lg md:text-xl text-blue-300/90 tracking-[0.25em] sm:tracking-[0.35em] uppercase text-center max-w-xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            opacity: showSubtitle ? 1 : 0,
            transform: showSubtitle ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            letterSpacing: '0.35em',
          }}
        >
          Where Imagination Becomes Reality
        </p>

        {/* Decorative line */}
        <div
          className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          style={{
            width: showSubtitle ? '200px' : '0px',
            transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        />

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-3"
          style={{
            opacity: showScroll ? 0.7 : 0,
            transition: 'opacity 1.5s ease-out',
            animation: showScroll ? 'float 2.5s ease-in-out infinite' : 'none',
          }}
        >
          <span
            className="text-blue-400/70 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Scroll
          </span>
          <svg className="w-5 h-5 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ==================== BIOGRAPHY SECTION ==================== */}
      <section ref={sectionRef} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section divider */}
          <div className="scroll-reveal flex items-center gap-4 mb-16 sm:mb-20">
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
            <span className="text-blue-400/60 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              About
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-blue-500/30 to-transparent" />
          </div>

          {/* Portrait + Bio Row */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20">
            {/* Portrait with animated glow frame */}
            <div className="scroll-reveal flex-shrink-0">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
                {/* Rotating conic gradient border */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #4169E1, #6C9FFF, #1a3a8f, transparent, #4169E1)',
                    animation: 'border-spin 4s linear infinite',
                  }}
                />
                {/* Inner glow ring */}
                <div
                  className="absolute inset-[3px] rounded-full"
                  style={{
                    background: 'conic-gradient(from 180deg, rgba(65,105,225,0.1), transparent, rgba(65,105,225,0.05), transparent)',
                    animation: 'border-spin 6s linear infinite reverse',
                  }}
                />
                {/* Portrait content */}
                <div
                  className="absolute inset-[5px] rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, #0e0e40, #050520 70%)',
                  }}
                >
                  {/* Initials */}
                  <div className="text-center">
                    <span
                      className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      AS
                    </span>
                    <div className="mt-2 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  </div>
                  {/* Subtle ring */}
                  <div className="absolute inset-4 rounded-full border border-blue-500/10" />
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="scroll-reveal flex-1 text-center md:text-left" style={{ transitionDelay: '0.15s' }}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Alex Santos
              </h2>
              <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                <div className="h-px w-8 bg-blue-500/50" />
                <p className="text-blue-400 text-sm sm:text-base tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Creative Director & Visual Artist
                </p>
              </div>
              <p className="text-gray-300/90 leading-relaxed mb-5 text-sm sm:text-base md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                With over a decade of experience in visual storytelling, Alex Santos has
                established <span className="text-blue-300 font-medium">AS CREATION SPACE</span> as a premier creative studio
                specializing in transformative visual experiences. From breathtaking cinematography to
                innovative brand identities, every project is crafted with meticulous
                attention to detail and an unwavering commitment to excellence.
              </p>
              <p className="text-gray-400/80 leading-relaxed text-sm sm:text-base md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our creative philosophy centers on the belief that every brand has a unique
                story waiting to be told. Through the seamless fusion of artistry and
                technology, we bring these narratives to life in ways that captivate,
                inspire, and endure.
              </p>

              {/* Stats */}
              <div className="flex gap-8 sm:gap-12 mt-8 justify-center md:justify-start">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '200+', label: 'Projects Delivered' },
                  { value: '50+', label: 'Brand Partners' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div
                      className="text-2xl sm:text-3xl font-bold text-blue-400"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-20">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className={`scroll-reveal skill-card group p-5 sm:p-6 rounded-2xl text-center border transition-all duration-500 hover:-translate-y-2`}
                style={{
                  transitionDelay: `${0.05 + i * 0.08}s`,
                  background: 'rgba(10, 10, 46, 0.4)',
                  borderColor: 'rgba(65, 105, 225, 0.12)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(65, 105, 225, 0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(65, 105, 225, 0.12), inset 0 0 30px rgba(65, 105, 225, 0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(65, 105, 225, 0.12)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="text-blue-400 mb-3 flex justify-center group-hover:text-blue-300 transition-colors duration-300">
                  {skill.icon}
                </div>
                <h3
                  className="text-white text-xs sm:text-sm font-semibold mb-1.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {skill.name}
                </h3>
                <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>

          {/* GET STARTED Button */}
          <div className="scroll-reveal flex flex-col items-center" style={{ transitionDelay: '0.2s' }}>
            <button
              onClick={onGetStarted}
              className="interactive btn-glow relative px-10 sm:px-14 py-4 sm:py-5 rounded-full border-2 border-blue-500/80 text-white text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase overflow-hidden group transition-all duration-400 hover:scale-105 hover:border-blue-400"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: 'linear-gradient(135deg, rgba(65, 105, 225, 0.15), rgba(65, 105, 225, 0.03))',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                GET STARTED
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(65, 105, 225, 0.25), rgba(65, 105, 225, 0.08))',
                }}
              />
            </button>

            <p className="text-gray-600 text-xs mt-4 tracking-wider">
              Explore our creative portfolio
            </p>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="relative z-10 h-16" />

      {/* Footer accent */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </div>
  );
}
