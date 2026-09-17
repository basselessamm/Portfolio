"use client";

import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollYRef = useRef(0);
  const velocityRef = useRef(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, w: number, h: number, nodes: Node[]) => {
    ctx.clearRect(0, 0, w, h);

    // Smoothly decay velocity
    velocityRef.current *= 0.94;

    const isLight = document.documentElement.classList.contains("light");
    const bgFill = isLight ? "#f8fafc" : "#080a0f";
    const gridStroke = isLight ? "rgba(15, 23, 42, 0.035)" : "rgba(255, 255, 255, 0.015)";
    const emeraldRgb = isLight ? "5, 150, 105" : "0, 245, 160";
    const cyanRgb = isLight ? "2, 132, 199" : "0, 217, 245";

    // Base Canvas Floor
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, w, h);

    // Subtle Architectural Grid
    const cellSize = 64;
    const gridOffset = (velocityRef.current * 0.4) % cellSize;
    
    ctx.strokeStyle = gridStroke;
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 0; x <= w; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // Horizontal grid lines
    for (let y = gridOffset; y <= h; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Interactive Distributed Systems Nodes
    const maxDistance = 140;
    const mouseRadius = 180;
    const t = time * 0.001;

    // Update and draw connections
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Update position
      node.x += node.vx;
      node.y += node.vy + (velocityRef.current * 0.15);

      // Bounce boundaries
      if (node.x < 0) { node.x = 0; node.vx *= -1; }
      if (node.x > w) { node.x = w; node.vx *= -1; }
      if (node.y < 0) { node.y = 0; node.vy *= -1; }
      if (node.y > h) { node.y = h; node.vy *= -1; }

      // Mouse interaction
      if (mouseRef.current.active) {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * 2;
          node.x -= (dx / dist) * force;
          node.y -= (dy / dist) * force;
        }
      }

      // Connect nodes within maxDistance
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (isLight ? 0.22 : 0.16);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${emeraldRgb}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw node point
      const pulse = Math.sin(t * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
      const r = node.baseRadius + pulse * 1.2;

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 
        ? `rgba(${cyanRgb}, ${0.5 + pulse * 0.4})` 
        : `rgba(${emeraldRgb}, ${0.5 + pulse * 0.4})`;
      ctx.fill();

      // Subtle glow on prime nodes
      if (i % 5 === 0) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${emeraldRgb}, ${0.05 + pulse * 0.05})`;
        ctx.fill();
      }
    }

    // Top Radial Ambient Glow
    const glow = ctx.createRadialGradient(w * 0.5, 0, 10, w * 0.5, 0, Math.min(w * 0.8, 600));
    if (isLight) {
      glow.addColorStop(0, "rgba(5, 150, 105, 0.05)");
      glow.addColorStop(0.5, "rgba(2, 132, 199, 0.03)");
      glow.addColorStop(1, "rgba(248, 250, 252, 0)");
    } else {
      glow.addColorStop(0, "rgba(0, 245, 160, 0.06)");
      glow.addColorStop(0.5, "rgba(0, 217, 245, 0.03)");
      glow.addColorStop(1, "rgba(8, 10, 15, 0)");
    }
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Generate balanced node constellation based on screen area
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.5,
        baseRadius: Math.random() * 1.5 + 1,
        pulseSpeed: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      const delta = newScrollY - scrollYRef.current;
      velocityRef.current = delta;
      scrollYRef.current = newScrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (prefersReducedMotion) {
      draw(ctx, 0, width, height, nodes);
    } else {
      const loop = (time: number) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(ctx, time, width, height, nodes);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
