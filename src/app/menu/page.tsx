import type { Metadata } from "next";
import { restaurant } from "@/lib/restaurant-info";
import MenuBrowser from "@/components/MenuBrowser";
import CartPanel from "@/components/CartPanel";

export const metadata: Metadata = {
  title: `Menu & Pickup Order | ${restaurant.name}`,
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

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <MenuBrowser />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartPanel />
        </div>
      </div>
    </div>
  );
}
