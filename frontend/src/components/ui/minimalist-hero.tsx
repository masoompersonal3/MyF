import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import React from 'react';
import { StardustButton } from './stardust-button';

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
  return (
    <div className={cn('relative flex w-full flex-col items-center p-4 md:p-12 font-sans', className)}>
      {/* Header */}
      <header className="z-30 flex w-full items-center justify-between px-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-foreground"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              <StardustButton className="uppercase">
                {link.label}
              </StardustButton>
            </a>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-5 bg-foreground"></span>
        </motion.button>
      </header>

      {/* Main Content Area */}
      <div className="relative flex w-full flex-col items-center justify-center px-2 md:px-8 mt-12 md:mt-24 text-center">
        <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .hero-font { font-family: 'Bebas Neue', sans-serif; font-weight: 400; letter-spacing: 0.05em; }" }} />
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="z-20 flex flex-col items-center justify-center text-center mt-0 md:-mt-8"
        >
          <h1 className="hero-font text-5xl md:text-7xl lg:text-[9rem] text-foreground flex flex-col md:flex-row items-center justify-center md:gap-6 leading-none">
            <span>{overlayText.part1}</span>
            <span className="text-yellow-400 min-w-[320px] md:min-w-[600px] flex justify-center md:justify-start">
              {overlayText.part2}
            </span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};
