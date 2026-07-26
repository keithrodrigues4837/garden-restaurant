"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { restaurant } from "@/lib/restaurant-info";

type Step = "cart" | "details" | "confirmed";

type Order = {
  id: string;
  name: string;
  phone: string;
  notes: string;
  readyBy: string;
  total: number;
};

export default function CartPanel() {
  const { lines, itemCount, subtotal, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const readyBy = new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const id = `GR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrder({ id, name, phone, notes, readyBy, total: subtotal });
    setStep("confirmed");
    clear();
  };

  const startNewOrder = () => {
    setOrder(null);
    setName("");
    setPhone("");
    setNotes("");
    setStep("cart");
  };

  if (step === "confirmed" && order) {
    return (
      <div className="rounded-2xl border border-sage-light bg-white p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-light text-forest">
          ✓
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-forest">Order Placed!</h2>
        <p className="mt-1 text-sm text-forest/70">Order #{order.id}</p>
        <p className="mt-4 text-sm text-forest/80">
          Thanks, {order.name}. Your order will be ready for pickup by{" "}
          <strong>{order.readyBy}</strong> at {restaurant.address.line1}.
        </p>
        <p className="mt-2 text-sm text-forest/60">Total due at pickup: ₹{order.total}</p>
        <button
          type="button"
          onClick={startNewOrder}
          className="mt-6 rounded-full bg-forest px-6 py-2 text-sm font-semibold text-cream hover:bg-forest-dark"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sage-light bg-white p-6">
      <h2 className="font-display text-xl font-semibold text-forest">
        {step === "cart" ? `Your Order (${itemCount})` : "Pickup Details"}
      </h2>

      {step === "cart" && (
        <>
          {lines.length === 0 ? (
            <p className="mt-4 text-sm text-forest/60">
              Your cart is empty. Add items from the menu to get started.
            </p>
          ) : (
            <>
              <ul className="mt-4 space-y-3">
                {lines.map(({ item, qty }) => (
                  <li key={item.id} className="flex items-start justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium text-forest">{item.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => setQty(item.id, qty - 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-forest/40 text-xs text-forest"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-forest">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => setQty(item.id, qty + 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-forest/40 text-xs text-forest"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="ml-1 text-xs text-forest/50 underline hover:text-forest"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 font-semibold text-forest">₹{item.price * qty}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-sage-light pt-4 text-sm font-semibold text-forest">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <p className="mt-1 text-xs text-forest/50">{restaurant.pickup.note}</p>

              <button
                type="button"
                onClick={() => setStep("details")}
                className="mt-4 w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-forest-dark hover:bg-gold-dark"
              >
                Proceed to Pickup Details
              </button>
            </>
          )}
        </>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-forest">
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sage-light px-3 py-2 text-sm text-forest focus:border-forest focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-forest">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sage-light px-3 py-2 text-sm text-forest focus:border-forest focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="notes" className="text-sm font-medium text-forest">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-sage-light px-3 py-2 text-sm text-forest focus:border-forest focus:outline-none"
              placeholder="e.g. less spicy, no onions"
            />
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-forest">
            <span>Total (pay at pickup)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="flex-1 rounded-full border border-forest py-2.5 text-sm font-semibold text-forest hover:bg-sage-light"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-gold py-2.5 text-sm font-semibold text-forest-dark hover:bg-gold-dark"
            >
              Place Pickup Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
