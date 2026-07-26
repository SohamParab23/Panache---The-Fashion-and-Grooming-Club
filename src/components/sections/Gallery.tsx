"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/config/siteData";

const CATEGORIES = ["All", "Fashion Shows", "Photoshoots", "Events", "Behind the Scenes", "Team"];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-40 bg-background relative border-t border-border/30">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 relative">
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-40">
              <h2 className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-accent inline-block" />
                The Archive
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-12">
                Curated Works
              </h3>
              
              <div className="flex flex-col items-start gap-4">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative ${
                      activeCategory === category 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground/70"
                    }`}
                  >
                    {activeCategory === category && (
                      <motion.span
                        layoutId="activeFilter"
                        className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-accent"
                      />
                    )}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Staggered Grid */}
          <div className="lg:col-span-8 lg:col-start-5">
            <motion.div layout className="columns-1 md:columns-2 gap-6 space-y-6">
              <AnimatePresence>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer overflow-hidden break-inside-avoid"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-auto object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-foreground p-2 mix-blend-difference z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              src={selectedImage}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
