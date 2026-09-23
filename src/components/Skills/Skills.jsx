import { useState } from "react";
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
  { label: "JavaScript", level: 9, Icon: SiJavascript, hue: 53 },
  { label: "Next.js", level: 8, Icon: SiNextdotjs, hue: 0 },
  { label: "TypeScript", level: 8, Icon: SiTypescript, hue: 211 },
  { label: "Supabase", level: 8, Icon: SiSupabase, hue: 153 },
  { label: "Vite", level: 8, Icon: SiVite, hue: 267 },
  { label: "Git", level: 8, Icon: SiGit, hue: 11 },
  { label: "HTML5", level: 8, Icon: SiHtml5, hue: 17 },
  { label: "CSS3", level: 8, Icon: SiCss, hue: 206 },
  { label: "Node.js", level: 7, Icon: SiNodedotjs, hue: 120 },
  { label: "Figma", level: 7, Icon: SiFigma, hue: 18 },
  { label: "Bootstrap", level: 7, Icon: SiBootstrap, hue: 291 },
  { label: "MySQL", level: 7, Icon: SiMysql, hue: 198 },
  { label: "Stripe", level: 6, Icon: SiStripe, hue: 252 },
  { label: "PHP", level: 6, Icon: SiPhp, hue: 245 },
  { label: "C++", level: 6, Icon: SiCplusplus, hue: 207 },
  { label: "C#", level: 6, Icon: SiSharp, hue: 271 },
  { label: "Premiere Pro", level: 6, Icon: Clapperboard, hue: 250 },
  { label: "Blender", level: 5, Icon: SiBlender, hue: 24 },
  { label: "Affinity Designer", level: 5, Icon: SiAffinitydesigner, hue: 195 },
  { label: "Laravel", level: 5, Icon: SiLaravel, hue: 0 },
];

// Rings, innermost first: highest-level skills orbit closest to the core.
// Radii/icon sizes are the desktop values — the whole field is scaled down
// as one unit on narrow screens (see .orbit media query in Skills.css).
// The core planet and the ring spread stay the same — only the icon size grew.
const RING_CONFIG = [
  { radius: 92, iconSize: 46, duration: 46, reverse: false },
  { radius: 156, iconSize: 40, duration: 64, reverse: true },
  { radius: 216, iconSize: 34, duration: 82, reverse: false },
];

function chunkIntoRings(skills) {
  const sorted = [...skills].sort((a, b) => b.level - a.level);
  const size = Math.ceil(sorted.length / 3);
  return [sorted.slice(0, size), sorted.slice(size, size * 2), sorted.slice(size * 2)];
}

const RINGS = chunkIntoRings(SKILLS);

export default function Skills() {
  return (
    <section className="skills" id="skills">
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
          Tools I'm most familiar with
        </motion.h2>

        <p className="skills__hint">Hover a planet for details</p>

        <OrbitField />
      </div>
    </section>
  );
}

function OrbitField() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="orbit hover-target">
      <div className="orbit__core">
        <span className="orbit__core-glow" />
        <span className="orbit__core-dot" />
      </div>

      {RINGS.map((ring, ringIndex) => {
        const cfg = RING_CONFIG[ringIndex];
        return (
          <div
            className="orbit__ring-guide"
            key={`guide-${ringIndex}`}
            style={{ "--r": `${cfg.radius}px` }}
          />
        );
      })}

      {RINGS.map((ring, ringIndex) => {
        const cfg = RING_CONFIG[ringIndex];
        const step = 360 / ring.length;

        return (
          <div
            className={`orbit__ring${cfg.reverse ? " orbit__ring--reverse" : ""}`}
            key={ringIndex}
            style={{
              "--dur": `${cfg.duration}s`,
            }}
          >
            {ring.map((skill, i) => {
              const angle = step * i;
              const key = skill.label;
              const isHovered = hovered === key;
              return (
                <div
                  className="orbit__item"
                  key={key}
                  style={{
                    "--angle": `${angle}deg`,
                    "--r": `${cfg.radius}px`,
                  }}
                >
                  <div
                    className="orbit__counter"
                    style={{ transform: `rotate(${-angle}deg)` }}
                  >
                    <div
                      className={`orbit__spin${cfg.reverse ? " orbit__spin--reverse" : ""}`}
                      style={{ "--dur": `${cfg.duration}s` }}
                    >
                      <button
                        type="button"
                        className={`orbit__icon${isHovered ? " orbit__icon--active" : ""}`}
                        style={{
                          "--size": `${cfg.iconSize}px`,
                          borderColor: `hsla(${skill.hue}, 70%, 65%, ${isHovered ? 0.9 : 0.4})`,
                          background: `hsla(${skill.hue}, 80%, 60%, ${isHovered ? 0.22 : 0.09})`,
                        }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(key)}
                        onBlur={() => setHovered(null)}
                      >
                        <skill.Icon
                          style={{ color: `hsl(${skill.hue}, 85%, 78%)` }}
                        />
                        {isHovered && (
                          <span
                            className="orbit__tooltip"
                            style={{ color: `hsl(${skill.hue}, 85%, 82%)` }}
                          >
                            {skill.label}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
