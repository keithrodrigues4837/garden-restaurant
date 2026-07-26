import Link from "next/link";
import Image from "next/image";
import { restaurant } from "@/lib/restaurant-info";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-lg bg-white/95 px-2 py-1.5">
            <Image
              src="/logo-cropped.png"
              alt={restaurant.name}
              width={798}
              height={436}
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-3 text-sm">{restaurant.tagline}</p>
        </div>

        <div className="text-sm">
          <h3 className="mb-2 font-semibold text-cream">Hours</h3>
          <p>{restaurant.hoursShort}</p>
          <h3 className="mt-4 mb-2 font-semibold text-cream">Contact</h3>
          <p>{restaurant.phone}{restaurant.phoneIsPlaceholder && " (placeholder)"}</p>
        </div>

        <div className="text-sm">
          <h3 className="mb-2 font-semibold text-cream">Location</h3>
          <p>{restaurant.address.line1}</p>
          <p>{restaurant.address.line2}</p>
          <Link href="/menu" className="mt-4 inline-block font-semibold text-gold hover:text-gold-dark">
            Order for Pickup &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </div>
    </footer>
  );
}
