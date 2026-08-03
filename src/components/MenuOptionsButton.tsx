"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { restaurant } from "@/lib/restaurant-info";

export default function MenuOptionsButton({
  className,
  children,
  align = "left",
  onOptionSelect,
}: {
  className?: string;
  children: ReactNode;
  align?: "left" | "right" | "center";
  onOptionSelect?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignClass =
    align === "right" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

  function handleSelect() {
    setOpen(false);
    onOptionSelect?.();
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button type="button" onClick={() => setOpen((v) => !v)} className={className}>
        {children}
      </button>
      {open && (
        <div
          className={`absolute top-full ${alignClass} z-50 mt-2 w-52 overflow-hidden rounded-xl bg-cream text-forest-dark shadow-lg ring-1 ring-forest/10`}
        >
          <a
            href={restaurant.menuPdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSelect}
            className="block px-4 py-3 text-sm font-medium transition hover:bg-sage-light/60"
          >
            View in Browser
          </a>
          <a
            href={restaurant.menuPdf}
            download={restaurant.menuPdfDownloadName}
            onClick={handleSelect}
            className="block border-t border-forest/10 px-4 py-3 text-sm font-medium transition hover:bg-sage-light/60"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
