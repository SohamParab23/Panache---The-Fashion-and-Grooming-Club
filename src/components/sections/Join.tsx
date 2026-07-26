"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/config/siteData";

export function Join() {
  return (
    <section className="py-16 md:py-20 bg-accent text-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col items-center justify-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-background inline-block" />
              Join the Movement
              <span className="w-8 h-px bg-background inline-block" />
            </h2>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight mb-8 leading-tight">
              Be Part of<br/>The Legacy
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <a
              href={SITE_DATA.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-background px-8 py-3.5 hover:bg-background hover:text-accent transition-colors duration-500 group"
            >
              <span className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase font-bold flex items-center gap-3 group-hover:scale-105 transition-transform duration-500">
                Apply Now
                <span className="text-lg">→</span>
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
