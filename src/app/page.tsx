import Image from "next/image";
import Link from "next/link";
import RotatingImage from "@/components/RotatingImage";
import { restaurant } from "@/lib/restaurant-info";

const highlights = [
  {
    title: "From Our Kitchen",
    images: [
      "/images/dishes/dish-01.jpg", "/images/dishes/dish-04.jpg", "/images/dishes/dish-07.jpg",
      "/images/dishes/dish-10.jpg", "/images/dishes/dish-13.jpg", "/images/dishes/dish-16.jpg",
      "/images/dishes/dish-19.jpg", "/images/dishes/dish-22.jpg", "/images/dishes/dish-25.jpg",
      "/images/dishes/dish-28.jpg", "/images/dishes/dish-31.jpg", "/images/dishes/dish-34.jpg",
      "/images/dishes/dish-37.jpg", "/images/dishes/dish-40.jpg", "/images/dishes/dish-43.jpg",
      "/images/dishes/dish-46.jpg", "/images/dishes/dish-49.jpg", "/images/dishes/dish-52.jpg",
      "/images/dishes/dish-55.jpg", "/images/dishes/dish-58.jpg", "/images/dishes/dish-61.jpg",
      "/images/dishes/dish-64.jpg", "/images/dishes/dish-67.jpg", "/images/dishes/dish-70.jpg",
    ],
  },
  {
    title: "Signature Dishes",
    images: [
      "/images/dishes/dish-02.jpg", "/images/dishes/dish-05.jpg", "/images/dishes/dish-08.jpg",
      "/images/dishes/dish-11.jpg", "/images/dishes/dish-14.jpg", "/images/dishes/dish-17.jpg",
      "/images/dishes/dish-20.jpg", "/images/dishes/dish-23.jpg", "/images/dishes/dish-26.jpg",
      "/images/dishes/dish-29.jpg", "/images/dishes/dish-32.jpg", "/images/dishes/dish-35.jpg",
      "/images/dishes/dish-38.jpg", "/images/dishes/dish-41.jpg", "/images/dishes/dish-44.jpg",
      "/images/dishes/dish-47.jpg", "/images/dishes/dish-50.jpg", "/images/dishes/dish-53.jpg",
      "/images/dishes/dish-56.jpg", "/images/dishes/dish-59.jpg", "/images/dishes/dish-62.jpg",
      "/images/dishes/dish-65.jpg", "/images/dishes/dish-68.jpg",
    ],
  },
  {
    title: "Chef's Favorites",
    images: [
      "/images/dishes/dish-03.jpg", "/images/dishes/dish-06.jpg", "/images/dishes/dish-09.jpg",
      "/images/dishes/dish-12.jpg", "/images/dishes/dish-15.jpg", "/images/dishes/dish-18.jpg",
      "/images/dishes/dish-21.jpg", "/images/dishes/dish-24.jpg", "/images/dishes/dish-27.jpg",
      "/images/dishes/dish-30.jpg", "/images/dishes/dish-33.jpg", "/images/dishes/dish-36.jpg",
      "/images/dishes/dish-39.jpg", "/images/dishes/dish-42.jpg", "/images/dishes/dish-45.jpg",
      "/images/dishes/dish-48.jpg", "/images/dishes/dish-51.jpg", "/images/dishes/dish-54.jpg",
      "/images/dishes/dish-57.jpg", "/images/dishes/dish-60.jpg", "/images/dishes/dish-63.jpg",
      "/images/dishes/dish-66.jpg", "/images/dishes/dish-69.jpg",
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-8">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className={`overflow-hidden rounded-2xl bg-sage-light/60 shadow-sm ${
                i === highlights.length - 1
                  ? "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:mx-0 sm:w-full"
                  : ""
              }`}
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
