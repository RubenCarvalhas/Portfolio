import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Gamepad2, BookOpen, Tv, Code2 } from "lucide-react";

const TIMELINE = [
  {
    id: 1,
    year: "16",
    title: "Where it all started",
    sub: "Vocational course — João de Barros",
    detail: "First contact with programming. Fell in love with the idea of building things from scratch.",
  },
  {
    id: 2,
    year: "INT",
    title: "Android app",
    sub: "School internship",
    detail: "Developed an Android app for a company to serve as a virtual portfolio, first real-world project.",
  },
  {
    id: 3,
    year: "CTeSP",
    title: "Video game & web design",
    sub: "Higher vocational course",
    detail: "Deepened both creative and technical skills across game development and web design.",
  },
  {
    id: 4,
    year: "4mo",
    title: "React internship",
    sub: "Travel planning app",
    detail: "Built a React app that calculated the best travel route including every possible stop along the way.",
  },
  {
    id: 5,
    year: "1yr",
    title: "First professional role",
    sub: "React web apps",
    detail: "First paid position building web applications in React — a full year of real production experience.",
  },
];

const HOBBIES = [
  { icon: Gamepad2, label: "Video games" },
  { icon: BookOpen, label: "Reading" },
  { icon: Tv, label: "TV shows" },
  { icon: Code2, label: "Side projects" },
];

export default function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <motion.div
          className="about__label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          about me
        </motion.div>

        <motion.h2
          className="about__heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The person behind the code.
        </motion.h2>

        <div className="about__grid">
          {/* LEFT */}
          <motion.div
            className="about__left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about__bio">
              I'm someone who loves to{" "}
              <span className="about__highlight">create from imagination</span>,
              from websites to video games and everything in between. I use tools
              like Figma and Blender to bring whatever comes to mind to life.
            </p>
            <p className="about__bio">
              In my free time I enjoy playing video games, reading, and watching
              shows, as well as coming up with new side projects to keep pushing
              my skills forward.
            </p>

            <div className="about__hobbies">
              {HOBBIES.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  className="hobby hover-target"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/cv.pdf"
              download
              className="about__cv hover-target"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </motion.div>

          {/* RIGHT — timeline */}
          <div className="about__timeline">
            {TIMELINE.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="tl__item"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
    >
      <div className="tl__left">
        <div className="tl__year">{item.year}</div>
        {index < 4 && <div className="tl__line" />}
      </div>

      <button
        className={`tl__card hover-target${open ? " tl__card--open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="tl__card-header">
          <div>
            <div className="tl__card-title">{item.title}</div>
            <div className="tl__card-sub">{item.sub}</div>
          </div>
          <motion.span
            className="tl__chevron"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <ChevronDown size={15} />
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              className="tl__card-detail"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: "10px" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {item.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

function NebulaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    function resize() {
      const section = canvas.parentElement;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.008,
      }));
    }

    function draw() {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      const g1 = ctx.createRadialGradient(w * 0.15, h * 0.3, 0, w * 0.15, h * 0.3, w * 0.5);
      g1.addColorStop(0, "rgba(60,40,140,0.14)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.7, 0, w * 0.85, h * 0.7, w * 0.45);
      g2.addColorStop(0, "rgba(30,80,150,0.12)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.x += s.vx; s.y += s.vy; s.tw += s.speed;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        const alpha = Math.max(0, 0.3 + Math.sin(s.tw) * 0.3);
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
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} className="about__canvas" />;
}
