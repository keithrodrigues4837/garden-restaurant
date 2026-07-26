import type { Metadata } from "next";
import { restaurant } from "@/lib/restaurant-info";

export const metadata: Metadata = {
  title: `About | ${restaurant.name}`,
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">Our Story</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">About {restaurant.name}</h1>

      <div className="mt-8 space-y-5 text-forest/80">
        <p>
          {restaurant.name}{" "}
          brings an authentic North Indian culinary experience to Colva,
          Goa. From flavourful starters and sizzling tandoori dishes to rich, slow-cooked
          gravies, every dish is prepared with both vegetarian and non-vegetarian guests in
          mind — complemented by fresh Indian flatbreads and delectable desserts.
        </p>
        <p>
          Set within La Ben Resort on Colva Beach Rd, our restaurant seats up to{" "}
          {restaurant.seating}{" "}
          guests, making it the perfect spot for intimate gatherings and
          family get-togethers. Whether you&apos;re celebrating a special occasion or simply
          craving a comforting home-style curry, we welcome you to dine in — or order ahead
          for pickup.
        </p>
        <p>We&apos;re open daily, {restaurant.hoursShort}.</p>
      </div>
    </div>
  );
}
