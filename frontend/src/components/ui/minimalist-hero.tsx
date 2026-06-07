import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import React, { useState } from 'react';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  overlayText: {
    part1: string;
    part2: React.ReactNode;
  };
  className?: string;
}

export const MinimalistHero = ({
  logoText,
  navLinks,
  overlayText,
  className,
}: MinimalistHeroProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={cn('relative flex w-full flex-col items-center p-4 md:p-12 font-sans', className)}>
      {/* Header */}
      <header className="z-50 flex w-full items-center justify-between px-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-foreground flex items-center gap-3"
        >
          <img src="/p.jpeg" alt="Logo" className="w-10 h-10 rounded-full object-cover border border-zinc-800" />
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm font-bold tracking-[0.2em] text-zinc-400 hover:text-yellow-400 transition-colors uppercase relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
        </motion.button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold tracking-widest text-white hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative flex w-full flex-col items-center justify-center px-2 md:px-8 mt-12 md:mt-24 text-center">
        <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .hero-font { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: 0.05em; }" }} />
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="z-20 flex flex-col items-center justify-center text-center mt-0 md:mt-12"
        >
          <h1 className="hero-font text-5xl md:text-7xl lg:text-[9rem] text-foreground flex flex-col md:flex-row items-center justify-center md:gap-6 leading-none">
            <span>{overlayText.part1}</span>
            <span className="text-yellow-400 min-w-[320px] md:min-w-[600px] flex justify-center md:justify-center">
              {overlayText.part2}
            </span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};
