"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/config/siteData";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicated team array for infinite marquee looping
  const doubleTeam = [...TEAM_MEMBERS, ...TEAM_MEMBERS];

  // Pause auto-scroll temporarily during manual user interaction and set auto-resume timer
  const pauseAutoScrollTemporarily = useCallback((delayMs: number = 3000) => {
    setIsInteracting(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, delayMs);
  }, []);

  // ONE authoritative requestAnimationFrame auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const autoScrollLoop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const el = scrollRef.current;
      // Auto-scroll runs continuously when user is NOT actively dragging, clicking or hovering
      if (el && !isInteracting && !isMouseDown && !isHovered) {
        const speed = (50 * delta) / 1000; // ~50px/sec continuous smooth linear movement
        el.scrollLeft += speed;

        // Seamless infinite wrap around
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft -= maxScroll;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += maxScroll;
        }
      }

      animationFrameId = requestAnimationFrame(autoScrollLoop);
    };

    animationFrameId = requestAnimationFrame(autoScrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isInteracting, isMouseDown]);

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    pauseAutoScrollTemporarily(3000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    pauseAutoScrollTemporarily(3000);
  };

  const handleMouseUpOrLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      pauseAutoScrollTemporarily(3000);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    pauseAutoScrollTemporarily(3000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    pauseAutoScrollTemporarily(3000);
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
    pauseAutoScrollTemporarily(3000);
  };

  // Trackpad / Mouse Wheel Horizontal Scroll Handler
  const handleWheel = () => {
    pauseAutoScrollTemporarily(3000);
  };

  // Navigation Arrow Click Handlers
  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    pauseAutoScrollTemporarily(3000);
    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth"
    });
  };

  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:pl-[5%]"
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

      {/* Main Carousel Container */}
      <div 
        className="w-full relative select-none py-4 group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
          pauseAutoScrollTemporarily(2000);
        }}
      >
        {/* Left Circular Navigation Button */}
        <button
          onClick={() => scrollByAmount(-320)}
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-accent/40 bg-background/80 hover:bg-accent hover:text-background text-accent backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Previous profile"
          title="Previous profile"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Circular Navigation Button */}
        <button
          onClick={() => scrollByAmount(320)}
          className="absolute right-3 md:left-auto md:right-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-accent/40 bg-background/80 hover:bg-accent hover:text-background text-accent backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Next profile"
          title="Next profile"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Full-bleed Horizontal Photo Strip */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`flex flex-nowrap gap-6 md:gap-8 items-stretch overflow-x-auto no-scrollbar px-6 md:px-12 py-2 ${
            isMouseDown ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none"
          }}
        >
          {doubleTeam.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="w-[210px] sm:w-[240px] md:w-[260px] flex-shrink-0 group flex flex-col gap-3"
            >
              <div className="w-full h-[310px] sm:h-[350px] md:h-[380px] overflow-hidden relative rounded-xl border border-accent/20 shadow-xl bg-card">
                <div
                  className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  style={member.imageStyle}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div className="flex flex-col gap-0.5 pointer-events-none">
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
                    onClick={(e) => {
                      if (hasDragged) {
                        e.preventDefault();
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-full text-accent hover:text-foreground transition-all duration-300 border border-accent/40 bg-background/60 hover:border-foreground p-2 backdrop-blur-md relative z-20"
                    aria-label={`Open ${member.name} Instagram profile`}
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
