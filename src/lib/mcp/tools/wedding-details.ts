import { defineTool } from "@lovable.dev/mcp-js";

import { COUPLE, WEDDING_DATE } from "../../wedding";

export default defineTool({
  name: "get_wedding_details",
  title: "Get wedding details",
  description:
    "Get the core details of Ayushi & Vishwas's wedding: couple names, city, venue and the ceremony date.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const details = {
      bride: COUPLE.bride,
      groom: COUPLE.groom,
      city: COUPLE.city,
      state: COUPLE.state,
      venue: COUPLE.venue,
      venueAddress: COUPLE.venueAddress,
      ceremonyDate: WEDDING_DATE,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
      structuredContent: details,
    };
  },
});
