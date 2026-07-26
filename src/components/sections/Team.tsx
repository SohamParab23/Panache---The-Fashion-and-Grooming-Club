"use client";

import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/config/siteData";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Team() {
  // Editorial scattered positioning classes
  const getScatteredClass = (index: number) => {
    switch(index) {
      case 0: return "md:col-span-5 md:col-start-1 mt-0";
      case 1: return "md:col-span-4 md:col-start-8 md:mt-32";
      case 2: return "md:col-span-4 md:col-start-2 md:mt-16";
      case 3: return "md:col-span-5 md:col-start-7 md:-mt-16";
      default: return "md:col-span-4";
    }
  };

  // New layout: predictable two-column grid on desktop, stacked on mobile.
  // We keep the same animations but remove absolute / negative offsets.

  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:pl-[5%]"
        >
          <h2 className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-accent inline-block" />
            The Visionaries
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] max-w-2xl">
            Meet the minds behind PANACHE.
          </h3>
        </motion.div>
      </div>

      {/* Full-bleed rotating horizontal photo strip */}
      <div className="w-full overflow-hidden relative select-none py-4">
          <motion.div
            className="flex flex-nowrap gap-6 md:gap-8 items-stretch w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 55,
            }}
          >
            {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="w-[210px] sm:w-[240px] md:w-[260px] flex-shrink-0 group flex flex-col gap-3"
              >
                <div className="w-full h-[310px] sm:h-[350px] md:h-[380px] overflow-hidden relative rounded-xl border border-accent/20 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-lg sm:text-xl font-serif text-foreground leading-tight drop-shadow-md">
                        {member.name}
                      </h4>
                      <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-bold">
                        {member.role}
                      </p>
                    </div>
                    <a
                      href={member.instagram && member.instagram !== "#" ? member.instagram : "https://instagram.com/panache_mitacsc"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full text-accent hover:text-foreground transition-all duration-300 border border-accent/40 bg-background/60 hover:border-foreground p-2 backdrop-blur-md"
                      aria-label={`Open ${member.name} Instagram profile`}
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
    </section>
  );
}
