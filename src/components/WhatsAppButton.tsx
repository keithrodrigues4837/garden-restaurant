import { restaurant } from "@/lib/restaurant-info";

export default function WhatsAppButton() {
  const digits = restaurant.phone.replace(/\D/g, "");
  const message = encodeURIComponent(`Hi! I'd like to know more about ${restaurant.name}.`);
  const href = `https://wa.me/${digits}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${restaurant.name} on WhatsApp`}
      className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5c] sm:right-6 ${
        restaurant.orderingEnabled ? "bottom-20 lg:bottom-6" : "bottom-6"
      }`}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.293.638 4.502 1.847 6.43L4 29l7.76-1.815a11.94 11.94 0 0 0 4.244.77h.004c6.63 0 12.003-5.373 12.003-12.004C28.011 8.373 22.638 3 16.004 3zm0 21.882h-.003a9.86 9.86 0 0 1-5.024-1.377l-.36-.214-3.706.866.878-3.61-.235-.372a9.845 9.845 0 0 1-1.51-5.271c0-5.457 4.44-9.897 9.899-9.897 2.644 0 5.128 1.031 6.997 2.902a9.83 9.83 0 0 1 2.898 6.997c0 5.457-4.44 9.976-9.834 9.976zm5.42-7.42c-.297-.148-1.758-.868-2.03-.967-.273-.099-.472-.148-.67.148-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.254-.462-2.388-1.474-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.173.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01a1.09 1.09 0 0 0-.792.372c-.273.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.148.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </a>
  );
}
