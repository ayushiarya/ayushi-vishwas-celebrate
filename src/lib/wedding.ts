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

export const STORY = [
  {
    label: "How We Met",
    text: "A crowded Jamshedpur wedding, a shared plate of jalebi, and a conversation that refused to end.",
  },
  {
    label: "Our Journey",
    text: "Four years of late-night calls, unplanned road trips and a friendship that quietly became everything.",
  },
  {
    label: "The Proposal",
    text: "A hilltop at dusk, one very nervous speech, and a yes said before the question was finished.",
  },
  {
    label: "The Engagement",
    text: "Two families, one long table, and the happiest chaos we have ever known.",
  },
  {
    label: "The Wedding",
    text: "And now — the 25th, the hills, and all of you around us.",
  },
];

export const HOTELS = [
  {
    name: "The Sonnet",
    distance: "6 km from venue",
    category: "5 star · Luxury",
    link: "https://www.google.com/maps/search/The+Sonnet+Jamshedpur",
  },
  {
    name: "Hotel Alcor",
    distance: "8 km from venue",
    category: "4 star · Boutique",
    link: "https://www.google.com/maps/search/Hotel+Alcor+Jamshedpur",
  },
  {
    name: "Ginger Jamshedpur",
    distance: "10 km from venue",
    category: "3 star · Comfort",
    link: "https://www.google.com/maps/search/Ginger+Jamshedpur",
  },
  {
    name: "Hotel Boulevard",
    distance: "9 km from venue",
    category: "3 star · Value",
    link: "https://www.google.com/maps/search/Hotel+Boulevard+Jamshedpur",
  },
];

export const GOOD_TO_KNOW = [
  {
    title: "Dress Code",
    text: "Haldi — yellows and whites. Sangeet — festive jewel tones. Wedding — traditional formals. Evenings in November are cool; carry a light shawl.",
  },
  {
    title: "Timings",
    text: "Please arrive 30 minutes before each ceremony. The baraat and the pheras run on time — we promise.",
  },
  {
    title: "Parking",
    text: "Complimentary valet at the resort gate. Additional guest parking is available on the lower lawn.",
  },
  {
    title: "Contact",
    text: "Family desk · +91 90000 00000 · reachable from 8 AM to 11 PM on both days.",
  },
  {
    title: "Things to Remember",
    text: "Comfortable footwear for the lawns, a light layer for the night air, and your appetite for far too much food.",
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
