import { defineTool } from "@lovable.dev/mcp-js";

import { COUPLE, mapsDirections, mapsView } from "../../wedding";

export default defineTool({
  name: "get_venue",
  title: "Get venue and directions",
  description:
    "Get the wedding venue address, coordinates, and Google Maps view/directions links for Hill View Resort, Jamshedpur.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const venue = {
      name: COUPLE.venue,
      address: COUPLE.venueAddress,
      coordinates: COUPLE.coords,
      nearestAirport: "Ranchi Airport (Birsa Munda International Airport)",
      mapsView,
      mapsDirections,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(venue, null, 2) }],
      structuredContent: venue,
    };
  },
});
