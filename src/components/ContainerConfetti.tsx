"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { containerStats } from "@/lib/containers";

// Brand palette for the confetti pieces.
const COLORS = ["#0d0b9d", "#011e62", "#fee13b", "#0289cb", "#fe8101", "#c80114"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  vrot: number;
  life: number;
};

/**
 * Fires a burst of confetti each time a full container is completed, giving the
 * customer a sense of accomplishment (the owner's ask). Sits full-screen, above
 * everything, and never intercepts clicks.
 */
export function ContainerConfetti() {
  const { items } = useCart();
  const fullCount = containerStats(items).fullCount;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevFull = useRef<number | null>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef(0);

  const fire = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = window.innerWidth;
    const h = window.innerHeight;
    // Two cannons firing up from the bottom corners.
    const origins = [
      { x: w * 0.15, y: h + 10, angle: -Math.PI / 2.6 },
      { x: w * 0.85, y: h + 10, angle: -Math.PI + Math.PI / 2.6 },
    ];
    const fresh: Piece[] = [];
    for (const o of origins) {
      for (let i = 0; i < 70; i++) {
        const spread = (Math.random() - 0.5) * 0.9;
        const speed = 9 + Math.random() * 8;
        fresh.push({
          x: o.x,
          y: o.y,
          vx: Math.cos(o.angle + spread) * speed,
          vy: Math.sin(o.angle + spread) * speed,
          size: 5 + Math.random() * 6,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.3,
          life: 1,
        });
      }
    }
    piecesRef.current = piecesRef.current.concat(fresh);

    if (!rafRef.current) {
      const tick = () => {
        const cv = canvasRef.current;
        const c = cv?.getContext("2d");
        if (!cv || !c) {
          rafRef.current = 0;
          return;
        }
        c.clearRect(0, 0, cv.width, cv.height);
        const pieces = piecesRef.current;
        for (const p of pieces) {
          p.vy += 0.28; // gravity
          p.vx *= 0.99;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          p.life -= 0.005;
          c.save();
          c.globalAlpha = Math.max(0, p.life);
          c.translate(p.x, p.y);
          c.rotate(p.rot);
          c.fillStyle = p.color;
          c.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          c.restore();
        }
        piecesRef.current = pieces.filter(
          (p) => p.life > 0 && p.y < window.innerHeight + 40,
        );
        if (piecesRef.current.length > 0) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          c.clearRect(0, 0, cv.width, cv.height);
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    // Don't celebrate the cart simply being restored from storage on load.
    if (prevFull.current === null) {
      prevFull.current = fullCount;
      return;
    }
    if (fullCount > prevFull.current) fire();
    prevFull.current = fullCount;
  }, [fullCount]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
