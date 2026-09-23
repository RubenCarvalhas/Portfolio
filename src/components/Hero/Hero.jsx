import { useEffect, useState } from "react";

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
        // Deferred (rather than called synchronously in the effect body) so
        // this doesn't trigger a same-flush cascading render.
        timeout = setTimeout(() => {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, 0);
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
