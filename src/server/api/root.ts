import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { contactRouter } from "./routers/contact";
import { imageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  contact: contactRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
