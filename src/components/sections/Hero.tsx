"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_DATA } from "@/config/siteData";

const heroImages = [
  {
    src: "/hero1.jpg",
    desktopPosition: "center center",
    mobilePosition: "center center",
  },
  {
    src: "/hero2.jpg",
    desktopPosition: "center center",
    mobilePosition: "52% 35%",
  },
  {
    src: "/hero3.jpg",
    desktopPosition: "center 10%",
    mobilePosition: "center 15%",
  },
  {
    src: "/hero4.jpg",
    desktopPosition: "center 60%",
    mobilePosition: "center 65%",
  },
  {
    src: "/hero5.jpg",
    desktopPosition: "center 18%",
    mobilePosition: "center 15%",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let intervalId: number | undefined;
    if (heroImages.length > 1) {
      intervalId = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      }, 5500);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden select-none">

      {/* ── HIGH-QUALITY ORIGINAL BACKGROUND SLIDES (PRELOADED CROSSFADE) ── */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <motion.div
            key={img.src}
            initial={false}
            animate={{ opacity: currentIndex === idx ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <img
              src={img.src}
              alt="PANACHE Fashion & Grooming Club"
              loading="eager"
              decoding="sync"
              fetchPriority={idx === 0 ? "high" : "auto"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: isMobile ? img.mobilePosition : img.desktopPosition,
              }}
              className="w-full h-full object-cover block"
            />
          </motion.div>
        ))}
      </div>

      {/* ── SUBTLE OVERLAY FOR READABILITY WITHOUT DEGRADING IMAGE ─────── */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/25 via-black/10 to-black/35" />

      {/* ── CENTERED EDITORIAL TEXT ──────────────────────────────────────── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 sm:pt-8 md:pt-16 lg:pt-20">

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif font-bold text-white tracking-tighter leading-none select-none
                     text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw]"
        >
          {SITE_DATA.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="mt-6 text-white/75 font-sans tracking-[0.35em] uppercase
                     text-[10px] sm:text-xs md:text-sm"
        >
          Fashion.&nbsp;&nbsp;Confidence.&nbsp;&nbsp;Expression.
        </motion.p>

      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-white/25"
        />
      </motion.div>

      {/* ── BOTTOM-LEFT LABEL ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-6 z-20 hidden md:flex items-center gap-3"
      >
        <span className="w-6 h-px bg-white/25" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">
          MIT Arts, Commerce &amp; Science College · Pune
        </span>
      </motion.div>

    </section>
  );
}
