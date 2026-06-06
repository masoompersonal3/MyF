import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[9999] px-4"
          >
            <div 
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 overflow-hidden relative"
              style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)' }}
            >
              {/* Inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h3>
                <p className="text-zinc-300 mb-8 leading-relaxed">
                  {message}
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-full font-medium tracking-wide text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                    }}
                    className="px-6 py-2.5 rounded-full font-bold tracking-wide text-black bg-red-500 hover:bg-red-400 transition-colors shadow-lg shadow-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
