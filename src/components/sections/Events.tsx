"use client";

import { motion } from "framer-motion";
import { EVENTS } from "@/config/siteData";

export function Events() {
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
            Past Events
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
              className="group border-b border-border/30 py-8 md:py-12 relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 relative z-10">
                {/* Left Column: Location & Title */}
                <div className="flex-1 md:max-w-[320px]">
                  <span className="text-xs text-accent font-sans tracking-[0.2em] uppercase block mb-3 font-medium">
                    {event.location}
                  </span>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground/80 group-hover:text-foreground group-hover:translate-x-2 transition-all duration-500">
                    {event.title}
                  </h4>
                </div>

                {/* Center Column: Winner Photo (if present) */}
                {event.image ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="my-3 md:my-0 flex-shrink-0 self-start md:self-center"
                  >
                    <div className="w-36 sm:w-40 md:w-44 lg:w-48 aspect-[3/4] rounded-xl border border-accent/30 shadow-2xl overflow-hidden relative bg-card group/img transition-all duration-500 group-hover:border-accent/60">
                      <img
                        src={event.image}
                        alt={`${event.title} Winner`}
                        className="w-full h-full object-cover object-top grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                ) : (
                  <div className="hidden md:block flex-1" />
                )}

                {/* Right Column: Event Description */}
                <div className="flex-1 md:text-right max-w-xl md:ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
