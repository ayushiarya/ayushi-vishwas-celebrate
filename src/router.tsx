import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Disabled: this is a single-route page, so scroll restoration only
    // mis-fires — it snaps the window back to the top when lazy content
    // (the venue image / map) loads mid-scroll.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
