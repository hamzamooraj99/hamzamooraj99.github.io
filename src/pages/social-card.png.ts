import type { APIContext } from "astro";
import { siteConfig } from "@/site.config";
import { renderSocialImage } from "@/utils/socialImage";

export async function GET(_context: APIContext) {
	const png = await renderSocialImage({
		eyebrow: "Multimodal ML · RAG systems · Research engineering",
		title: siteConfig.title,
	});

	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}
