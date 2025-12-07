import React from "react";
import { motion } from "framer-motion";

const AnimatedWelcome = () => {
  const welcomeText = "Welcome,  ";
  const name = "Genlord";
  const wave = "👋";

  const letters = [...name, wave]; // include wave as last "letter"

  const letterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const waveVariants = {
    initial: { rotate: 0 },
    animate: { rotate: [0, 20, -20, 10, -10, 0] }, // wave rotation
  };

  return (
    <h1 className="text-[28px] font-bold text-gray-900 mb-1">
      {/* Animate "Welcome, " */}
      {welcomeText.split("").map((char, i) => (
        <motion.span
          key={`welcome-${i}`}
          style={{ display: "inline-block" }}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          {char}
        </motion.span>
      ))}

      {/* Animate "Genlord 👋" */}
      <span className="text-[#7A1CA9] font-bold ml-1.5">
        {letters.map((char, i) => {
          const isWave = char === wave;
          return (
            <motion.span
              key={`name-${i}`}
              style={{
                display: "inline-block",
                marginLeft: isWave ? "0.2rem" : 0,
              }}
              variants={isWave ? waveVariants : letterVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: (i + welcomeText.length) * 0.05,
                duration: 0.3,
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
};

export default AnimatedWelcome;
