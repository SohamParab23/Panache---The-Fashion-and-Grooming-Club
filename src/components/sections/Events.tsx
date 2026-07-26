"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS } from "@/config/siteData";

export function Events() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <section id="events" className="py-40 bg-background relative border-t border-border/30">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-accent inline-block" />
            The Calendar
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif text-foreground">
            Upcoming
          </h3>
        </motion.div>

        <div className="relative border-t border-border/30">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group border-b border-border/30 py-8 md:py-12 relative cursor-pointer"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground font-sans tracking-[0.2em] uppercase block mb-4">
                    {event.date}
                  </span>
                  <h4 className="text-3xl md:text-5xl font-serif text-foreground/80 group-hover:text-foreground group-hover:translate-x-4 transition-all duration-500">
                    {event.title}
                  </h4>
                </div>
                <div className="flex-1 md:text-right max-w-md ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Hover Image Reveal */}
              <AnimatePresence>
                {hoveredEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, clipPath: "inset(100% 0 0 0)" }}
                    animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
                    exit={{ opacity: 0, scale: 0.95, clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute right-0 md:right-[20%] top-1/2 -translate-y-1/2 w-64 md:w-96 aspect-video z-0 pointer-events-none hidden md:block"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale-[0.3]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
