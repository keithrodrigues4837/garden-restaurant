export default function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${
        veg ? "border-green-700" : "border-red-700"
      }`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-green-700" : "bg-red-700"}`} />
    </span>
  );
}
