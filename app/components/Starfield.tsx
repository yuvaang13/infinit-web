"use client";

import { useEffect, useRef } from "react";

// Infinit palette — keep in sync with tailwind.config.ts infinit.*
const COLORS = [
  "#A682FF", // primary
  "#715AFF", // accent
  "#5887FF", // secondary
  "#55C1FF", // sky
  "#D6CCFF", // pale lavender
  "#ffffff",
] as const;

type Star = {
  x: number;
  y: number;
  z: number;
  pz: number; // previous z for streak
  color: string;
  baseRadius: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  // scroll-driven velocity
  const targetSpeedRef = useRef(1.2);
  const speedRef = useRef(1.2);
  const lastScrollYRef = useRef(0);
  const scrollIdleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // respect accessibility, no animation

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cx = 0;
    let cy = 0;

    const STAR_COUNT = Math.min(520, Math.max(220, Math.floor((window.innerWidth * window.innerHeight) / 5200)));
    const DEPTH = 1200; // z range
    const BASE_SPEED = 1.15;
    const MAX_SPEED = 28;
    const MIN_SPEED = -10;

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    function pickColor(): string {
      // weighted: favor brand purples, fewer white dots
      const r = Math.random();
      if (r < 0.22) return COLORS[0];
      if (r < 0.44) return COLORS[1];
      if (r < 0.62) return COLORS[2];
      if (r < 0.78) return COLORS[3];
      if (r < 0.92) return COLORS[4];
      return COLORS[5];
    }

    function makeStar(): Star {
      // distribute in a large plane; z in [1, DEPTH]
      return {
        x: rand(-w * 0.75, w * 0.75),
        y: rand(-h * 0.75, h * 0.75),
        z: rand(1, DEPTH),
        pz: rand(1, DEPTH),
        color: pickColor(),
        baseRadius: rand(0.55, 1.35),
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cx = w / 2;
      cy = h / 2;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // re-seed if first time or count mismatched significantly
      if (starsRef.current.length === 0) {
        starsRef.current = Array.from({ length: STAR_COUNT }, makeStar);
      } else {
        // keep existing but ensure they are within new bounds — no full reset to avoid flash
        const desired = Math.min(520, Math.max(220, Math.floor((w * h) / 5200)));
        if (starsRef.current.length < desired) {
          const add = desired - starsRef.current.length;
          for (let i = 0; i < add; i++) starsRef.current.push(makeStar());
        } else if (starsRef.current.length > desired) {
          starsRef.current.length = desired;
        }
      }
    }

    resize();

    lastScrollYRef.current = window.scrollY;
    targetSpeedRef.current = BASE_SPEED;
    speedRef.current = BASE_SPEED;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      lastScrollYRef.current = y;

      // scale delta to speed impulse; clamp
      // scroll down (delta>0) => positive warp towards viewer
      // scroll up (delta<0) => negative (receding)
      const impulse = delta * 0.26;
      const raw = BASE_SPEED + impulse;
      targetSpeedRef.current = Math.max(MIN_SPEED, Math.min(MAX_SPEED, raw));

      // decay back to BASE_SPEED after scrolling stops
      if (scrollIdleTimerRef.current) window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        targetSpeedRef.current = BASE_SPEED;
      }, 140) as unknown as number;
    };

    // also listen to wheel for instant response (scroll event can be throttled)
    const onWheel = (e: WheelEvent) => {
      const impulse = e.deltaY * 0.16;
      const raw = targetSpeedRef.current + impulse * 0.35;
      targetSpeedRef.current = Math.max(MIN_SPEED, Math.min(MAX_SPEED, raw));
      if (scrollIdleTimerRef.current) window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        targetSpeedRef.current = BASE_SPEED;
      }, 160) as unknown as number;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", resize);

    let lastTime = performance.now();

    function frame(now: number) {
      rafRef.current = requestAnimationFrame(frame);
      const dt = Math.min(32, now - lastTime) / 16.66; // normalize to ~60fps
      lastTime = now;

      // smooth speed with lerp + asymmetric easing (faster attack, slower release)
      const target = targetSpeedRef.current;
      const cur = speedRef.current;
      const lerp = target > cur ? 0.18 : 0.07;
      speedRef.current += (target - cur) * lerp * dt;
      // gently pull target toward base when idle (extra decay)
      if (Math.abs(target - BASE_SPEED) > 0.05) {
        targetSpeedRef.current += (BASE_SPEED - target) * 0.035 * dt;
      }
      const speed = speedRef.current;

      // fade canvas slightly for motion blur / trails when at high speed
      // we clear fully each frame but could add translucent overlay for trails
      ctx!.clearRect(0, 0, w, h);

      const stars = starsRef.current;
      const isWarp = Math.abs(speed) > 6;
      const isReceding = speed < -0.3;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed * dt * 1.55;

        // recycle
        if (s.z <= 0.8) {
          // flew past viewer — respawn at far plane
          s.x = rand(-w * 0.75, w * 0.75);
          s.y = rand(-h * 0.75, h * 0.75);
          s.z = DEPTH;
          s.pz = s.z;
          // occasionally refresh color for variety
          if (Math.random() < 0.3) s.color = pickColor();
          continue;
        }
        if (s.z > DEPTH) {
          // receding: star went behind far plane — bring to near plane
          s.x = rand(-w * 0.75, w * 0.75);
          s.y = rand(-h * 0.75, h * 0.75);
          s.z = 1.5;
          s.pz = s.z;
          if (Math.random() < 0.3) s.color = pickColor();
          continue;
        }

        // perspective projection
        const sx = cx + (s.x / s.z) * 520;
        const sy = cy + (s.y / s.z) * 520;
        const psx = cx + (s.x / s.pz) * 520;
        const psy = cy + (s.y / s.pz) * 520;

        // cull off-screen (with generous margin for streaks)
        if (sx < -80 || sx > w + 80 || sy < -80 || sy > h + 80) {
          // if far off center and depth large, keep; else respawn to avoid sparse center
          if (s.z > DEPTH * 0.85 && Math.random() < 0.02) {
            s.x = rand(-w * 0.55, w * 0.55);
            s.y = rand(-h * 0.55, h * 0.55);
            s.z = DEPTH * rand(0.5, 1);
            s.pz = s.z;
          }
          continue;
        }

        // depth cue: closer = larger + brighter, farther = dimmer + smaller
        const depth01 = 1 - s.z / DEPTH; // 0 far, 1 near
        const alpha = isReceding
          ? 0.12 + depth01 * 0.35
          : 0.18 + depth01 * 0.85;
        const radius = s.baseRadius * (0.7 + depth01 * 1.9) * (isWarp ? 1.15 : 1);

        // warp streak length grows with speed
        if (isWarp || Math.abs(speed) > 2.5) {
          const dx = sx - psx;
          const dy = sy - psy;
          const len = Math.hypot(dx, dy);
          // speed-scaled opacity for the trail
          const trailAlpha = Math.min(0.95, Math.abs(speed) / 18) * alpha;
          ctx!.beginPath();
          ctx!.moveTo(psx, psy);
          ctx!.lineTo(sx, sy);
          // radial gradient could be heavy; use simple line with alpha and shadow for glow at high speed
          ctx!.strokeStyle = hexToRgba(s.color, trailAlpha * (isReceding ? 0.45 : 1));
          ctx!.lineWidth = Math.max(0.7, radius * (Math.abs(speed) > 14 ? 1.6 : 1.15));
          ctx!.lineCap = "round";
          ctx!.stroke();

          // head glow dot
          if (!isReceding && depth01 > 0.35) {
            ctx!.beginPath();
            ctx!.fillStyle = hexToRgba(s.color, Math.min(1, alpha + 0.15));
            ctx!.shadowColor = s.color;
            ctx!.shadowBlur = radius * 4 * (Math.abs(speed) / 10 + 1);
            ctx!.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.shadowBlur = 0;
          }
          // if receding, draw smaller tail opposite
          if (len > 40) {
            // avoid ultra-long lines across center
          }
        } else {
          // calm drift — soft dot with subtle glow
          ctx!.beginPath();
          ctx!.fillStyle = hexToRgba(s.color, alpha);
          if (depth01 > 0.6) {
            ctx!.shadowColor = s.color;
            ctx!.shadowBlur = radius * 3.5;
          }
          ctx!.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }

      // center vignette: subtle warp focal glow when speeding
      if (isWarp && !isReceding) {
        const intensity = Math.min(1, (Math.abs(speed) - 6) / 16);
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
        grad.addColorStop(0, `rgba(113,90,255,${0.035 * intensity})`);
        grad.addColorStop(0.35, `rgba(166,130,255,${0.018 * intensity})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resize);
      if (scrollIdleTimerRef.current) window.clearTimeout(scrollIdleTimerRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "transparent" }}
    />
  );
}

function hexToRgba(hex: string, alpha: number): string {
  // supports #RGB, #RRGGBB
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alpha))})`;
}
