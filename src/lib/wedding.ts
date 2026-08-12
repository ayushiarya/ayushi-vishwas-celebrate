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
      "Turmeric, marigolds and laughter under the morning sun — the first blessing of the celebration.",
    dressCode: "Yellows & whites, easy cottons",
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
      "An evening of music, dholak beats and the exchange of rings — dance shoes strongly advised.",
    dressCode: "Festive Indian, jewel tones",
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
      "Seven vows around the sacred fire, beneath the hills — the moment everything begins.",
    dressCode: "Traditional formals",
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
  {
    name: "Jubilee Park",
    tag: "Evening lights",
    text: "Jamshedpur's own Vrindavan Garden — musical fountains, rose gardens and paani-puri carts at the gate.",
    link: "https://www.google.com/maps/search/Jubilee+Park+Jamshedpur",
  },
  {
    name: "Dalma Wildlife Sanctuary",
    tag: "Hills & elephants",
    text: "A winding drive up the Dalma range with a hilltop Shiva temple and views over the whole valley.",
    link: "https://www.google.com/maps/search/Dalma+Wildlife+Sanctuary",
  },
  {
    name: "Dimna Lake",
    tag: "Sunrise spot",
    text: "Calm water at the foot of the hills — boating, breakfast chai and the best morning photos.",
    link: "https://www.google.com/maps/search/Dimna+Lake+Jamshedpur",
  },
  {
    name: "Bhuvaneshwari Temple, Telco",
    tag: "Blessings",
    text: "A hilltop temple with 100-odd steps and a very generous prasad counter.",
    link: "https://www.google.com/maps/search/Bhuvaneshwari+Temple+Jamshedpur",
  },
  {
    name: "Tata Steel Zoological Park",
    tag: "Family favourite",
    text: "Sprawling green zoo and nature park right beside Jubilee — lovely for a lazy morning.",
    link: "https://www.google.com/maps/search/Tata+Steel+Zoological+Park",
  },
  {
    name: "Bistupur Market",
    tag: "Shopping",
    text: "Bangles, tussar silk, Sohrai art and street shopping — bargain shamelessly, it is expected.",
    link: "https://www.google.com/maps/search/Bistupur+Market+Jamshedpur",
  },
];

export const FOOD_SPOTS: Spot[] = [
  {
    name: "Brubeck Bakery, Bistupur",
    tag: "Chai & patties",
    text: "The city's classic bakery — veg patties, cream rolls and a strong cup of chai.",
    link: "https://www.google.com/maps/search/Brubeck+Bakery+Jamshedpur",
  },
  {
    name: "Novelty Restaurant",
    tag: "Old school Mughlai",
    text: "Biryani, mutton curry and rumali roti the way Jamshedpur has eaten it for decades.",
    link: "https://www.google.com/maps/search/Novelty+Restaurant+Jamshedpur",
  },
  {
    name: "Sakchi Golchakkar street food",
    tag: "Chaat crawl",
    text: "Litti chokha, aloo chop, jhaal muri and gulab jamun — go hungry, go late evening.",
    link: "https://www.google.com/maps/search/Sakchi+Golchakkar+Jamshedpur",
  },
  {
    name: "The Madras Cafe / South Indian joints, Kadma",
    tag: "Breakfast",
    text: "Filter coffee, ghee roast dosa and idli sambar to fix a late sangeet night.",
    link: "https://www.google.com/maps/search/South+Indian+restaurant+Kadma+Jamshedpur",
  },
  {
    name: "Sanjha Chulha",
    tag: "Dinner",
    text: "Hearty Punjabi thalis and tandoori — the family's go-to for a big table.",
    link: "https://www.google.com/maps/search/Sanjha+Chulha+Jamshedpur",
  },
  {
    name: "Local sweet shops, Sakchi",
    tag: "Mithai",
    text: "Bengali-style rasgulla, sandesh and warm malpua — carry a box home, please.",
    link: "https://www.google.com/maps/search/sweet+shop+Sakchi+Jamshedpur",
  },
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
    text: `${event.name} — ${COUPLE.bride} & ${COUPLE.groom}`,
    dates: `${fmt(event.start)}/${fmt(event.end)}`,
    details: event.description,
    location: COUPLE.venueAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
