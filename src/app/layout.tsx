import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramButton from "@/components/InstagramButton";
import MapsButton from "@/components/MapsButton";
import { restaurant } from "@/lib/restaurant-info";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} | ${restaurant.tagline}`,
    template: `%s | ${restaurant.name}`,
  },
  description: restaurant.description,
  keywords: [
    "North Indian restaurant Goa",
    "restaurant Colva",
    "tandoori Goa",
    "Indian food Colva Beach",
    restaurant.name,
  ],
  openGraph: {
    title: `${restaurant.name} | ${restaurant.tagline}`,
    description: restaurant.description,
    url: "/",
    siteName: restaurant.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} | ${restaurant.tagline}`,
    description: restaurant.description,
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: "North Indian",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.line1,
    addressLocality: "Colva",
    addressRegion: "Goa",
    postalCode: "403708",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "13:00",
    closes: "23:00",
  },
  // Phone number omitted until the real one replaces the restaurant-info.ts
  // placeholder — a fake number should never reach search engine structured data.
  ...(restaurant.phoneIsPlaceholder ? {} : { telephone: restaurant.phone }),
  url: siteUrl,
  image: [
    `${siteUrl}/opengraph-image.jpg`,
    `${siteUrl}/images/entrance-day.jpg`,
    `${siteUrl}/images/interior-ambiance.jpg`,
    `${siteUrl}/images/food-tandoori-chicken.jpg`,
  ],
  sameAs: [`https://instagram.com/${restaurant.instagram}`],
  acceptsReservations: true,
  hasMenu: `${siteUrl}${restaurant.menuPdf}`,
  menu: `${siteUrl}${restaurant.menuPdf}`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: restaurant.googleRating.ratingValue,
    reviewCount: restaurant.googleRating.reviewCount,
    bestRating: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <InstagramButton />
        <MapsButton />
      </body>
    </html>
  );
}
