import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiSupabase,
  SiNodedotjs, SiVite, SiFigma, SiBlender, SiStripe, SiBootstrap, SiGit,
  SiHtml5, SiCss, SiPhp, SiCplusplus, SiSharp,
  SiAffinitydesigner, SiMysql, SiLaravel,
} from "react-icons/si";
import { Clapperboard } from "lucide-react";

const SKILLS = [
  { label: "React", level: 9, Icon: SiReact, hue: 193 },
  { label: "Next.js", level: 8, Icon: SiNextdotjs, hue: 0 },
  { label: "TypeScript", level: 8, Icon: SiTypescript, hue: 211 },
  { label: "JavaScript", level: 9, Icon: SiJavascript, hue: 53 },
  { label: "Supabase", level: 8, Icon: SiSupabase, hue: 153 },
  { label: "Node.js", level: 7, Icon: SiNodedotjs, hue: 120 },
  { label: "Vite", level: 8, Icon: SiVite, hue: 267 },
  { label: "Figma", level: 7, Icon: SiFigma, hue: 18 },
  { label: "Blender", level: 5, Icon: SiBlender, hue: 24 },
  { label: "Stripe", level: 6, Icon: SiStripe, hue: 252 },
  { label: "Bootstrap", level: 7, Icon: SiBootstrap, hue: 291 },
  { label: "Git", level: 8, Icon: SiGit, hue: 11 },
  { label: "HTML5", level: 8, Icon: SiHtml5, hue: 17 },
  { label: "CSS3", level: 8, Icon: SiCss, hue: 206 },
  { label: "PHP", level: 6, Icon: SiPhp, hue: 245 },
  { label: "C++", level: 6, Icon: SiCplusplus, hue: 207 },
  { label: "C#", level: 6, Icon: SiSharp, hue: 271 },
  { label: "Premiere Pro", level: 6, Icon: Clapperboard, hue: 250 },
  { label: "Affinity Designer", level: 5, Icon: SiAffinitydesigner, hue: 195 },
  { label: "MySQL", level: 7, Icon: SiMysql, hue: 198 },
  { label: "Laravel", level: 5, Icon: SiLaravel, hue: 0 },
];

export default function Skills() {
  return (
    <section className="skills">
      <div className="skills__inner">
        <motion.div
          className="skills__label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          skills
        </motion.div>

        <motion.h2
          className="skills__heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tools im most familiar with
        </motion.h2>

        <p className="skills__hint">Hold a bubble for details</p>

        <BubbleField />
      </div>
    </section>
  );
}

