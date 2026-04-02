import { defineCollection, z } from "astro:content";

const skills = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    owner: z.string(),
    description: z.string(),
    installs: z.number().nonnegative(),
    position: z.number().int(),
    level: z.enum(["foundation", "advanced", "expert"]),
    stack: z.array(z.string()).default([]),
    updatedAt: z.string(),
    rating: z.number().min(0).max(5).optional(),
    trending: z.boolean().default(false),
    hot: z.boolean().default(false),
  }),
});

export const collections = { skills };
