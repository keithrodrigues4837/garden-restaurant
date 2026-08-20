import Link from "next/link";
import Image from "next/image";
import { restaurant } from "@/lib/restaurant-info";
import MenuOptionsButton from "./MenuOptionsButton";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo.png"
            alt={restaurant.name}
            width={1088}
            height={485}
            unoptimized
            className="h-20 w-auto"
          />
          <p className="mt-3 text-sm">{restaurant.tagline}</p>
        </div>

        <div className="text-sm">
          <h3 className="mb-2 font-semibold text-cream">Hours</h3>
          <p>{restaurant.hoursShort}</p>
          <h3 className="mt-4 mb-2 font-semibold text-cream">Contact</h3>
          <p>
            <a href={`tel:${restaurant.phone.replace(/\D/g, "")}`} className="hover:text-gold">
              {restaurant.phone}
            </a>
            {restaurant.phoneIsPlaceholder && " (placeholder)"}
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-2 font-semibold text-cream">Location</h3>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition hover:text-gold"
          >
            <p>{restaurant.address.line1}</p>
            <p>{restaurant.address.line2}</p>
          </a>
          <MenuOptionsButton
            align="left"
            className="mt-4 block font-semibold text-gold hover:text-gold-dark"
          >
            View Menu &rarr;
          </MenuOptionsButton>
          <Link href="/reserve" className="mt-2 block font-semibold text-gold hover:text-gold-dark">
            Reserve a Table &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </div>
    </footer>
  );
}
