import type { Metadata } from "next";
import { restaurant } from "@/lib/restaurant-info";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Reserve a Table",
};

export default function ReservePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">Reserve</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">Book a Table</h1>
      <p className="mt-2 text-forest/70">
        Tell us when you&apos;d like to visit and we&apos;ll confirm your table over WhatsApp
        or a phone call. We&apos;re open {restaurant.hoursShort}.
      </p>

      <div className="mt-10 rounded-2xl border border-sage-light p-6 shadow-sm sm:p-8">
        <ReservationForm />
      </div>
    </div>
  );
}
