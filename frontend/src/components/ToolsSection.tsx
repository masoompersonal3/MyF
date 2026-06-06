// @ts-nocheck
import React from 'react';
import LogoLoop from './ui/LogoLoop';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiFramer,
  SiGit,
  SiVite
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact size={60} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs size={60} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript size={60} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss size={60} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMongodb size={60} />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiExpress size={60} />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiNodedotjs size={60} />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiFramer size={60} />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiGit size={60} />, title: "Git", href: "https://git-scm.com" },
  { node: <SiVite size={60} />, title: "Vite", href: "https://vitejs.dev" },
];

export const ToolsSection = () => {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-12 overflow-hidden border-t border-zinc-900/50">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[20rem] bg-zinc-800/20 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-wide text-white">
            Tools & <span className="font-bold text-yellow-400">Technologies</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
            The powerful ecosystem I use to build seamless, interactive applications.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 w-full overflow-hidden">
        {/* Left/Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        {/* Logo Loop - Moving Left */}
        <div className="py-8 border-y border-zinc-900/50 bg-zinc-900/10">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={60}
            gap={80}
            hoverSpeed={0}
            scaleOnHover
            fadeOut={false} // Managed by our absolute gradients instead to perfectly match #0a0a0a
            ariaLabel="Technology stack"
          />
        </div>
      </div>
    </section>
  );
};
