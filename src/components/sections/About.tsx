"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/config/siteData";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";

export function About() {
  return (
    <section id="about" className="pt-0 pb-16 bg-background relative overflow-hidden">
      {/* Rotating Marquee Line between Hero and Text */}
      <MarqueeBanner className="mb-20" />

      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Quote / Mission */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 pl-6 md:pl-12 relative z-10 w-full"
        >
          <span className="text-[90px] md:text-[140px] absolute -top-[45px] md:-top-[70px] left-0 font-serif text-accent/10 leading-none select-none">
            &ldquo;
          </span>
          <h3 className="text-[1.56rem] md:text-[2.34rem] lg:text-[3.12rem] font-serif text-foreground leading-[1.2] w-full relative z-10">
            {SITE_DATA.missionStatement}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative">
          
          {/* Offset Image (Compact) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:col-span-5 md:col-start-3 relative z-0 max-w-sm mx-auto w-full"
          >
            <div className="aspect-[4/5] max-h-[340px] w-full overflow-hidden rounded-xl border border-accent/20 shadow-2xl">
              <img
                src="/images/trophies.jpg"
                alt="PANACHE Trophies and Awards"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>

          {/* Narrow Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="md:col-span-4 md:col-start-8"
          >
            <h2 className="text-[10.4px] text-accent uppercase tracking-[0.2em] font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent inline-block" />
              The Vision
            </h2>
            <p className="text-foreground/70 text-[0.91rem] leading-relaxed mb-10 text-justify">
              {SITE_DATA.description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
