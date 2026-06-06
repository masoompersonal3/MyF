// @ts-nocheck
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StardustButton } from './ui/stardust-button';
import { apiClient } from '../api';

export function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      apiClient.getProjects(),
      apiClient.getContent()
    ]).then(([projData, contentData]) => {
      setProjects(projData);
      setContent(contentData);
    }).catch(console.error);
  }, []);

  const handleNext = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <section className="relative w-full bg-[#0a0a0a] text-white py-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50 min-h-screen flex flex-col justify-center">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center mb-12 lg:mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-light tracking-wide text-white">
            {content?.featuredTitle || 'Featured Work'}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-xl font-light tracking-wide">
            {content?.featuredSubtitle || 'A selection of my recent full-stack applications and functional frontends.'}
          </p>
          <div className="mt-12 flex justify-center items-center h-64 w-full max-w-4xl bg-zinc-900/20 backdrop-blur-md rounded-[30px] border border-zinc-800">
            <h3 className="text-2xl text-zinc-500 font-bold uppercase tracking-widest">Projects Coming Soon</h3>
          </div>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentIndex];

  const getImageUrl = (p: any) => {
    if (p.imageData) return `data:${p.imageMimeType};base64,${p.imageData}`;
    return p.imageUrl || '';
  };
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50 min-h-screen flex flex-col justify-center">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Header (Pulled Higher) */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center mb-12 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-light tracking-wide text-white">
            Featured <span className="font-bold text-yellow-400">Work</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-xl font-light tracking-wide">
            A selection of my recent full-stack applications and functional frontends.
          </p>
        </motion.div>
      </div>

      {/* Desktop: Auto-Playing Horizontal Carousel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden md:flex flex-col items-center justify-center min-h-[60vh]">
        
        {/* Left Navigation Button */}
        <button 
          onClick={handlePrev} 
          className="absolute left-0 lg:-left-4 z-30 p-3 md:p-4 bg-zinc-900/80 border border-zinc-700 hover:bg-yellow-400 text-white hover:text-black rounded-full transition-all backdrop-blur-md shadow-2xl"
          aria-label="Previous project"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right Navigation Button */}
        <button 
          onClick={handleNext} 
          className="absolute right-0 lg:-right-4 z-30 p-3 md:p-4 bg-zinc-900/80 border border-zinc-700 hover:bg-yellow-400 text-white hover:text-black rounded-full transition-all backdrop-blur-md shadow-2xl"
          aria-label="Next project"
        >
          <ChevronRight size={32} />
        </button>

        {/* Carousel Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-12 lg:px-20 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: "100%", opacity: 1, scale: 1 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "-100%", opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)"
              }}
              className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 bg-zinc-900/20 backdrop-blur-md rounded-[30px] p-6 md:p-12 lg:p-16 transition-all duration-500 hover:bg-[rgba(173,173,173,0.05)]"
            >
              {/* Project Details */}
              <div className="flex-1 w-full max-w-xl">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
                      {currentProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject?.tech?.map((t: string, i: number) => (
                      <span 
                        key={i} 
                        style={{ boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.15), inset 0 0 3px rgba(255, 255, 255, 0.2)" }}
                        className="px-3 py-1.5 text-xs font-semibold tracking-wide bg-zinc-800/40 text-yellow-400 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons - stack on mobile, side by side on desktop */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-44">
                      <StardustButton className="uppercase w-full">
                        Live Demo
                      </StardustButton>
                    </a>
                    <a 
                      href={currentProject.github} 
                      style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)" }}
                      className="w-full sm:w-44 flex items-center justify-center text-[14px] font-bold text-white bg-zinc-800/40 py-[12px] rounded-full hover:bg-zinc-700/60 transition-colors uppercase tracking-wider"
                    >
                      Source Code
                    </a>
                  </div>
              </div>
              
              {/* Project Image - hidden on mobile */}
              <div 
                style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)" }}
                className="hidden lg:flex flex-1 w-full max-w-2xl aspect-[4/3] relative rounded-[2rem] overflow-hidden p-2 bg-zinc-900/20 items-center justify-center"
              >
                  {(currentProject.imageData || currentProject.imageUrl) ? (
                    <img 
                        src={getImageUrl(currentProject)} 
                        className="w-full h-full object-cover rounded-[1.5rem] transform hover:scale-105 transition-transform duration-700" 
                        alt={currentProject.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800/50 rounded-[1.5rem] flex flex-col items-center justify-center text-zinc-500 font-medium">
                      <span className="text-4xl mb-2 opacity-50">🖼️</span>
                      <span>No image provided</span>
                    </div>
                  )}
                  {/* Ambient inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent pointer-events-none rounded-[2rem]" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Dots */}
        {projects.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-yellow-400 w-10" : "bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile: Stacked List */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex md:hidden flex-col gap-12 px-2 py-4">
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)"
            }}
            className="w-full flex flex-col items-center justify-center gap-8 bg-zinc-900/20 backdrop-blur-md rounded-[30px] p-6 transition-all duration-500"
          >
            {/* Project Image - visible on mobile now */}
            {(project.imageData || project.imageUrl) && (
              <div 
                style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)" }}
                className="w-full aspect-[4/3] relative rounded-[2rem] overflow-hidden p-2 bg-zinc-900/20"
              >
                  <img 
                      src={getImageUrl(project)} 
                      className="w-full h-full object-cover rounded-[1.5rem]" 
                      alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent pointer-events-none rounded-[2rem]" />
              </div>
            )}
            
            {/* Project Details */}
            <div className="w-full">
                <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-300 text-base leading-relaxed mb-6 font-medium">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project?.tech?.map((t: string, i: number) => (
                    <span 
                      key={i} 
                      style={{ boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.15), inset 0 0 3px rgba(255, 255, 255, 0.2)" }}
                      className="px-3 py-1.5 text-xs font-semibold tracking-wide bg-zinc-800/40 text-yellow-400 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <StardustButton className="uppercase w-full">
                      Live Demo
                    </StardustButton>
                  </a>
                  <a 
                    href={project.github} 
                    style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)" }}
                    className="w-full flex items-center justify-center text-[14px] font-bold text-white bg-zinc-800/40 py-[12px] rounded-full hover:bg-zinc-700/60 transition-colors uppercase tracking-wider"
                  >
                    Source Code
                  </a>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
