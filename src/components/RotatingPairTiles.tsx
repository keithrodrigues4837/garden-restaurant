"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTERVAL_MS = 4000;

export default function RotatingPairTiles({
  images,
  altPrefix,
}: {
  images: string[]; // exactly 4, split 2 per tile
  altPrefix: string;
}) {
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSubIndex((s) => (s + 1) % 2);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {[0, 1].map((tileIdx) => (
        <div
          key={tileIdx}
          className="relative aspect-square overflow-hidden rounded-2xl shadow-sm"
        >
          {/* Both images for this tile are mounted and eager-loaded up front so
              swaps are instant crossfades, not fresh network fetches. */}
          {[0, 1].map((subIdx) => {
            const src = images[tileIdx * 2 + subIdx];
            const isVisible = subIdx === subIndex;
            return (
              <Image
                key={src}
                src={src}
                alt={`${altPrefix} ${tileIdx * 2 + subIdx + 1}`}
                fill
                sizes="(min-width: 768px) 384px, 50vw"
                loading="eager"
                className={`object-cover transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
