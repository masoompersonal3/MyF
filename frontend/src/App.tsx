import { useState } from 'react';
import { MinimalistHero } from './components/ui/minimalist-hero';
import { TextType } from './components/ui/text-type';
import RotatingText from './components/ui/rotating-text';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { CosmicParallaxBg } from './components/ui/cosmic-parallax-bg';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';
import { CinematicFooter } from './components/CinematicFooter';
import { LoadingScreen } from './components/LoadingScreen';
import { MobilePopup } from './components/MobilePopup';
import { SITE_CONTENT } from './data';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const content = SITE_CONTENT;

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Mobile Popup */}
      <MobilePopup />

      {/* Main site - render always but hidden until loaded */}
      <div className={`flex flex-col bg-background w-full min-h-screen relative overflow-hidden transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fixed Starry Background Effect for the entire site */}
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <CosmicParallaxBg head="" text="" hideEarth={true} />
        </div>

        {/* Hero Earth Element (Scrolls with the page) */}
        <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <div id="horizon">
            <div className="glow"></div>
          </div>
          <div id="earth"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col" id="about">
          <MinimalistHero
            logoText="MASOOM."
            navLinks={navLinks}
            overlayText={{
              part1: 'I am',
              part2: content?.heroTexts?.length > 0 ? (
                <RotatingText
                  texts={content.heroTexts}
                  mainClassName="text-yellow-400 overflow-hidden justify-center"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                  splitBy="characters"
                  auto
                  loop={content.heroTexts.length > 1}
                />
              ) : <span>...</span>,
            }}
          />
          
          {/* Scroll Animation Section positioned just below the hero title */}
          <div id="work" className="relative w-full z-20 -mt-32 md:-mt-[18rem]">
            <ContainerScroll titleComponent={null}>
              <div className="flex flex-col h-full p-6 md:p-12 lg:p-16 bg-transparent">
                {content?.aboutContent && (
                  <TextType
                    text={content.aboutContent}
                    typingSpeed={20}
                    className="text-sm md:text-lg lg:text-xl text-left leading-relaxed text-black font-medium font-sans tracking-wide whitespace-pre-wrap"
                    cursorBlinkDuration={0.8}
                    loop={false}
                    startOnVisible={true}
                  />
                )}
              </div>
            </ContainerScroll>
          </div>

          {/* Next Section: Featured Projects */}
          <div id="projects" className="relative z-40 bg-[#0a0a0a] pt-10 -mt-72 md:pt-10 md:-mt-64">
            <FeaturedProjects />
          </div>

          {/* Next Section: Experience Timeline */}
          <div id="education" className="relative z-40">
            <ExperienceTimeline />
          </div>

          {/* Next Section: Tools */}
          <div className="relative z-30 bg-transparent">
            <ToolsSection />
          </div>

          {/* Contact Section Group - Pulled up to overlap behind the transparent corners of the Tools curve */}
          <div id="contact" className="relative z-20 w-full -mt-[46vw]">
            {/* Starry Background for the entire Contact area */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <CosmicParallaxBg head="" text="" hideEarth={true} />
            </div>

            {/* The actual Contact Form - pushed down so it doesn't overlap the tools visually */}
            <div className="relative z-10 pt-[46vw]">
              <ContactSection />
            </div>
          </div>
        </div>

        <CinematicFooter />
      </div>
    </>
  );
};

export default App;
