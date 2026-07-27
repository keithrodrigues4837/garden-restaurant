export const restaurant = {
  name: "The Garden Restaurant",
  tagline: "Authentic North Indian Cuisine",
  description:
    "Flavourful starters, sizzling tandooris, and rich gravies — vegetarian and non-vegetarian — served with fresh Indian flatbreads and delectable desserts. The perfect spot for intimate gatherings and family get-togethers.",
  seating: 60,
  hours: "Open daily, 11:00 AM – 11:00 PM",
  hoursShort: "11:00 AM – 11:00 PM, daily",
  address: {
    line1: "La Ben Resort, Colva Beach Rd",
    line2: "Colva, Goa 403708, India",
    full: "La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India",
    mapsQuery: "La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India",
  },
  // TODO: replace with the restaurant's real phone number
  phone: "+91 00000 00000",
  phoneIsPlaceholder: true,
  // Online pickup ordering is paused for now — flip to true to bring back
  // the cart/checkout UI on the Menu page and the ordering CTAs site-wide.
  orderingEnabled: false,
  pickup: {
    mode: "asap" as const,
    note: "Pickup orders are prepared fresh — ready in about 25–35 minutes.",
  },
};
