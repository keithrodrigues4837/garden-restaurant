import type { Metadata } from "next";
import { restaurant } from "@/lib/restaurant-info";

export const metadata: Metadata = {
  title: "Location & Hours",
};

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    restaurant.address.mapsQuery
  )}&output=embed`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">Find Us</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">Location & Hours</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-forest">Address</h2>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition hover:text-gold-dark"
            >
              <p className="mt-1 text-forest/80">{restaurant.address.line1}</p>
              <p className="text-forest/80">{restaurant.address.line2}</p>
            </a>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-forest">Hours</h2>
            <p className="mt-1 text-forest/80">{restaurant.hoursShort}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-forest">Phone</h2>
            <p className="mt-1 text-forest/80">
              {restaurant.phone}
              {restaurant.phoneIsPlaceholder && (
                <span className="ml-2 text-xs text-gold-dark">(placeholder — update me)</span>
              )}
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-forest">Seating</h2>
            <p className="mt-1 text-forest/80">
              Up to {restaurant.seating} guests — great for family get-togethers.
            </p>
          </div>
        </div>

        <div className="h-80 overflow-hidden rounded-2xl border border-sage-light shadow-sm md:h-full">
          <iframe
            title="Restaurant location map"
            src={mapSrc}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
