// ── Editable wedding configuration ──────────────────────────────────────────
// Change anything here and it updates across the whole invitation.

export const COUPLE = {
  bride: "Ayushi",
  groom: "Vishwas",
  city: "Jamshedpur",
  state: "Jharkhand",
  venue: "Hill View Resort",
  venueAddress: "Hill View Resort, Jamshedpur, Jharkhand 831012",
  coords: { lat: 22.7868, lon: 86.1636 },
} as const;

// Wedding ceremony date & time (IST). Countdown targets this moment.
export const WEDDING_DATE = "2026-11-25T19:00:00+05:30";

export type WeddingEvent = {
  id: string;
  name: string;
  day: string;
  daySuffix: string;
  partOfDay: string;
  time: string;
  description: string;
  dressCode: string;
  palette: string[]; // outfit colour swatches shown on the event card
  paletteNames: string[]; // fun name for each swatch, same order as palette
  start: string; // ISO with IST offset
  end: string;
};

export const EVENTS: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    day: "24",
    daySuffix: "th",
    partOfDay: "Morning",
    time: "10:30 AM onwards",
    description:
      "Turmeric, marigolds and laughter under the morning sun, the first blessing of the celebration.",
    dressCode: "Yellows & whites, easy cottons",
    palette: ["#F4C430", "#F7E8B5", "#FDFBF3", "#E9B44C"],
    paletteNames: ["Fresh Haldi", "Morning Sun", "Ivory Silk", "Marigold"],
    start: "2026-11-24T10:30:00+05:30",
    end: "2026-11-24T13:30:00+05:30",
  },
  {
    id: "sangeet",
    name: "Sangeet & Engagement",
    day: "24",
    daySuffix: "th",
    partOfDay: "Evening",
    time: "7:00 PM onwards",
    description:
      "An evening of music, dholak beats and the exchange of rings. Dance shoes strongly advised.",
    dressCode: "Bright, Bold & Ready to dance",
    palette: ["#EC3B8E", "#7B2FBE", "#2563EB", "#0E7C7B", "#FF6F61", "#F9C6D9", "#CFE0F7", "#D4AF37", "#C0C0C0", "#B76E79"],
    paletteNames: ["Rani Pink", "Royal Purple", "Disco Blue", "Emerald Pop", "Coral Crush", "Baby Blush", "Powder Blue", "Gold Shimmer", "Silver Sparkle", "Rose Gold"],
    start: "2026-11-24T19:00:00+05:30",
    end: "2026-11-24T23:30:00+05:30",
  },
  {
    id: "wedding",
    name: "Wedding",
    day: "25",
    daySuffix: "th",
    partOfDay: "Evening",
    time: "7:00 PM onwards",
    description:
      "Seven vows around the sacred fire beneath the hills, the moment everything begins.",
    dressCode: "Festive Indian",
    palette: ["#B3122E", "#8A1538", "#0E7C7B", "#D4AF37", "#B4530A", "#1F2A52", "#FFF8E7", "#C0C0C0", "#B76E79"],
    paletteNames: ["Bridal Red", "Deep Wine", "Emerald", "Antique Gold", "Rust", "Midnight Navy", "Ivory", "Silver", "Rose Gold"],
    start: "2026-11-25T19:00:00+05:30",
    end: "2026-11-26T00:00:00+05:30",
  },
];

export type Spot = {
  name: string;
  tag: string;
  text: string;
  link: string;
};

export const PLACES_TO_VISIT: Spot[] = [
  { name: "Jubilee Park", tag: "Evening lights", text: "Musical fountains, rose gardens and paani-puri carts at the gate.", link: "https://www.google.com/maps/search/Jubilee+Park+Jamshedpur" },
  { name: "Jamshedpur Link Roads + Marine Drive", tag: "Long drive", text: "Tree-lined roads and the riverside Marine Drive, best at sunset.", link: "https://www.google.com/maps/search/Marine+Drive+Jamshedpur" },
  { name: "Dalma Wildlife Sanctuary & Lake", tag: "Hills & water", text: "A winding drive up the Dalma range, with the lake waiting at its foot.", link: "https://www.google.com/maps/search/Dalma+Wildlife+Sanctuary" },
];

export const FOOD_SPOTS: Spot[] = [
  { name: "Brubeck Bakery", tag: "Bakery", text: "Patties, cream rolls and a strong cup of chai.", link: "https://www.google.com/maps/search/Brubeck+Bakery+Jamshedpur" },
  { name: "The Moon", tag: "Dinner", text: "A Jamshedpur favourite for a big family table.", link: "https://www.google.com/maps/search/The+Moon+restaurant+Jamshedpur" },
  { name: "Bistupur Khau Gali", tag: "Street food", text: "Go hungry, go late evening, try everything.", link: "https://www.google.com/maps/search/Khau+Gali+Bistupur+Jamshedpur" },
  { name: "Chappan Bhog", tag: "Sweets", text: "Jamshedpur's go-to for fresh mithai and namkeen.", link: "https://www.google.com/maps/search/Chappan+Bhog+Jamshedpur" },
];

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  COUPLE.venueAddress,
)}`;

export const mapsView = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COUPLE.venueAddress,
)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  COUPLE.venueAddress,
)}&z=13&output=embed`;

export function calendarLink(event: WeddingEvent) {
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${COUPLE.bride} & ${COUPLE.groom}: ${event.name}`,
    dates: `${fmt(event.start)}/${fmt(event.end)}`,
    details: event.description,
    location: COUPLE.venueAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
