import Link from "next/link";
import { restaurant } from "@/lib/restaurant-info";

const highlights = [
  {
    title: "Sizzling Tandoori",
    description: "Chicken, prawns, and paneer, char-roasted fresh in the clay oven.",
  },
  {
    title: "Rich, Slow-Cooked Gravies",
    description: "Classic North Indian curries — vegetarian and non-vegetarian.",
  },
  {
    title: "Fresh Flatbreads",
    description: "Naan and rotis, baked to order, straight from the tandoor.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">
            {restaurant.tagline}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            {restaurant.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-cream/85 sm:text-lg">
            {restaurant.description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="rounded-full bg-gold px-8 py-3 font-semibold text-forest-dark transition hover:bg-gold-dark"
            >
              Order for Pickup
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-cream/40 px-8 py-3 font-semibold text-cream transition hover:border-gold hover:text-gold"
            >
              Visit Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-cream/70">{restaurant.hoursShort}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl bg-sage-light/60 p-6 text-center">
              <h2 className="font-display text-xl font-semibold text-forest">{h.title}</h2>
              <p className="mt-2 text-sm text-forest/80">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-maroon-light/70">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-maroon">
            Perfect for Family Get-Togethers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-forest/80">
            With seating for {restaurant.seating}{" "}
            guests at La Ben Resort, Colva, we welcome
            intimate gatherings and family celebrations alike — or skip the wait and order
            your favourites for pickup.
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-block rounded-full bg-maroon px-8 py-3 font-semibold text-cream transition hover:bg-maroon/90"
          >
            View Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
