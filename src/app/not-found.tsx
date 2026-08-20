import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-forest">Page Not Found</h1>
      <p className="mt-4 text-forest/70">
        Looks like this table isn&apos;t set. The page you&apos;re looking for doesn&apos;t
        exist or may have moved.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-gold px-8 py-3 font-semibold text-forest-dark transition hover:bg-gold-dark"
        >
          Back to Home
        </Link>
        <Link
          href="/reserve"
          className="rounded-full border border-sage-light px-8 py-3 font-semibold text-forest transition hover:border-gold hover:text-gold-dark"
        >
          Reserve a Table
        </Link>
      </div>
    </div>
  );
}
