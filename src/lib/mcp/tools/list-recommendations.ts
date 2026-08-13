import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { FOOD_SPOTS, PLACES_TO_VISIT } from "../../wedding";

export default defineTool({
  name: "list_recommendations",
  title: "List Jamshedpur recommendations",
  description:
    "List the couple's 'While You're Here' recommendations in Jamshedpur — places to visit, food spots, or both.",
  inputSchema: {
    category: z
      .enum(["places", "food", "all"])
      .nullable()
      .describe("Which recommendations to return. Use null for all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const wanted = category ?? "all";
    const result = {
      places: wanted === "food" ? [] : PLACES_TO_VISIT,
      food: wanted === "places" ? [] : FOOD_SPOTS,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
