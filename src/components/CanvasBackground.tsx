"use client";

import { useRef, useEffect, useCallback } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  
  // Track scroll for reactive velocity
  const scrollYRef = useRef(0);
  const velocityRef = useRef(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // Smoothly decay velocity
    velocityRef.current *= 0.95;

    // Base fill
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    const cellSize = 60;
    const cols = Math.ceil(w / cellSize) + 1;
    const rows = Math.ceil(h / cellSize) + 1;

    // Subtle grid, reacts slightly to scroll velocity
    const gridOffset = velocityRef.current * 0.5;
    
    ctx.strokeStyle = "rgba(255,255,255,0.02)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) {
      const x = i * cellSize;
      ctx.beginPath();
      ctx.moveTo(x, -50 + gridOffset);
      ctx.lineTo(x, h + 50 + gridOffset);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      const y = (j * cellSize) + gridOffset;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Animated flow lines — deform based on scroll velocity
    const t = time * 0.0004;
    const velocityDeformation = Math.min(Math.abs(velocityRef.current) * 2, 200);

    for (let i = 0; i < 5; i++) {
      const phase = i * 1.3;
      const yBase = (h * 0.15) + (i * h * 0.16);
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(201, 168, 124, ${0.03 + Math.sin(t + phase) * 0.03})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += 5) {
        // Normal wave + velocity spike wave
        const wave = 
          Math.sin(x * 0.003 + t + phase) * 30 +
          Math.sin(x * 0.007 + t * 1.3) * 15;
          
        const spike = Math.sin(x * 0.02 + t) * velocityDeformation * Math.sin(phase);
        
        const y = yBase + wave + spike;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Corner accent lines (architectural framing)
    const cornerLen = 80;
    ctx.strokeStyle = "rgba(201, 168, 124, 0.08)";
    ctx.lineWidth = 1;

    // Top-left
    ctx.beginPath(); ctx.moveTo(40, 40); ctx.lineTo(40 + cornerLen, 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 40); ctx.lineTo(40, 40 + cornerLen); ctx.stroke();
    
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(w - 40, h - 40); ctx.lineTo(w - 40 - cornerLen, h - 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 40, h - 40); ctx.lineTo(w - 40, h - 40 - cornerLen); ctx.stroke();

    // Vignette (radial fade to edges)
    const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7);
    gradient.addColorStop(0, "rgba(10, 10, 10, 0)");
    gradient.addColorStop(1, "rgba(10, 10, 10, 0.85)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      const delta = newScrollY - scrollYRef.current;
      velocityRef.current = delta;
      scrollYRef.current = newScrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (prefersReducedMotion) {
      draw(ctx, 0, window.innerWidth, window.innerHeight);
    } else {
      const loop = (time: number) => {
        const dpr = Math.min(window.devicePixelRatio, 2);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(ctx, time, window.innerWidth, window.innerHeight);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
