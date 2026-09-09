"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE_DATA } from "@/config/siteData";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Gallery", href: "#gallery" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={SITE_DATA.logo}
            alt="PANACHE Logo"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-serif tracking-widest font-bold text-foreground group-hover:text-accent transition-colors duration-300">
            {SITE_DATA.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href={SITE_DATA.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 uppercase tracking-widest text-xs"
          >
            Join Us
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-6 text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={SITE_DATA.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-8 py-3 bg-accent text-accent-foreground uppercase tracking-widest text-sm font-bold"
              >
                Join PANACHE
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