function BubbleField() {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, down: false, dragIndex: -1 });
  const rafRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const holdTimerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    function sizeFor(level) {
      const isMobile = window.innerWidth < 700;
      const minR = isMobile ? 20 : 30;
      const maxAdd = isMobile ? 12 : 20;
      return minR + (level / 9) * maxAdd;
    }

    function setup() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      bubblesRef.current = SKILLS.map((skill) => {
        const r = sizeFor(skill.level);
        return {
          label: skill.label,
          r,
          x: Math.random() * (w - r * 2) + r,
          y: Math.random() * (h - r * 2) + r,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2,
          hue: skill.hue,
        };
      });
    }

    function resolveCollisions(bubbles) {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i];
          const b = bubbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + b.r;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            const avx = a.vx, avy = a.vy;
            const bvx = b.vx, bvy = b.vy;

            a.vx = bvx * 0.985;
            a.vy = bvy * 0.985;
            b.vx = avx * 0.985;
            b.vy = avy * 0.985;
          }
        }
      }
    }

    function tick() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const bubbles = bubblesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < bubbles.length; i++) {
        const bub = bubbles[i];

        if (mouse.dragIndex === i) {
          bub.x += (mouse.x - bub.x) * 0.25;
          bub.y += (mouse.y - bub.y) * 0.25;
          bub.vx = 0;
          bub.vy = 0;
        } else {
          bub.x += bub.vx;
          bub.y += bub.vy;

          const dx = bub.x - mouse.x;
          const dy = bub.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const repelRadius = bub.r + 70;
          if (dist < repelRadius && dist > 0) {
            const force = (repelRadius - dist) / repelRadius;
            bub.vx += (dx / dist) * force * 0.35;
            bub.vy += (dy / dist) * force * 0.35;
          }

          if (bub.x - bub.r < 0) { bub.x = bub.r; bub.vx = Math.abs(bub.vx) * 0.7; }
          if (bub.x + bub.r > w) { bub.x = w - bub.r; bub.vx = -Math.abs(bub.vx) * 0.7; }
          if (bub.y - bub.r < 0) { bub.y = bub.r; bub.vy = Math.abs(bub.vy) * 0.7; }
          if (bub.y + bub.r > h) { bub.y = h - bub.r; bub.vy = -Math.abs(bub.vy) * 0.7; }

          bub.vx *= 0.997;
          bub.vy *= 0.997;
          const speed = Math.hypot(bub.vx, bub.vy);
          if (speed < 0.6) {
            const angle = Math.random() * Math.PI * 2;
            bub.vx += Math.cos(angle) * 0.12;
            bub.vy += Math.sin(angle) * 0.12;
          }
          const maxSpeed = 2.4;
          if (speed > maxSpeed) {
            bub.vx = (bub.vx / speed) * maxSpeed;
            bub.vy = (bub.vy / speed) * maxSpeed;
          }
        }
      }

      resolveCollisions(bubbles);

      setPositions(
        bubbles.map((b, i) => ({
          x: b.x,
          y: b.y,
          r: b.r,
          dragging: mouse.dragIndex === i,
        }))
      );

      rafRef.current = requestAnimationFrame(tick);
    }

    function getPos(e) {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onMove(e) {
      if (e.touches) e.preventDefault();
      const pos = getPos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
    }

    function onDown(e) {
      if (e.touches) e.preventDefault();
      const pos = getPos(e);
      const bubbles = bubblesRef.current;
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bub = bubbles[i];
        const dist = Math.hypot(bub.x - pos.x, bub.y - pos.y);
        if (dist < bub.r) {
          mouseRef.current.dragIndex = i;
          mouseRef.current.down = true;

          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = setTimeout(() => {
            setRevealedIndex(i);
          }, 2000);

          break;
        }
      }
    }

    function onUp() {
      if (mouseRef.current.dragIndex !== -1) {
        const bub = bubblesRef.current[mouseRef.current.dragIndex];
        bub.vx = (Math.random() - 0.5) * 2.2;
        bub.vy = (Math.random() - 0.5) * 2.2;
      }
      mouseRef.current.down = false;
      mouseRef.current.dragIndex = -1;
      clearTimeout(holdTimerRef.current);
      setRevealedIndex(-1);
    }

    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      clearTimeout(holdTimerRef.current);
      setRevealedIndex(-1);
    }

    setup();
    tick();

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mousedown", onDown);
    container.addEventListener("mouseup", onUp);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchmove", onMove, { passive: false });
    container.addEventListener("touchstart", onDown, { passive: false });
    container.addEventListener("touchend", onUp);

    function onResize() {
      setup();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(holdTimerRef.current);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("mouseup", onUp);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="bubblefield">
      {positions.map((pos, i) => {
        const skill = SKILLS[i];
        if (!skill) return null;
        const { Icon, hue, label } = skill;
        const revealed = revealedIndex === i;
        return (
          <div
            key={label}
            className={`bubble${pos.dragging ? " bubble--dragging" : ""}`}
            style={{
              width: pos.r * 2,
              height: pos.r * 2,
              transform: `translate(${pos.x - pos.r}px, ${pos.y - pos.r}px)`,
              borderColor: `hsla(${hue}, 70%, 65%, ${pos.dragging ? 0.9 : 0.45})`,
              background: `hsla(${hue}, 80%, 60%, ${pos.dragging ? 0.22 : 0.1})`,
            }}
            title={label}
          >
            {revealed && (
              <span
                className="bubble__name"
                style={{ color: `hsl(${hue}, 85%, 82%)` }}
              >
                {label}
              </span>
            )}
            <Icon
              style={{
                width: pos.r * 0.85,
                height: pos.r * 0.85,
                color: `hsl(${hue}, 85%, 78%)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
