import { useEffect, useRef } from "react";

const BURST_COLORS = [
  "#20b2a6", "#00ffea", "#f5a623",
  "#c084fc", "#38bdf8", "#fb7185",
  "#4ade80", "#facc15", "#ff6b6b",
  "#a78bfa", "#34d399",
];

export function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Background stars - fewer on mobile
    const isMobile = window.innerWidth < 768;
    const stars = Array.from({ length: isMobile ? 150 : 300 }, makeStar);

    function makeStar() {
      const isTeal = Math.random() < 0.18;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        alphaDir: Math.random() < 0.5 ? 1 : -1,
        alphaSpeed: 0.004 + Math.random() * 0.009,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        color: isTeal ? "#20b2a6" : "#ffffff",
        glow: isTeal ? 5 : 2,
      };
    }

    const bursts = [];
    let burstTimer = 0;
    const BURST_INTERVAL = 180;

    function spawnBurst() {
      const x = W() * 0.2 + Math.random() * W() * 0.6;
      const y = H() * 0.15 + Math.random() * H() * 0.7;
      const baseColor = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const accentColor = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const count = 28 + Math.floor(Math.random() * 16);

      // Flash
      bursts.push({ type: "flash", x, y, r: 6, alpha: 1, color: baseColor, fade: 0.06 });

      // Dot particles
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2.5 + Math.random() * 4;
        const color = Math.random() < 0.6 ? baseColor : accentColor;
        bursts.push({
          type: "dot",
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          r: 2 + Math.random() * 2.5,
          color,
          glow: 12,
          fade: 0.016 + Math.random() * 0.012,
          gravity: 0.05 + Math.random() * 0.04,
          drag: 0.96,
        });
      }

      // Streak sparks
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 5;
        const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
        bursts.push({
          type: "streak",
          x, y, px: x, py: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          glow: 14,
          fade: 0.022,
          gravity: 0.06,
          drag: 0.95,
        });
      }
    }

    function drawStar(s) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.shadowBlur = s.glow;
      ctx.shadowColor = s.color;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawBurst(b) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, b.alpha);

      if (b.type === "flash") {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (b.type === "dot") {
        ctx.shadowBlur = b.glow;
        ctx.shadowColor = b.color;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (b.type === "streak") {
        ctx.shadowBlur = b.glow;
        ctx.shadowColor = b.color;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.px, b.py);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, W(), H());

      // Draw background stars
      stars.forEach((s) => {
        s.alpha += s.alphaSpeed * s.alphaDir;
        if (s.alpha >= 0.95) { s.alpha = 0.95; s.alphaDir = -1; }
        if (s.alpha <= 0.1) { s.alpha = 0.1; s.alphaDir = 1; }
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W();
        if (s.x > W()) s.x = 0;
        if (s.y < 0) s.y = H();
        if (s.y > H()) s.y = 0;
        drawStar(s);
      });

      // Burst timer
      burstTimer++;
      if (burstTimer >= BURST_INTERVAL) {
        spawnBurst();
        burstTimer = 0;
      }

      // Update burst particles
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];

        if (b.type === "flash") {
          b.r += 2.5;
          b.alpha -= b.fade;
        } else {
          if (b.type === "streak") {
            b.px = b.x;
            b.py = b.y;
          }
          b.x += b.vx;
          b.y += b.vy;
          b.vy += b.gravity;
          b.vx *= b.drag;
          b.vy *= b.drag;
          b.alpha -= b.fade;
        }

        drawBurst(b);

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.45,
      }}
    />
  );
}
