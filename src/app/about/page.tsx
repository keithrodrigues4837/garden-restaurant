import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/lib/restaurant-info";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">Our Story</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">About {restaurant.name}</h1>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm">
        <Image
          src="/images/entrance-day.jpg"
          alt="The Garden Restaurant entrance at La Ben Resort, Colva"
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>

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
          craving a comforting home-style curry, we welcome you to dine in.
        </p>
        <p>We&apos;re open daily, {restaurant.hoursShort}.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
          <Image
            src="/images/food-tandoori-chicken.jpg"
            alt="Tandoori chicken at The Garden Restaurant"
            fill
            sizes="(min-width: 768px) 384px, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
          <Image
            src="/images/food-seekh-kebab.jpg"
            alt="Seekh kebab at The Garden Restaurant"
            fill
            sizes="(min-width: 768px) 384px, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
