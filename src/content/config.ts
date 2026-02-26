import { defineCollection, z } from "astro:content";

const projects = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date().optional(), // optional, only if you want it
		timeline: z.string(),      // e.g. "Jun 2025 – Feb 2026"
		github: z.string().url().optional(),
		cover: z.string(),         // e.g. "/project-covers/placeholder-1.jpg"
		order: z.number(),
		tags: z.array(z.string()).optional(), // optional; we won't render them
	}),
});

export const collections = {
	projects,
};