"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

interface PhotoWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export function PhotoWithFallback({ src, fallbackSrc, ...props }: PhotoWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
