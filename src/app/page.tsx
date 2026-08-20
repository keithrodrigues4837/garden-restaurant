import Image from "next/image";
import Link from "next/link";
import ThemeTiles, { type Theme } from "@/components/ThemeTiles";
import MenuOptionsButton from "@/components/MenuOptionsButton";
import HeroVideo from "@/components/HeroVideo";
import { restaurant } from "@/lib/restaurant-info";

const homepageThemes: Theme[] = [
  {
    name: "Magic in Motion",
    tagline: "Live fire, sizzling grills, and fresh dishes prepared to order",
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
    name: "A Front-Row View",
    tagline: "Watch our chefs work their magic from start to finish in our open kitchen",
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
    name: "The Heart of Our Kitchen",
    tagline: "Freshly ground spices and traditional cooking techniques behind every dish",
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
    name: "Crafted with Care",
    tagline: "Our spice blends and marinades are all made in-house",
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
        <HeroVideo />
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
              Whether it&apos;s a relaxed family feast or an intimate celebration, our{" "}
              {restaurant.seating}-seat dining space at La Ben Resort in Colva is built for
              sharing great meals.
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
