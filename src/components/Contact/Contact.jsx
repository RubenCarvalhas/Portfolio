import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";


const EMAIL = "carvalhasruben@gmail.com";
const LINKS = [
  { label: "GitHub", href: "https://github.com/rubencarvalhas", Icon: SiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/r%C3%BAben-carvalhas-9875a2290/", Icon: FaLinkedin },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <motion.div
          className="contact__label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          say hi
        </motion.div>

        <motion.h2
          className="contact__heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let's build something together.
        </motion.h2>

        <motion.p
          className="contact__sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Open to freelance work and new opportunities. Reach out anytime!
        </motion.p>

        <motion.a
          href={`mailto:${EMAIL}`}
          className="contact__email hover-target"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.26 }}
        >
          <Mail size={16} />
          {EMAIL}
        </motion.a>

        <motion.div
          className="contact__links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link hover-target"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </motion.div>

        <div className="contact__footer">
          © {new Date().getFullYear()} Rúben Carvalhas
        </div>
      </div>
    </section>
  );
}
