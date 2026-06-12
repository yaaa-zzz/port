import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Wave {
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  yOffset: number;
  opacity: number;
  lineWidth: number;
}

interface GeoShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  sides: number;
  opacity: number;
  vx: number;
  vy: number;
}

interface Orb {
  baseX: number;
  baseY: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  radius: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctxEl = canvasEl.getContext('2d');
    if (!ctxEl) return;

    // Assign to non-null typed locals for use inside closures
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctxEl;

    let animationId: number;
    let time = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = window.devicePixelRatio > 1 ? 1.5 : 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Particles ---
    const particleCount = 70;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.05,
      hue: 215 + Math.random() * 35,
      pulseSpeed: 0.01 + Math.random() * 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // --- Energy Waves ---
    const waves: Wave[] = Array.from({ length: 6 }, (_, i) => ({
      amplitude: 30 + Math.random() * 90,
      frequency: 0.0015 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.014,
      yOffset: 0.1 + i * 0.14,
      opacity: 0.03 + Math.random() * 0.06,
      lineWidth: 0.8 + Math.random() * 1.5,
    }));

    // --- Geometric Shapes ---
    const shapes: GeoShape[] = Array.from({ length: 7 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 25 + Math.random() * 55,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.004,
      sides: 4 + Math.floor(Math.random() * 3),
      opacity: 0.015 + Math.random() * 0.035,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
    }));

    // --- Glow Orbs ---
    const orbs: Orb[] = Array.from({ length: 4 }, (_, i) => ({
      baseX: w * (0.2 + i * 0.2),
      baseY: h * (0.25 + i * 0.15),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: 0.0015 + Math.random() * 0.003,
      speedY: 0.001 + Math.random() * 0.002,
      radius: 120 + Math.random() * 130,
      opacity: 0.035 + Math.random() * 0.04,
    }));

    function drawPolygon(
      cx: CanvasRenderingContext2D,
      px: number, py: number,
      sz: number, sides: number,
      rot: number
    ) {
      cx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i * 2 * Math.PI) / sides + rot;
        const lx = px + sz * Math.cos(angle);
        const ly = py + sz * Math.sin(angle);
        if (i === 0) cx.moveTo(lx, ly);
        else cx.lineTo(lx, ly);
      }
      cx.closePath();
    }

    function animate() {
      time++;
      const scale = canvas.width / w;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === Background gradient ===
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.75
      );
      bgGrad.addColorStop(0, '#0a0a30');
      bgGrad.addColorStop(0.4, '#060620');
      bgGrad.addColorStop(0.7, '#050515');
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // === Glow Orbs ===
      for (const orb of orbs) {
        const ox = (orb.baseX + Math.sin(time * orb.speedX + orb.phaseX) * 130) * scale;
        const oy = (orb.baseY + Math.cos(time * orb.speedY + orb.phaseY) * 90) * scale;
        const r = orb.radius * scale;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        grad.addColorStop(0, `rgba(65, 105, 225, ${orb.opacity})`);
        grad.addColorStop(0.4, `rgba(65, 105, 225, ${orb.opacity * 0.4})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // === Energy Waves ===
      for (const wave of waves) {
        wave.phase += wave.speed;
        const baseY = canvas.height * wave.yOffset;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const xNorm = x / scale;
          const modulator = Math.sin(xNorm * 0.0008 + time * 0.0015) * 0.7 + 0.3;
          const y = baseY + Math.sin(xNorm * wave.frequency + wave.phase) * wave.amplitude * modulator * scale;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Glow pass
        ctx.strokeStyle = `rgba(80, 140, 255, ${wave.opacity * 0.5})`;
        ctx.lineWidth = (wave.lineWidth + 4) * scale;
        ctx.stroke();

        // Core line
        ctx.strokeStyle = `rgba(65, 105, 225, ${wave.opacity})`;
        ctx.lineWidth = wave.lineWidth * scale;
        ctx.stroke();
      }

      // === Geometric Shapes ===
      for (const shape of shapes) {
        shape.rotation += shape.rotationSpeed;
        shape.x += shape.vx;
        shape.y += shape.vy;

        if (shape.x < -80) shape.x = w + 80;
        if (shape.x > w + 80) shape.x = -80;
        if (shape.y < -80) shape.y = h + 80;
        if (shape.y > h + 80) shape.y = -80;

        const sx = shape.x * scale;
        const sy = shape.y * scale;
        const ss = shape.size * scale;

        drawPolygon(ctx, sx, sy, ss, shape.sides, shape.rotation);

        // Glow
        ctx.strokeStyle = `rgba(65, 105, 225, ${shape.opacity * 0.5})`;
        ctx.lineWidth = 3 * scale;
        ctx.stroke();

        // Core
        ctx.strokeStyle = `rgba(100, 160, 255, ${shape.opacity})`;
        ctx.lineWidth = 0.8 * scale;
        ctx.stroke();
      }

      // === Particles ===
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
        const px = p.x * scale;
        const py = p.y * scale;
        const ps = p.size * scale * pulse;

        // Glow halo
        ctx.beginPath();
        ctx.arc(px, py, ps * 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity * 0.08 * pulse})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity * pulse})`;
        ctx.fill();
      }

      // === Light Streaks ===
      for (let i = 0; i < 3; i++) {
        const streakBaseY = h * (0.2 + i * 0.28) + Math.sin(time * 0.0008 + i * 2.5) * 90;
        const sby = streakBaseY * scale;
        const offset = Math.sin(time * 0.0015 + i * 1.5) * 0.15;

        const grad = ctx.createLinearGradient(0, sby, canvas.width, sby);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(Math.max(0, 0.25 + offset), 'rgba(65, 105, 225, 0.035)');
        grad.addColorStop(Math.min(1, 0.65 + offset * 0.7), 'rgba(100, 160, 255, 0.02)');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 8) {
          const xNorm = x / scale;
          const sy = sby + Math.sin(xNorm * 0.006 + time * 0.003 + i) * 18 * scale;
          if (x === 0) ctx.moveTo(x, sy - 20 * scale);
          else ctx.lineTo(x, sy - 20 * scale);
        }
        for (let x = canvas.width; x >= 0; x -= 8) {
          const xNorm = x / scale;
          const sy = sby + Math.sin(xNorm * 0.006 + time * 0.003 + i) * 18 * scale;
          ctx.lineTo(x, sy + 20 * scale);
        }
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // === Connection lines between close particles ===
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * scale;
          const dy = (particles[i].y - particles[j].y) * scale;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120 * scale;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x * scale, particles[i].y * scale);
            ctx.lineTo(particles[j].x * scale, particles[j].y * scale);
            ctx.strokeStyle = `rgba(65, 105, 225, ${alpha})`;
            ctx.lineWidth = 0.5 * scale;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
