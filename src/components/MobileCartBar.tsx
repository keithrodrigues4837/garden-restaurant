"use client";

import { useCart } from "@/context/CartContext";

export default function MobileCartBar() {
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sage-light bg-cream px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden">
      <a
        href="#cart-panel"
        className="flex items-center justify-between rounded-full bg-gold px-5 py-3 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark"
      >
        <span>
          {itemCount} item{itemCount === 1 ? "" : "s"} · ₹{subtotal}
        </span>
        <span>View Order →</span>
      </a>
    </div>
  );
}
