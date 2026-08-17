"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE_DATA } from "@/config/siteData";

const heroImages = [
  {
    id: "main-hero",
    src: "/hero1.png",
    alt: "MR & MISS MIT FRESHERS 2026",
    hasOverlayText: true,
  },
  {
    id: "rules-hero",
    src: "/hero2.png",
    alt: "Cosmic Runway - Rules & Regulations",
    hasOverlayText: false,
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Continuous auto-scroll timer every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentIndex];

  return (
    <section className="relative w-full aspect-[16/9] bg-black overflow-hidden select-none">
      {/* ── BACKGROUND SLIDES (PRELOADED SMOOTH CROSSFADE) ───────────── */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={false}
            animate={{ 
              opacity: currentIndex === idx ? 1 : 0,
            }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover block"
            />
          </motion.div>
        ))}
      </div>

      {/* ── DARK GRADIENT OVERLAY FOR READABILITY ────────────────────── */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none bg-gradient-to-b ${
          currentImage.hasOverlayText 
            ? "from-black/40 via-black/20 to-black/50"
            : "from-black/40 via-transparent to-black/30"
        }`} 
      />

      {/* ── SLIDE 1 OVERLAY TEXT ──────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: currentImage.hasOverlayText ? 1 : 0,
          y: currentImage.hasOverlayText ? 0 : -15,
        }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-7xl mx-auto pt-12 sm:pt-16 md:pt-20 ${
          currentImage.hasOverlayText ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Main Title */}
        <h1
          className="select-none flex flex-col items-center justify-center max-w-6xl w-full"
          style={{ fontFamily: 'var(--font-bodoni), "Bodoni Moda", "Playfair Display", Georgia, serif' }}
        >
          {/* Line 1: MR & MISS */}
          <span className="block font-semibold uppercase tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#EBD298] to-[#C59B4D] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-[8.5vw] sm:text-[6.5vw] md:text-[5.2vw] lg:text-[4.5vw] xl:text-[4vw] leading-[1.02]">
            MR &amp; MISS
          </span>

          {/* Line 2: MIT FRESHERS 2026 */}
          <span className="block font-bold uppercase tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#E4C582] to-[#B88E3E] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-[6.8vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.4vw] xl:text-[3vw] leading-[1.08] mt-1 sm:mt-2 md:mt-3">
            MIT FRESHERS 2026
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-white/80 font-sans tracking-[0.35em] uppercase text-[9px] sm:text-xs md:text-sm">
          Fashion.&nbsp;&nbsp;Confidence.&nbsp;&nbsp;Expression.
        </p>

        {/* Participate Now Button */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <a
            href={SITE_DATA.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#EBD298] via-[#E4C582] to-[#B88E3E] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full shadow-[0_4px_20px_rgba(228,197,130,0.4)] hover:shadow-[0_6px_28px_rgba(228,197,130,0.6)] hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <span>Participate Now</span>
          </a>
        </div>
      </motion.div>

      {/* ── BOTTOM-LEFT LABEL ────────────────────────────────────────────── */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 hidden md:flex items-center gap-3 pointer-events-none">
        <span className="w-6 h-px bg-white/25" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">
          MIT Arts, Commerce &amp; Science College · Pune
        </span>
      </div>
    </section>
  );
}
