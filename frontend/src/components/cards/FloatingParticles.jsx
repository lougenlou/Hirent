import { motion } from "framer-motion";

export function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    driftX: Math.random() * 30 - 15,
    driftY: Math.random() * 30 - 10,
    duration: Math.random() * 20 + 12,
    delay: Math.random() * 5,
    depth: Math.random(), // 0–1 depth factor
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-lg"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background:
              p.depth > 0.5
                ? "radial-gradient(circle, rgba(236,72,153,0.5), rgba(147,51,234,0.2))"
                : "radial-gradient(circle, rgba(236,72,153,0.25), rgba(147,51,234,0.15))",
            filter: `blur(${p.depth > 0.6 ? 8 : 4}px)`,
          }}
          animate={{
            y: [0, -p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.2, 0.5 * p.depth, 0.2],
            scale: [1, 1.1 + p.depth * 0.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
