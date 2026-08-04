import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { siteConfig } from "@/site.config";

const options: SatoriOptions = {
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

const logoSvg = fs
	.readFileSync(new URL("../../public/icon.svg", import.meta.url))
	.toString("base64");
const logoDataUri = `data:image/svg+xml;base64,${logoSvg}`;

interface SocialImageProps {
	eyebrow: string;
	title: string;
}

export async function renderSocialImage({ eyebrow, title }: SocialImageProps) {
	const titleSize = title.length > 72 ? "42px" : title.length > 48 ? "50px" : "60px";
	const markup = html`<div
		style="display:flex; flex-direction:column; width:100%; height:100%; background:#f8faf8; color:#1b2e1e;"
	>
		<div style="display:flex; align-items:center; flex:1; padding:56px 64px;">
			<div
				style="display:flex; align-items:center; justify-content:center; width:250px; height:250px; margin-right:56px; background:white; border:3px solid #2b4630; border-radius:28px; box-shadow:14px 14px 0 #1b2e1e;"
			>
				<img src="${logoDataUri}" style="width:220px; height:220px;" />
			</div>
			<div style="display:flex; flex-direction:column; flex:1;">
				<p style="margin:0 0 22px; color:#2b4630; font-size:24px; font-weight:700;">
					${eyebrow}
				</p>
				<h1 style="margin:0; font-size:${titleSize}; line-height:1.15; font-weight:700;">
					${title}
				</h1>
			</div>
		</div>
		<div
			style="display:flex; align-items:center; justify-content:space-between; width:100%; padding:24px 64px; background:#1b2e1e; color:#f8faf8; border-top:8px solid #2b4630; font-size:22px;"
		>
			<p style="margin:0; font-weight:700;">${siteConfig.title}</p>
			<p style="margin:0;">hamzamooraj99.github.io</p>
		</div>
	</div>`;

	const svg = await satori(markup, options);
	return new Uint8Array(new Resvg(svg).render().asPng());
}
