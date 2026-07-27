import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/lib/restaurant-info";
import MenuBrowser from "@/components/MenuBrowser";
import CartPanel from "@/components/CartPanel";

export const metadata: Metadata = {
  title: "Menu & Pickup Order",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">Menu</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">
        Order for Pickup
      </h1>
      <p className="mt-2 max-w-2xl text-forest/70">
        Browse the menu, add your favourites, and place a pickup order.{" "}
        {restaurant.pickup.note}
      </p>

      <div className="relative mt-6 aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-sm">
        <Image
          src="/images/food-dal-makhani.jpg"
          alt="Dal makhani served at The Garden Restaurant"
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <MenuBrowser />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartPanel />
        </div>
      </div>
    </div>
  );
}
