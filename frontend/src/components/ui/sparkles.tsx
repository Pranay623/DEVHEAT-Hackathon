
import React, { useEffect, useRef } from "react";

interface SparklesProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesProps> = ({
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.5,
  particleDensity = 1000,
  className = "",
  particleColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];

    const initParticles = () => {
      if (!canvas) return;
      particles = [];
      for (let i = 0; i < canvas.width * canvas.height / particleDensity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: minSize + Math.random() * (maxSize - minSize),
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = particleColor;
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [background, minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
  );
};
