import type { Metadata } from "next";
import Image from "next/image";
import RotatingPairTiles from "@/components/RotatingPairTiles";
import { restaurant } from "@/lib/restaurant-info";

const guestPhotos = [
  "/images/guests/guest-1.jpg",
  "/images/guests/guest-2.jpg",
  "/images/guests/guest-3.jpg",
  "/images/guests/guest-4.jpg",
];

export const metadata: Metadata = {
  title: "About",
};

const faqs = [
  {
    question: "What kind of food does The Garden Restaurant serve?",
    answer:
      "Authentic North Indian cuisine — tandoori starters, kebabs, biryani, rich curries and dals, fresh Indian flatbreads, and traditional desserts.",
  },
  {
    question: "Do you have vegetarian options?",
    answer:
      "Yes. The menu includes a full range of vegetarian dishes alongside non-vegetarian options.",
  },
  {
    question: "Where is The Garden Restaurant located?",
    answer: `Inside La Ben Resort on Colva Beach Rd, Colva, Goa 403708, India — a short walk from Colva Beach.`,
  },
  {
    question: "What are your opening hours?",
    answer: `${restaurant.hours}.`,
  },
  {
    question: "Do you take reservations?",
    answer: `Yes — request a table through the Reserve a Table page, or call/WhatsApp ${restaurant.phone}.`,
  },
  {
    question: "Do you offer delivery or online ordering?",
    answer:
      "No — The Garden Restaurant is a dine-in restaurant only; it does not offer delivery or online ordering.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
        <p>We&apos;re open {restaurant.hoursShort}.</p>
      </div>

      <div className="mt-10">
        <RotatingPairTiles
          images={guestPhotos}
          altPrefix="Guests dining at The Garden Restaurant"
        />
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-forest">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-semibold text-forest">{faq.question}</h3>
              <p className="mt-1 text-forest/80">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
