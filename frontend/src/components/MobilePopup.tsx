import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor } from 'lucide-react';

export const MobilePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const dismissed = sessionStorage.getItem('mobile-popup-dismissed');
    if (isMobile && !dismissed) {
      setTimeout(() => setShow(true), 1200); // show after loading screen
    }
  }, []);

  const handleOk = () => {
    sessionStorage.setItem('mobile-popup-dismissed', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-end justify-center p-4 pb-8"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.08), inset 0 0 5px rgba(255,255,255,0.12), 0 20px 40px rgba(0,0,0,0.5)' }}
            className="w-full max-w-sm bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-[2rem] p-8 flex flex-col items-center gap-5"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
              <Monitor size={28} className="text-yellow-400" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-xl mb-2">Better on Desktop</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This portfolio is designed for a <span className="text-yellow-400 font-semibold">desktop experience</span>. For the full cinematic view, open it on a laptop or PC!
              </p>
            </div>
            <button
              onClick={handleOk}
              className="w-full py-4 rounded-full bg-yellow-400 text-black font-bold text-sm uppercase tracking-widest hover:bg-yellow-300 transition-colors"
            >
              Got it, continue anyway
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
