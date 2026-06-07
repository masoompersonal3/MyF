// @ts-nocheck
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  
  // Add a buttery spring physics wrapper to smooth out jerky mouse wheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Map to [0, 0.6] instead of [0, 1] so the effect completes significantly faster
  const rotate = useTransform(smoothProgress, [0, 0.6], [20, 0]);
  const scale = useTransform(smoothProgress, [0, 0.6], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  translate
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)",
      }}
      className="max-w-6xl -mt-12 mx-auto h-[30rem] md:h-[45rem] w-full p-2 md:p-6 bg-zinc-900/20 backdrop-blur-md rounded-[30px] transition-all duration-500 hover:bg-[rgba(173,173,173,0.05)]"
    >
      <div className="relative h-full w-full overflow-y-auto overflow-x-hidden rounded-2xl bg-white md:rounded-2xl md:p-4 flex items-start justify-center pt-8">
        {/* Soft Yellow Glow Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, #FFF991 0%, transparent 70%)`,
            opacity: 0.6,
            mixBlendMode: "multiply",
          }}
        />
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
