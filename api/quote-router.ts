import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { quoteRequests } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const quoteRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Invalid email").max(255),
        phone: z.string().min(1, "Phone is required").max(50),
        serviceType: z.string().min(1, "Service type is required").max(100),
        projectDescription: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(quoteRequests).values({
        userId: ctx.user?.id ?? null,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        serviceType: input.serviceType,
        projectDescription: input.projectDescription ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  myQuotes: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(quoteRequests)
      .where(eq(quoteRequests.userId, ctx.user.id))
      .orderBy(desc(quoteRequests.createdAt));
  }),
});
