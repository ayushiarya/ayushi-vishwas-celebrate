import { ToolError, defineTool } from "@lovable.dev/mcp-js";

import { COUPLE } from "../../wedding";

export default defineTool({
  name: "get_jamshedpur_weather",
  title: "Get Jamshedpur weather",
  description:
    "Get the current weather in Jamshedpur (near the wedding venue) so guests can pack accordingly.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: true },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${COUPLE.coords.lat}&longitude=${COUPLE.coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;
    const res = await fetch(url);
    if (!res.ok) throw new ToolError(`Weather service returned ${res.status}`);
    const json = (await res.json()) as { current?: Record<string, unknown> };
    const weather = { city: COUPLE.city, ...(json.current ?? {}) };
    return {
      content: [{ type: "text", text: JSON.stringify(weather, null, 2) }],
      structuredContent: weather,
    };
  },
});
