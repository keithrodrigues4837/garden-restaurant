"use client";

import { useState } from "react";
import { restaurant } from "@/lib/restaurant-info";

function formatDate(value: string) {
  if (!value) return value;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(value: string) {
  if (!value) return value;
  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

const inputClass =
  "mt-1 w-full rounded-lg border border-sage-light px-3 py-2 text-sm text-forest focus:border-forest focus:outline-none";
const labelClass = "text-sm font-medium text-forest";

const OPEN_TIME = "13:00";
const CLOSE_TIME = "23:00";

function toMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

const TIME_OPTIONS = (() => {
  const options: string[] = [];
  for (let minutes = toMinutes(OPEN_TIME); minutes <= toMinutes(CLOSE_TIME); minutes += 30) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    options.push(`${h}:${m}`);
  }
  return options;
})();

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("2");
  const [notes, setNotes] = useState("");

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const digits = restaurant.phone.replace(/\D/g, "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      `Hi! I'd like to reserve a table at ${restaurant.name}.`,
      `Name: ${name}`,
      `Party size: ${partySize}`,
      `Date: ${formatDate(date)}`,
      `Time: ${formatTime(time)}`,
      `Phone: ${phone}`,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${digits}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="For us to confirm your booking"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>
            Time
          </label>
          <select
            id="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select a time
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {formatTime(t)}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-forest/50">We&apos;re open {restaurant.hoursShort}.</p>
        </div>
      </div>

      <div>
        <label htmlFor="partySize" className={labelClass}>
          Party size
        </label>
        <input
          id="partySize"
          type="number"
          required
          min={1}
          max={20}
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-forest/50">
          For parties larger than 20, please call us directly.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Special requests <span className="text-forest/40">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={inputClass}
          placeholder="High chair, window seat, dietary needs, etc."
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark"
      >
        Send Reservation Request via WhatsApp
      </button>

      <p className="text-xs text-forest/50">
        This opens WhatsApp with your request pre-filled — we&apos;ll confirm availability
        there. Prefer to call?{" "}
        <a href={`tel:${digits}`} className="font-semibold text-gold-dark hover:underline">
          {restaurant.phone}
        </a>
      </p>
    </form>
  );
}
