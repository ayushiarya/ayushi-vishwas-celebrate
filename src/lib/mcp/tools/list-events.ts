import { defineTool } from "@lovable.dev/mcp-js";

import { EVENTS, calendarLink } from "../../wedding";

export default defineTool({
  name: "list_events",
  title: "List wedding events",
  description:
    "List every wedding function (Haldi, Sangeet & Engagement, Wedding) with timings, dress code and a Google Calendar link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const events = EVENTS.map((e) => ({
      id: e.id,
      name: e.name,
      date: `${e.day}${e.daySuffix} November`,
      partOfDay: e.partOfDay,
      time: e.time,
      description: e.description,
      dressCode: e.dressCode,
      start: e.start,
      end: e.end,
      calendarLink: calendarLink(e),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(events, null, 2) }],
      structuredContent: { events },
    };
  },
});
