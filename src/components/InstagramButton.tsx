import { restaurant } from "@/lib/restaurant-info";

export default function InstagramButton() {
  return (
    <a
      href={`https://instagram.com/${restaurant.instagram}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow ${restaurant.name} on Instagram`}
      className="fixed right-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 sm:right-6"
      style={{
        background:
          "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
      }}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
