"use client";

import { motion } from "framer-motion";
import { STATS } from "@/config/siteData";

export function Achievements() {
  return (
    <section className="py-40 bg-foreground text-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 border-t border-background/20 pt-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="text-6xl md:text-[8vw] leading-[0.9] font-serif font-bold text-accent mb-4">
                {stat.value}{stat.suffix}
              </h4>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-background/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
