import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School } from 'lucide-react';
import { apiClient } from '../api';

export function ExperienceTimeline() {
  const [education, setEducation] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      apiClient.getEducation(),
      apiClient.getContent()
    ]).then(([eduData, contentData]) => {
      setEducation(eduData);
      setContent(contentData);
    }).catch(console.error);
  }, []);

  if (education.length === 0) return null;

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900/50">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[60rem] bg-yellow-500/5 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-light tracking-wide text-white">
            {content?.timelineTitle || 'My Journey'}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-xl font-light tracking-wide">
            {content?.timelineSubtitle || 'A timeline of my academic background and educational milestones.'}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-yellow-400/80 via-yellow-400/20 to-transparent transform md:-translate-x-1/2" />

        {education.map((item, index) => {
          const isLeft = index % 2 === 0;
          // Determine icon based on index or title (simple fallback logic)
          const Icon = index === 0 ? GraduationCap : index === 1 ? BookOpen : School;

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative w-full flex flex-col md:flex-row justify-between items-center mb-16 ${
                isLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Center Dot with Icon */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#0a0a0a] border-[3px] border-yellow-400 rounded-full z-20 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                <Icon size={20} className="text-yellow-400" />
              </div>

              {/* Content Card Wrapper - Forces half width on desktop */}
              <div className="w-full pl-20 md:pl-0 md:w-5/12" />

              <div className="w-full pl-20 md:pl-0 md:w-5/12 flex justify-start">
                <div 
                  style={{
                    boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.192), inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164)"
                  }}
                  className="w-full bg-zinc-900/20 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-zinc-800 hover:bg-zinc-800/30 transition-colors duration-500 relative overflow-hidden group"
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col">
                    <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {item.degree}
                    </h3>
                    <h4 className="text-lg text-zinc-300 font-medium mb-4">
                      {item.institution}
                    </h4>
                    
                    <div className="mb-4 flex gap-3">
                      {item.percentage && (
                        <span 
                          style={{ boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.15), inset 0 0 3px rgba(255, 255, 255, 0.2)" }}
                          className="inline-block px-4 py-1.5 bg-zinc-800/50 text-yellow-400 rounded-full text-sm font-semibold tracking-wider"
                        >
                          {item.percentage}
                        </span>
                      )}
                      <span className="inline-block px-4 py-1.5 bg-zinc-800/50 text-zinc-400 rounded-full text-sm font-semibold tracking-wider border border-zinc-700">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
