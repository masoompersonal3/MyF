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

export const techLogos = [
  { node: <SiReact className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMongodb className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiExpress className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiNodedotjs className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiFramer className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiGit className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiVite className="w-[80px] h-[80px] md:w-[60px] md:h-[60px]" />, title: "Vite", href: "https://vitejs.dev" },
];

export const ToolsSection = () => {
  return (
    <section className="relative w-full bg-transparent text-white pt-12 pb-0 flex flex-col items-center">
      {/* Top solid black block stretching from the top of the section to exactly above the 46vw container */}
      <div className="absolute top-0 left-0 w-full bg-[#0a0a0a] z-0 bottom-[100vw] md:bottom-[46vw]" />

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[20rem] bg-zinc-800/20 rounded-[100%] blur-[120px] pointer-events-none" />

      {/* Heading - Make sure it's z-40 so it stays above the semi-circle if they overlap */}
      <div className="relative z-40 max-w-7xl mx-auto flex flex-col items-center justify-center mb-0">
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

      {/* The massive downward semi-circle with LogoLoop sitting at its bottom */}
      <div className="relative z-30 w-full overflow-hidden h-[100vw] md:h-[46vw] bg-transparent mt-4 sm:-mt-[15vw] md:-mt-[30vw] lg:-mt-[32vw]">
        {/* The Black Circle extending from ToolsSection */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] w-[150vw] h-[200vw] md:w-[120vw] md:h-[92vw] bg-[#0a0a0a] rounded-[50%]" />
         
        {/* Logo Loop kept fixed relative to the heading, while the curve drops 6vw lower */}
        <div className="absolute bottom-[40px] md:bottom-[calc(6vw+13px)] left-0 w-full z-40 flex flex-col gap-6 md:gap-8">
          <div 
            className="block md:hidden max-w-5xl mx-auto w-full" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="right"
              logoHeight={80}
              gap={80}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="Technology stack layer 1"
            />
          </div>
          <div 
            className="max-w-5xl mx-auto w-full" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={80}
              gap={80}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="Technology stack layer 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
