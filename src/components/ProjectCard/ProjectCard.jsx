import { motion } from "framer-motion";

const PLANETS = {
  mercury: { hues: [28, 20], rings: false },
  venus: { hues: [38, 45], rings: false },
  earth: { hues: [205, 140], rings: false, continents: true },
  mars: { hues: [14, 22], rings: false },
  jupiter: { hues: [30, 25], rings: false },
  saturn: { hues: [42, 48], rings: true },
  uranus: { hues: [185, 190], rings: false },
  neptune: { hues: [225, 240], rings: false },
};

export default function ProjectCard({
  title,
  description,
  image,
  planet = "earth",
  link,
}) {
  const config = PLANETS[planet] || PLANETS.earth;

  const cardContent = (
    <>
      <Planet hues={config.hues} rings={config.rings} continents={config.continents} />

      <div className="pcard__image-wrap">
        {image ? (
          <img src={image} alt={title} className="pcard__image" />
        ) : (
          <div className="pcard__image pcard__image--placeholder" />
        )}
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">{title}</h3>
        <div className="pcard__divider" />
        <p className="pcard__desc">{description}</p>
      </div>
    </>
  );

  if (link) {
    return (
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="pcard hover-target"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="pcard hover-target"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  );
}

function Planet({ hues, rings, continents }) {
  const [h1, h2] = hues;
  const gradId = `pcardBody-${h1}-${h2}`;
  const clipId = `pcardClip-${h1}-${h2}`;

  return (
    <svg className="pcard__planet" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={`hsl(${h1}, 55%, 72%)`} />
          <stop offset="55%" stopColor={`hsl(${h1}, 50%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(${h2}, 55%, 26%)`} />
        </radialGradient>
        {continents && (
          <clipPath id={clipId}>
            <circle cx="28" cy="28" r="17" />
          </clipPath>
        )}
      </defs>

      {rings && (
        <ellipse
          cx="28" cy="30" rx="26" ry="6"
          fill="none"
          stroke={`hsla(${h2}, 45%, 78%, 0.7)`}
          strokeWidth="1.5"
          transform="rotate(-12 28 30)"
        />
      )}

      <circle cx="28" cy="28" r="17" fill={`url(#${gradId})`} />

      {continents && (
        <g clipPath={`url(#${clipId})`} opacity="0.85">
          <path
            d="M 16 18 Q 22 14 27 17 Q 30 19 26 23 Q 21 26 17 23 Q 14 20 16 18 Z"
            fill={`hsl(${h2}, 45%, 38%)`}
          />
          <path
            d="M 30 24 Q 38 22 40 28 Q 41 34 35 35 Q 29 35 28 30 Q 27 26 30 24 Z"
            fill={`hsl(${h2}, 45%, 35%)`}
          />
          <path
            d="M 18 32 Q 23 30 25 34 Q 25 38 20 38 Q 16 37 18 32 Z"
            fill={`hsl(${h2}, 45%, 36%)`}
          />
        </g>
      )}

      {rings && (
        <path
          d="M 4 31 A 26 6 -12 0 0 52 25"
          fill="none"
          stroke={`hsla(${h2}, 50%, 88%, 0.85)`}
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}
