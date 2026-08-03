"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Theme = {
  name: string;
  tagline: string;
  images: string[]; // exactly 6, split 2 per tile
};

const SUB_INTERVAL_MS = 4000; // swap each tile's own image; every 2nd tick advances the theme instead

export default function ThemeTiles({ themes }: { themes: Theme[] }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      if (tick % 2 === 0) {
        setThemeIndex((t) => (t + 1) % themes.length);
        setSubIndex(0);
      } else {
        setSubIndex((s) => (s + 1) % 2);
      }
    }, SUB_INTERVAL_MS);
    return () => clearInterval(id);
  }, [themes.length]);

  const theme = themes[themeIndex];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-8">
        {[0, 1, 2].map((tileIdx) => (
          <div
            key={tileIdx}
            className={`overflow-hidden rounded-2xl bg-sage-light/60 shadow-sm ${
              tileIdx === 2
                ? "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:mx-0 sm:w-full"
                : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full">
              {/* All 24 images are mounted (and eagerly loaded) up front so
                  theme/sub-image switches are instant crossfades, not
                  fresh network fetches. */}
              {themes.map((t, tIdx) =>
                [0, 1].map((subIdx) => {
                  const src = t.images[tileIdx * 2 + subIdx];
                  const isVisible = tIdx === themeIndex && subIdx === subIndex;
                  return (
                    <Image
                      key={src}
                      src={src}
                      alt={t.name}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      loading="eager"
                      className={`object-cover transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p
          key={theme.name}
          className="font-display text-xl font-semibold text-maroon transition-opacity duration-700 sm:text-2xl"
        >
          {theme.name}
        </p>
        <p className="mt-1 text-forest/70 italic">{theme.tagline}</p>
      </div>
    </div>
  );
}
