import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function ProjectsInfiniteRow({ projects = [], speed = 35 }) {
  const loopItems = [...projects, ...projects];

  return (
    <section className="projects-section">
      <motion.div
        className="projects-section__label"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        projects
      </motion.div>

      <motion.h2
        className="projects-section__heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Things I've built.
      </motion.h2>

      <div className="infinite-row">
        <div
          className="infinite-row__track"
          style={{ animationDuration: `${speed}s` }}
        >
          {loopItems.map((project, i) => (
            <div className="infinite-row__item" key={`${project.title}-${i}`}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className="infinite-row__fade infinite-row__fade--left" />
        <div className="infinite-row__fade infinite-row__fade--right" />
      </div>
    </section>
  );
}
