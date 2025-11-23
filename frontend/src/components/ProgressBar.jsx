import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/Onboarding.css";

const ProgressBar = ({ step, total = 4 }) => {
  return (
    <div className="progress-bar mb-6 flex gap-3 justify-center">
      {[...Array(total)].map((_, index) => {
        const num = index + 1;
        const isActive = num === step;
        const isCompleted = num < step;

        return (
          <motion.div
            key={num}
            className={`progress-step ${isActive ? "active" : ""} ${
              isCompleted ? "completed" : ""
            }`}
            layout
            animate={{
              scale: isActive ? 1.2 : 1,
              boxShadow: isActive
                ? "0 0 15px rgba(122, 28, 169, 0.5)"
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{
              scale: { duration: 0.2, ease: "easeOut" }, // ⚡ faster scaling
              boxShadow: { duration: 0.4, ease: "easeInOut" }, // smooth glow
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={num}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {num}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
