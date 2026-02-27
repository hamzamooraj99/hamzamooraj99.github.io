import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().max(60);

const baseSchema = z.object({
	title: titleSchema,
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			pinned: z.boolean().default(false),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z
			.string()
			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			.transform((val) => new Date(val)),
	}),
});

const tag = defineCollection({
	loader: glob({ base: "./src/content/tag", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema.optional(),
		description: z.string().optional(),
	}),
});

const publication = defineCollection({
  loader: glob({ base: "./src/content/publication", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
  	title: z.string().max(200),   // allow long research titles
    year: z.number().int().min(1900).max(2100),
    authors: z.string().optional(),
    venue: z.string().optional(),          // e.g. "Preprint", "NeurIPS Spotlight"
    description: z.string().optional(),
    cover: z.string().optional(),          // e.g. "/publication-covers/infusion.png"
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),

    // outbound links (no internal page needed)
    links: z.object({
      primary: z.string().url(),           // where clicking the card goes
      arxiv: z.string().url().optional(),
      pdf: z.string().url().optional(),
      github: z.string().url().optional(),
    }),
  }),
});

const projects = defineCollection({
	type: "content",
	schema: baseSchema.extend({
		description: z.string(),
		timeline: z.string().optional(),
		github: z.string().url().optional(),
		cover: z.string().optional(),
		order: z.number(),
	}),
});

export const collections = { post, note, tag, publication, projects };
