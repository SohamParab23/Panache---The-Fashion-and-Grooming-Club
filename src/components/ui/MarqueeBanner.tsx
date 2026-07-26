"use client";

import { motion } from "framer-motion";

interface MarqueeBannerProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "PANACHE 2026 - FASHION AND GROOMING CLUB",
  "LOOKBOOK",
  "MIT Arts, Commerce & Science College",
];

export function MarqueeBanner({
  items = DEFAULT_ITEMS,
  speed = 40,
  className = "",
}: MarqueeBannerProps) {
  // Duplicate items array to ensure seamless looping
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden py-4 border-y border-accent/20 bg-background/80 backdrop-blur-sm select-none ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-16 md:gap-24 flex-shrink-0">
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-accent/90 hover:text-accent transition-colors">
              {item}
            </span>
            <span className="text-accent/40 text-xs select-none">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
