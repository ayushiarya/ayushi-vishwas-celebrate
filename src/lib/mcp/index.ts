import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getVenueTool from "./tools/get-venue";
import getWeatherTool from "./tools/get-weather";
import listEventsTool from "./tools/list-events";
import listRecommendationsTool from "./tools/list-recommendations";
import weddingDetailsTool from "./tools/wedding-details";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "ayushi-vishwas-suite",
  title: "Ayushi & Vishwas Suite",
  version: "0.1.0",
  instructions:
    "Tools for Ayushi & Vishwas's wedding invitation. Use `get_wedding_details` for the couple, date and venue, `list_events` for the Haldi / Sangeet / Wedding schedule, `get_venue` for the address and directions, `get_jamshedpur_weather` for current conditions, and `list_recommendations` for places to visit and eat in Jamshedpur.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    weddingDetailsTool,
    listEventsTool,
    getVenueTool,
    getWeatherTool,
    listRecommendationsTool,
  ] as Parameters<typeof defineMcp>[0]["tools"],
});
