import Image from "next/image";
import Link from "next/link";
import RotatingImage from "@/components/RotatingImage";
import { restaurant } from "@/lib/restaurant-info";

const highlights = [
  {
    title: "Sizzling Tandoori",
    description: "Chicken, prawns, and paneer, char-roasted fresh in the clay oven.",
    images: ["/images/instagram/ig-flaming-sizzler.png", "/images/instagram/ig-seekh-kebab-curry.png"],
  },
  {
    title: "Rich, Slow-Cooked Gravies",
    description: "Classic North Indian curries — vegetarian and non-vegetarian.",
    images: ["/images/instagram/ig-palak-kofta-gravy.png", "/images/instagram/ig-mutton-rack-curry.png"],
  },
  {
    title: "Kebabs & Starters",
    description: "Crispy kebabs and starters, made fresh to order.",
    images: ["/images/instagram/ig-bharwa-bhindi.png", "/images/instagram/ig-starter-plate.png"],
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden text-cream">
        <Image
          src="/images/entrance-day.jpg"
          alt="The Garden Restaurant entrance at La Ben Resort, Colva"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/85" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
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
              {restaurant.orderingEnabled ? "Order for Pickup" : "View Menu"}
            </Link>
            <Link
              href="/reserve"
              className="rounded-full border border-cream/40 px-8 py-3 font-semibold text-cream transition hover:border-gold hover:text-gold"
            >
              Reserve a Table
            </Link>
          </div>
          <p className="mt-6 text-sm text-cream/70">{restaurant.hoursShort}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="overflow-hidden rounded-2xl bg-sage-light/60 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full">
                <RotatingImage images={h.images} alt={h.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-maroon-light/70">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="/images/interior-ambiance.jpg"
              alt="Diners enjoying an evening at The Garden Restaurant"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-semibold text-maroon">
              Perfect for Family Get-Togethers
            </h2>
            <p className="mt-4 max-w-2xl text-forest/80">
              With seating for {restaurant.seating} guests at La Ben Resort, Colva, we welcome
              intimate gatherings and family celebrations alike
              {restaurant.orderingEnabled
                ? " — or skip the wait and order your favourites for pickup."
                : "."}
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-block rounded-full bg-maroon px-8 py-3 font-semibold text-cream transition hover:bg-maroon/90"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
