import { authRouter } from "./auth-router.js";
import { quoteRouter } from "./quote-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  quote: quoteRouter,
});

export type AppRouter = typeof appRouter;
