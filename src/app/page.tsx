import Image from "next/image";
import Link from "next/link";
import ThemeTiles, { type Theme } from "@/components/ThemeTiles";
import MenuOptionsButton from "@/components/MenuOptionsButton";
import { restaurant } from "@/lib/restaurant-info";

const homepageThemes: Theme[] = [
  {
    name: "Flame. Focus. Flavour.",
    tagline: "Every dish earns its place before it earns its plate.",
    images: [
      "/images/homepage-themes/kitchen-action/1.jpg",
      "/images/homepage-themes/kitchen-action/2.jpg",
      "/images/homepage-themes/kitchen-action/3.jpg",
      "/images/homepage-themes/kitchen-action/4.jpg",
      "/images/homepage-themes/kitchen-action/5.jpg",
      "/images/homepage-themes/kitchen-action/6.jpg",
    ],
  },
  {
    name: "Fired, Not Faked.",
    tagline: "Real char. Real smoke. Real tandoor.",
    images: [
      "/images/homepage-themes/tandoor-grills/1.jpg",
      "/images/homepage-themes/tandoor-grills/2.jpg",
      "/images/homepage-themes/tandoor-grills/3.jpg",
      "/images/homepage-themes/tandoor-grills/4.jpg",
      "/images/homepage-themes/tandoor-grills/5.jpg",
      "/images/homepage-themes/tandoor-grills/6.jpg",
    ],
  },
  {
    name: "Depth Takes Time.",
    tagline: "Nothing here is rushed. Nothing here is ordinary.",
    images: [
      "/images/homepage-themes/curries-gravies/1.jpg",
      "/images/homepage-themes/curries-gravies/2.jpg",
      "/images/homepage-themes/curries-gravies/3.jpg",
      "/images/homepage-themes/curries-gravies/4.jpg",
      "/images/homepage-themes/curries-gravies/5.jpg",
      "/images/homepage-themes/curries-gravies/6.jpg",
    ],
  },
  {
    name: "Small Plates. Big Intent.",
    tagline: "The first bite decides everything.",
    images: [
      "/images/homepage-themes/starters-snacks/1.jpg",
      "/images/homepage-themes/starters-snacks/2.jpg",
      "/images/homepage-themes/starters-snacks/3.jpg",
      "/images/homepage-themes/starters-snacks/4.jpg",
      "/images/homepage-themes/starters-snacks/5.jpg",
      "/images/homepage-themes/starters-snacks/6.jpg",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden text-cream">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-video-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-forest/70" />
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
            <MenuOptionsButton
              align="center"
              className="rounded-full bg-gold px-8 py-3 font-semibold text-forest-dark transition hover:bg-gold-dark"
            >
              View Menu
            </MenuOptionsButton>
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
        <ThemeTiles themes={homepageThemes} />
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
              intimate gatherings and family celebrations alike.
            </p>
            <MenuOptionsButton
              align="left"
              className="mt-8 inline-block rounded-full bg-maroon px-8 py-3 font-semibold text-cream transition hover:bg-maroon/90"
            >
              View Menu
            </MenuOptionsButton>
          </div>
        </div>
      </section>
    </div>
  );
}
