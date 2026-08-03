import { restaurant } from "@/lib/restaurant-info";

export default function MapsButton() {
  return (
    <a
      href={restaurant.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${restaurant.name} on Google Maps`}
      className="fixed right-4 bottom-[10.5rem] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#EA4335] shadow-lg transition hover:scale-105 sm:right-6"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.5 11.5 7.02 11.98a.68.68 0 0 0 .96 0C13 21 19.5 14.75 19.5 9.5 19.5 5.36 16.14 2 12 2zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5z" />
      </svg>
    </a>
  );
}
