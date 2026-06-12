import { useEffect, useRef, useState } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export default function ButterflyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailId = useRef(0);
  const rippleId = useRef(0);
  const sparkleId = useRef(0);
  const lastTrailTime = useRef(0);

  // Check for hover-capable device
  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (hasHover) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`;
      }

      const now = Date.now();
      if (now - lastTrailTime.current > 55) {
        lastTrailTime.current = now;
        const id = trailId.current++;
        setTrails(prev => [...prev.slice(-18), { id, x: e.clientX, y: e.clientY }]);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rid = rippleId.current++;
      setRipples(prev => [...prev, { id: rid, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rid)), 700);

      // Sparkle burst
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 8; i++) {
        const sid = sparkleId.current++;
        newSparkles.push({
          id: sid,
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / 8,
          distance: 20 + Math.random() * 30,
        });
      }
      setSparkles(prev => [...prev, ...newSparkles]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 800);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], .interactive')) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], .interactive')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [isVisible]);

  // Prune old trails
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-14));
    }, 150);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const butterflySize = isHovering ? 96 : 80;

  return (
    <>
      <style>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Butterfly SVG */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          top: 0,
          left: 0,
          willChange: 'transform',
          filter: isHovering
            ? 'drop-shadow(0 0 18px #4169E1) drop-shadow(0 0 35px rgba(65,105,225,0.6)) brightness(1.2)'
            : 'drop-shadow(0 0 10px #4169E1) drop-shadow(0 0 20px rgba(65,105,225,0.4))',
          transition: 'filter 0.25s ease',
        }}
      >
        <svg
          width={butterflySize}
          height={butterflySize}
          viewBox="0 0 100 100"
          style={{ transition: 'width 0.3s ease, height 0.3s ease' }}
        >
          <defs>
            <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8CB4FF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#4169E1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1a3a8f" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C9FFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2a4ab0" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="wglow" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#A0C4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4169E1" stopOpacity="0.1" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LEFT upper wing */}
          <g className="butterfly-left-wing">
            <path
              d="M48 47 C38 28, 10 10, 8 32 C7 42, 30 50, 48 47"
              fill="url(#wg1)"
              stroke="#5B8DEF"
              strokeWidth="1"
              opacity="0.9"
            />
            <path
              d="M48 47 C38 28, 10 10, 8 32 C7 42, 30 50, 48 47"
              fill="url(#wglow)"
              opacity="0.5"
            />
            {/* Veins */}
            <path d="M43 40 C32 30, 20 22, 14 28" fill="none" stroke="rgba(160,196,255,0.5)" strokeWidth="0.7" />
            <path d="M42 44 C30 38, 16 34, 11 36" fill="none" stroke="rgba(160,196,255,0.35)" strokeWidth="0.5" />
            <path d="M44 36 C36 26, 26 18, 20 20" fill="none" stroke="rgba(160,196,255,0.3)" strokeWidth="0.5" />
            {/* Spots */}
            <circle cx="26" cy="28" r="3.5" fill="rgba(65,105,225,0.3)" stroke="rgba(108,159,255,0.5)" strokeWidth="0.6" />
            <circle cx="20" cy="36" r="2.2" fill="rgba(65,105,225,0.25)" stroke="rgba(108,159,255,0.35)" strokeWidth="0.4" />
            <circle cx="32" cy="34" r="1.5" fill="rgba(100,160,255,0.2)" />
            {/* Edge glow */}
            <path d="M48 47 C38 28, 10 10, 8 32 C7 42, 30 50, 48 47"
              fill="none" stroke="rgba(140,180,255,0.4)" strokeWidth="2" filter="url(#glow)" />
          </g>

          {/* LEFT lower wing */}
          <g className="butterfly-left-wing">
            <path
              d="M48 53 C34 70, 8 90, 16 72 C20 62, 36 55, 48 53"
              fill="url(#wg2)"
              stroke="#5B8DEF"
              strokeWidth="1"
              opacity="0.8"
            />
            <path d="M42 58 C30 68, 14 80, 18 70" fill="none" stroke="rgba(160,196,255,0.3)" strokeWidth="0.5" />
            <circle cx="28" cy="66" r="2.8" fill="rgba(65,105,225,0.2)" stroke="rgba(108,159,255,0.3)" strokeWidth="0.4" />
            <path d="M48 53 C34 70, 8 90, 16 72 C20 62, 36 55, 48 53"
              fill="none" stroke="rgba(140,180,255,0.3)" strokeWidth="1.5" filter="url(#glow)" />
          </g>

          {/* RIGHT upper wing */}
          <g className="butterfly-right-wing">
            <path
              d="M52 47 C62 28, 90 10, 92 32 C93 42, 70 50, 52 47"
              fill="url(#wg1)"
              stroke="#5B8DEF"
              strokeWidth="1"
              opacity="0.9"
            />
            <path
              d="M52 47 C62 28, 90 10, 92 32 C93 42, 70 50, 52 47"
              fill="url(#wglow)"
              opacity="0.5"
            />
            <path d="M57 40 C68 30, 80 22, 86 28" fill="none" stroke="rgba(160,196,255,0.5)" strokeWidth="0.7" />
            <path d="M58 44 C70 38, 84 34, 89 36" fill="none" stroke="rgba(160,196,255,0.35)" strokeWidth="0.5" />
            <path d="M56 36 C64 26, 74 18, 80 20" fill="none" stroke="rgba(160,196,255,0.3)" strokeWidth="0.5" />
            <circle cx="74" cy="28" r="3.5" fill="rgba(65,105,225,0.3)" stroke="rgba(108,159,255,0.5)" strokeWidth="0.6" />
            <circle cx="80" cy="36" r="2.2" fill="rgba(65,105,225,0.25)" stroke="rgba(108,159,255,0.35)" strokeWidth="0.4" />
            <circle cx="68" cy="34" r="1.5" fill="rgba(100,160,255,0.2)" />
            <path d="M52 47 C62 28, 90 10, 92 32 C93 42, 70 50, 52 47"
              fill="none" stroke="rgba(140,180,255,0.4)" strokeWidth="2" filter="url(#glow)" />
          </g>

          {/* RIGHT lower wing */}
          <g className="butterfly-right-wing">
            <path
              d="M52 53 C66 70, 92 90, 84 72 C80 62, 64 55, 52 53"
              fill="url(#wg2)"
              stroke="#5B8DEF"
              strokeWidth="1"
              opacity="0.8"
            />
            <path d="M58 58 C70 68, 86 80, 82 70" fill="none" stroke="rgba(160,196,255,0.3)" strokeWidth="0.5" />
            <circle cx="72" cy="66" r="2.8" fill="rgba(65,105,225,0.2)" stroke="rgba(108,159,255,0.3)" strokeWidth="0.4" />
            <path d="M52 53 C66 70, 92 90, 84 72 C80 62, 64 55, 52 53"
              fill="none" stroke="rgba(140,180,255,0.3)" strokeWidth="1.5" filter="url(#glow)" />
          </g>

          {/* Body */}
          <ellipse cx="50" cy="50" rx="2.8" ry="13" fill="#4169E1" opacity="0.95" />
          <ellipse cx="50" cy="50" rx="1.5" ry="11" fill="#8CB4FF" opacity="0.5" />

          {/* Head */}
          <circle cx="50" cy="37" r="3" fill="#4169E1" opacity="0.95" />
          <circle cx="50" cy="37" r="1.8" fill="#8CB4FF" opacity="0.4" />

          {/* Antennae */}
          <path d="M49 35 C45 28, 41 22, 38 18" fill="none" stroke="#4169E1" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="38" cy="18" r="2.2" fill="#6C9FFF" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="38" cy="18" r="1" fill="#A0C4FF" opacity="0.6" />

          <path d="M51 35 C55 28, 59 22, 62 18" fill="none" stroke="#4169E1" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="62" cy="18" r="2.2" fill="#6C9FFF" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="62" cy="18" r="1" fill="#A0C4FF" opacity="0.6" />
        </svg>
      </div>

      {/* Trail particles */}
      {trails.map((trail, i) => {
        const progress = (i + 1) / trails.length;
        const size = 2 + progress * 5;
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none rounded-full trail-particle"
            style={{
              left: trail.x - size / 2,
              top: trail.y - size / 2,
              width: size,
              height: size,
              zIndex: 9998,
              background: `radial-gradient(circle, rgba(160,196,255,${progress}), rgba(65,105,225,${progress * 0.5}))`,
              boxShadow: `0 0 ${3 + progress * 5}px rgba(65,105,225,${progress * 0.5})`,
              opacity: progress * 0.8,
            }}
          />
        );
      })}

      {/* Click ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 60,
            height: 60,
            zIndex: 9997,
            border: '2px solid rgba(65, 105, 225, 0.7)',
            background: 'radial-gradient(circle, rgba(65, 105, 225, 0.2), transparent)',
            boxShadow: '0 0 25px rgba(65, 105, 225, 0.25), 0 0 50px rgba(65, 105, 225, 0.1)',
          }}
        />
      ))}

      {/* Click sparkle burst */}
      {sparkles.map(sparkle => {
        const tx = sparkle.x + Math.cos(sparkle.angle) * sparkle.distance;
        const ty = sparkle.y + Math.sin(sparkle.angle) * sparkle.distance;
        return (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: tx,
              top: ty,
              zIndex: 9998,
              background: 'radial-gradient(circle, #A0C4FF, #4169E1)',
              boxShadow: '0 0 6px #6C9FFF, 0 0 12px rgba(65,105,225,0.4)',
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
            }}
          />
        );
      })}
    </>
  );
}
