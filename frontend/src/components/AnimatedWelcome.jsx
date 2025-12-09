import React from "react";
import { motion } from "framer-motion";

const AnimatedWelcome = ({ name }) => {
  const welcomeText = "Welcome,  ";
  const wave = "👋";

  const letterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const waveVariants = {
    initial: { rotate: 0 },
    animate: { rotate: [0, 20, -20, 10, -10, 0] },
  };

  // Split name into words for proper spacing
  const words = name.split(" "); // ["John", "Doe"]

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

      {/* Animate user name with proper spaces */}
      <span className="text-[#7A1CA9] font-bold ml-1.5">
        {words.map((word, wIdx) => (
          <React.Fragment key={`word-${wIdx}`}>
            {word.split("").map((char, i) => (
              <motion.span
                key={`char-${wIdx}-${i}`}
                style={{ display: "inline-block" }}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                transition={{
                  delay: (i + wIdx * 5 + welcomeText.length) * 0.05,
                  duration: 0.3,
                }}
              >
                {char}
              </motion.span>
            ))}
            {/* Add space between words */}
            {wIdx < words.length - 1 && " "}
          </React.Fragment>
        ))}

        {/* Wave emoji */}
        <motion.span
          style={{ display: "inline-block", marginLeft: "0.2rem" }}
          variants={waveVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: (name.length + welcomeText.length) * 0.05,
            duration: 0.3,
          }}
        >
          {wave}
        </motion.span>
      </span>
    </h1>
  );
};

export default AnimatedWelcome;
