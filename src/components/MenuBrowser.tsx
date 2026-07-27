"use client";

import { useMemo, useState } from "react";
import { menu } from "@/lib/menu-data";
import { useCart } from "@/context/CartContext";
import VegBadge from "@/components/VegBadge";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-forest" : "bg-forest/30"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function MenuBrowser() {
  const [vegOnly, setVegOnly] = useState(false);
  const [specialsOnly, setSpecialsOnly] = useState(false);
  const [query, setQuery] = useState("");
  const { lines, add, setQty } = useCart();

  const qtyOf = (id: string) => lines.find((l) => l.item.id === id)?.qty ?? 0;

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (vegOnly && !item.veg) return false;
          if (specialsOnly && !item.special) return false;
          if (
            q &&
            !item.name.toLowerCase().includes(q) &&
            !item.description.toLowerCase().includes(q)
          ) {
            return false;
          }
          return true;
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [vegOnly, specialsOnly, query]);

  return (
    <div className="min-w-0">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the menu…"
        aria-label="Search the menu"
        className="mb-4 w-full rounded-full border border-sage-light px-4 py-2.5 text-sm text-forest placeholder:text-forest/40 focus:border-forest focus:outline-none"
      />

      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-sage-light/50 px-4 py-3 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <span className="text-sm font-medium text-forest">Show vegetarian only</span>
          <Toggle checked={vegOnly} onChange={() => setVegOnly((v) => !v)} />
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <span className="text-sm font-medium text-forest">Chef&apos;s Specials only</span>
          <Toggle checked={specialsOnly} onChange={() => setSpecialsOnly((v) => !v)} />
        </div>
      </div>

      <nav className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {filteredMenu.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 rounded-full border border-sage-light px-3 py-1.5 text-xs font-medium text-forest/80 transition hover:border-forest hover:text-forest"
          >
            {category.name}
          </a>
        ))}
      </nav>

      <p className="mb-8 text-xs text-forest/50">
        Prices exclude local taxes, which are applied at pickup.
      </p>

      {filteredMenu.length === 0 && (
        <p className="text-sm text-forest/60">
          No dishes match your search and filters. Try clearing the search or the toggles above.
        </p>
      )}

      {filteredMenu.map((category) => (
        <section key={category.id} id={category.id} className="mb-10 scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-forest">{category.name}</h2>
          {category.note && (
            <p className="mt-1 text-xs italic text-forest/50">{category.note}</p>
          )}
          <div className="mt-4 divide-y divide-sage-light">
            {category.items.map((item) => {
              const qty = qtyOf(item.id);
              return (
                <div key={item.id} className="flex items-start justify-between gap-4 py-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <VegBadge veg={item.veg} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-forest">{item.name}</h3>
                        {item.special && (
                          <span
                            title="Chef's Special"
                            className="rounded-full bg-maroon/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-maroon"
                          >
                            Chef&apos;s Special
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-forest/70">{item.description}</p>
                      <p className="mt-1 text-sm font-semibold text-forest">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => add(item.id)}
                        className="rounded-full border border-forest px-4 py-1.5 text-sm font-semibold text-forest transition hover:bg-forest hover:text-cream"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-full border border-forest px-1 py-1">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => setQty(item.id, qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest hover:bg-sage-light"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm font-semibold text-forest">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => add(item.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-forest hover:bg-sage-light"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
