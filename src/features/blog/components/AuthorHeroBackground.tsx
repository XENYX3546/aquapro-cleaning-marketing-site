'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type RGB = { r: number; g: number; b: number };

// Context to share extracted color with child components
const ColorContext = createContext<RGB | null>(null);

export function useExtractedColor() {
  return useContext(ColorContext);
}

/**
 * Extracts the dominant color from an image URL using canvas sampling.
 */
async function extractDominantColor(imageUrl: string): Promise<RGB | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        const size = 50;
        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const { data } = imageData;

        let r = 0, g = 0, b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 16) {
          // Skip near-white pixels
          if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
            continue;
          }
          // Skip near-black pixels
          if (data[i] < 15 && data[i + 1] < 15 && data[i + 2] < 15) {
            continue;
          }

          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        if (count === 0) {
          resolve(null);
          return;
        }

        resolve({
          r: Math.round(r / count),
          g: Math.round(g / count),
          b: Math.round(b / count),
        });
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
}

function enhanceColor(color: RGB): RGB {
  const max = Math.max(color.r, color.g, color.b);
  const min = Math.min(color.r, color.g, color.b);
  const mid = (max + min) / 2;
  const factor = 1.3;
  return {
    r: Math.min(255, Math.round(mid + (color.r - mid) * factor)),
    g: Math.min(255, Math.round(mid + (color.g - mid) * factor)),
    b: Math.min(255, Math.round(mid + (color.b - mid) * factor)),
  };
}

type AuthorHeroBackgroundProps = {
  avatarUrl: string | null;
  children: React.ReactNode;
};

export function AuthorHeroBackground({ avatarUrl, children }: AuthorHeroBackgroundProps) {
  const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});
  const [extractedColor, setExtractedColor] = useState<RGB | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!avatarUrl) {
      setIsLoaded(true);
      return;
    }

    extractDominantColor(avatarUrl).then((color) => {
      if (color) {
        const enhanced = enhanceColor(color);
        setExtractedColor(enhanced);
        setGradientStyle({
          background: `linear-gradient(135deg,
            rgba(${enhanced.r}, ${enhanced.g}, ${enhanced.b}, 0.15) 0%,
            rgba(${enhanced.r}, ${enhanced.g}, ${enhanced.b}, 0.05) 50%,
            rgba(255, 255, 255, 1) 100%)`,
        });
      }
      setIsLoaded(true);
    });
  }, [avatarUrl]);

  return (
    <ColorContext.Provider value={extractedColor}>
      <section
        className={`relative pt-6 pb-8 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={
          Object.keys(gradientStyle).length > 0
            ? gradientStyle
            : { background: 'linear-gradient(to bottom, rgb(239 246 255 / 0.5), white)' }
        }
      >
        {children}
      </section>
    </ColorContext.Provider>
  );
}

/**
 * Avatar with dynamic ring color matching extracted color
 */
export function DynamicAvatar({
  src,
  alt,
  size = 144,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const color = useExtractedColor();
  const ringStyle = color
    ? { boxShadow: `0 0 0 4px rgba(${color.r}, ${color.g}, ${color.b}, 0.3), 0 10px 25px -5px rgba(0,0,0,0.1)` }
    : {};

  return (
    <div
      className="relative rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-xl"
      style={{ width: size, height: size, ...ringStyle }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
