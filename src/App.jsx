import { useEffect, useRef } from "react";
import Hero from "./components/Hero/Hero";
import "./components/Hero/Hero.css";

import About from "./components/About/About";
import "./components/About/About.css";

import Skills from "./components/Skills/Skills";
import "./components/Skills/Skills.css";

function GlobalStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      }));
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      // nebula glows — hero zone
      const g1 = ctx.createRadialGradient(w * 0.7, h * 0.12, 0, w * 0.7, h * 0.12, w * 0.5);
      g1.addColorStop(0, "rgba(80,60,160,0.18)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.4);
      g2.addColorStop(0, "rgba(40,90,160,0.15)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // nebula glows — about zone
      const g3 = ctx.createRadialGradient(w * 0.15, h * 0.65, 0, w * 0.15, h * 0.65, w * 0.45);
      g3.addColorStop(0, "rgba(60,40,140,0.14)");
      g3.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      const g4 = ctx.createRadialGradient(w * 0.85, h * 0.8, 0, w * 0.85, h * 0.8, w * 0.4);
      g4.addColorStop(0, "rgba(30,80,150,0.12)");
      g4.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g4;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.tw += s.speed;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        const alpha = Math.max(0, 0.4 + Math.sin(s.tw) * 0.4);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
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
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    function move(e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
    }

    function hide() {
      cursor.style.opacity = "0";
    }

    // event delegation: works even for elements added/removed dynamically
    function onOver(e) {
      if (e.target.closest(".hover-target")) {
        cursor.classList.add("custom-cursor--hover");
      }
    }

    function onOut(e) {
      if (e.target.closest(".hover-target")) {
        cursor.classList.remove("custom-cursor--hover");
      }
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}

export default function App() {
  return (
    <div style={{ position: "relative", background: "#000", margin: 0, padding: 0 }}>
      <GlobalStarfield />
      <CustomCursor />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
      </div>
    </div>
  );
}
