import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, Database } from "lucide-react";

const WORDS = [
  "Frontend Developer",
  "React & Next.js",
  "Building SaaS",
  "Supabase + Stripe",
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hi, I'm</p>
        <h1 className="hero__name">Rúben Carvalhas</h1>
        <Typewriter words={WORDS} />

        <div className="hero__actions">
          <a href="#projects" className="btn btn--ghost hover-target">
            View projects
          </a>
          <a href="#contact" className="btn btn--solid hover-target">
            Contact
          </a>
        </div>
      </div>

    </section>
  );
}

/* ---------------- Typewriter ---------------- */

function Typewriter({ words }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1400);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, 40);
      } else {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <div className="typewriter">
      <span>{text}</span>
      <span className="typewriter__cursor" />
    </div>
  );
}

/* ---------------- Reveal card (scroll animation) ---------------- */

function RevealCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      className="card hover-target"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="card__icon">
        <Icon size={22} />
      </div>
      <h3 className="card__title">{title}</h3>
      <p className="card__desc">{desc}</p>
    </motion.div>
  );
}
