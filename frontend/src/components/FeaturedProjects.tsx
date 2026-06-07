// @ts-nocheck
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { MatrixText } from "./ui/matrix-text";
import { StardustButton } from "./ui/stardust-button";
import { PROJECTS, SITE_CONTENT } from '../data';

const IMG_PADDING = 12;

// ─── Image — starts small, expands to 85%, then shrinks on scroll ────────────────
const AnimatedImage = ({ imgUrl, title }: { imgUrl: string; title: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  
  // 0 = bottom of screen (entering), 0.5 = middle, 1 = top of screen (leaving)
  // Scale starts at 0.70 (70%), grows to 0.95 (95%) in center, stays a bit, then shrinks back to 0.70
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.7, 0.95, 0.95, 0.7]);

  return (
    <div ref={targetRef} className="w-full flex justify-center py-2">
      <motion.div
        style={{
          height: `100vh`, // Maximum screen height
          width: '100%',
          scale,
          willChange: "transform" // Hardware acceleration hint
        }}
        className="relative z-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),inset_0_0_5px_rgba(255,255,255,0.1),0_30px_60px_rgba(0,0,0,0.6)]"
      >
        {/* The clear project image */}
        {imgUrl ? (
          <img src={imgUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-700">
            <span className="text-8xl mb-6 opacity-30">🖼️</span>
            <span className="text-xl font-bold tracking-widest uppercase opacity-30">No Image Yet</span>
          </div>
        )}
        
        {/* Liquid Glass Overlay Effects (Optimized for performance) */}
        {/* 1. Subtle top-left glare without mix-blend-mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        {/* 2. Soft bottom shadow for depth */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        {/* 3. Gold rim light */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-yellow-400/20 pointer-events-none shadow-[inset_0_0_30px_rgba(250,204,21,0.05)]" />
      </motion.div>
    </div>
  );
};

// ─── MatrixText title with inView trigger ─────────────────────────────────────
const ProjectTitle = ({ title, index }: { title: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center w-full"
    >
      {/* Project number */}
      <p className="text-xs font-bold tracking-[0.5em] text-yellow-400 uppercase mb-3">
        Project {String(index + 1).padStart(2, '0')}
      </p>

      {/* MatrixText for the title */}
      {isInView && (
        <div className="flex justify-center">
          <MatrixText
            text={title}
            initialDelay={100}
            letterAnimationDuration={400}
            letterInterval={60}
            className="justify-center text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none"
          />
        </div>
      )}
    </motion.div>
  );
};

// ─── Project details — tight spacing below image ──────────────────────────────
const ProjectDetails = ({ project }: { project: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
    className="mx-auto max-w-5xl px-6 pt-16 md:pt-20 pb-12 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10"
  >
    {/* Left: tech tags */}
    <div className="col-span-1 md:col-span-4 flex flex-col gap-3">
      <p className="text-xs font-bold tracking-[0.4em] text-yellow-400 uppercase">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {project?.tech?.map((t: string, i: number) => (
          <span
            key={i}
            className="px-3 py-1.5 text-xs font-bold tracking-wider bg-zinc-900 text-yellow-400 rounded-full border border-yellow-400/20"
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* Right: description + button */}
    <div className="col-span-1 md:col-span-8">
      <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-6">
        {project.description}
      </p>
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block">
          <StardustButton className="flex items-center gap-2 uppercase tracking-widest font-bold">
            Live Demo <FiArrowUpRight className="text-lg" />
          </StardustButton>
        </a>
      ) : (
        <div className="inline-block opacity-60 cursor-not-allowed">
          <StardustButton className="flex items-center gap-2 uppercase tracking-widest font-bold bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-400 pointer-events-none">
            Coming Soon <FiArrowUpRight className="text-lg" />
          </StardustButton>
        </div>
      )}
    </div>
  </motion.div>
);

// ─── One full parallax project block ─────────────────────────────────────────
const ParallaxProjectBlock = ({ project, index, isLast }: { project: any; index: number; isLast: boolean }) => {
  const imgUrl = project.imageUrl || '';

  return (
    // Large top padding before each project to separate projects from each other
    <div className={`pt-20 md:pt-28 ${!isLast ? 'mb-20 md:mb-32' : ''}`}>
      {/* Centered Title ABOVE image */}
      <div
        style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
        className="mb-6 md:mb-8"
      >
        <ProjectTitle title={project.title} index={index} />
      </div>

      {/* Image block — scales and expands/shrinks on scroll */}
      <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
        <AnimatedImage imgUrl={imgUrl} title={project.title} />
      </div>

      {/* Project details immediately below — tight gap */}
      <div className="bg-[#0a0a0a]">
        <ProjectDetails project={project} />
        {/* Thin divider only between projects, not at end */}
        {!isLast && (
          <div className="max-w-5xl mx-auto px-6">
            <div className="border-t border-zinc-800/60" />
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Mobile card ──────────────────────────────────────────────────────────────
const MobileProjectCard = ({ project, index }: { project: any; index: number }) => {
  const imgUrl = project.imageUrl || '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)" }}
      className="relative z-0 w-full flex flex-col overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 backdrop-blur-md"
    >
      {/* Liquid Glass Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-[2rem] border border-yellow-400/20 pointer-events-none shadow-[inset_0_0_30px_rgba(250,204,21,0.05)]" />

      {/* Image Header */}
      <div className="w-full aspect-[4/3] relative z-10 border-b border-zinc-800 overflow-hidden bg-black">
        {imgUrl ? (
          <img src={imgUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-700">
            <span className="text-5xl mb-4 opacity-30">🖼️</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col gap-4 p-6 bg-[#0a0a0a]/60 backdrop-blur-md">
        <div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-yellow-400 uppercase mb-2">
            Project {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="text-2xl font-black text-white">{project.title}</h3>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project?.tech?.map((t: string, i: number) => (
            <span key={i} className="px-2.5 py-1 text-[10px] font-bold text-yellow-400 bg-zinc-900 rounded-full border border-yellow-400/20">
              {t}
            </span>
          ))}
        </div>

        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full mt-2">
            <StardustButton className="flex w-full justify-center items-center gap-2 uppercase tracking-widest font-bold text-sm py-3">
              Live Demo <FiArrowUpRight className="text-lg" />
            </StardustButton>
          </a>
        ) : (
          <div className="inline-block w-full opacity-60 cursor-not-allowed mt-2">
            <StardustButton className="flex w-full justify-center items-center gap-2 uppercase tracking-widest font-bold text-sm py-3 bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-400 pointer-events-none">
              Coming Soon <FiArrowUpRight className="text-lg" />
            </StardustButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function FeaturedProjects() {
  const projects = PROJECTS.filter(p => p.visible);

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white border-t border-zinc-900/50">
      <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Section header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-24 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400 text-sm font-bold tracking-[0.4em] uppercase mb-4"
        >
          Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none"
        >
          {SITE_CONTENT.featuredTitle}{' '}
          <span className="text-yellow-400">Work</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto"
        >
          {SITE_CONTENT.featuredSubtitle}
        </motion.p>
      </div>

      {/* Desktop parallax */}
      <div className="hidden md:block">
        {projects.map((project, index) => (
          <ParallaxProjectBlock
            key={project._id}
            project={project}
            index={index}
            isLast={index === projects.length - 1}
          />
        ))}
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden flex flex-col gap-12 px-4 pb-16 pt-8">
        {projects.map((project, index) => (
          <MobileProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
