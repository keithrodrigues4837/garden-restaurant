"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { restaurant } from "@/lib/restaurant-info";
import MenuOptionsButton from "./MenuOptionsButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/reserve", label: "Reserve" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Location" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-forest text-cream shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt={restaurant.name}
            width={1088}
            height={485}
            priority
            unoptimized
            className="h-20 w-auto sm:h-24"
          />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-cream/90 transition hover:text-gold lg:text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MenuOptionsButton
          align="right"
          className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark md:inline-flex"
        >
          View Menu
        </MenuOptionsButton>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-cream/10 bg-forest px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-3 text-base font-medium text-cream/90 hover:bg-forest-dark"
            >
              {link.label}
            </Link>
          ))}
          <MenuOptionsButton
            align="left"
            onOptionSelect={() => setOpen(false)}
            className="w-full rounded px-2 py-3 text-left text-base font-medium text-cream/90 hover:bg-forest-dark"
          >
            View Menu
          </MenuOptionsButton>
        </nav>
      )}
    </header>
  );
}
