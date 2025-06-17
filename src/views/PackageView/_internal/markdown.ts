// @ts-expect-error missing types
import { default as ally } from "@fec/remark-a11y-emoji";
import { default as highlight } from "rehype-highlight";
import { default as inline } from "rehype-raw";
import { default as stringify } from "rehype-stringify";
import { remark } from "remark";
import { default as emoji } from "remark-emoji";
import { default as gfm } from "remark-gfm";
import { default as parse } from "remark-parse";
import { default as rehype } from "remark-rehype";
import { alias } from "./highlight";
import { links } from "./links";
import type { Repository } from "./repo";

export const markdown = async (
	content: string,
	type: Repository,
	pure: string,
) => {
	return new Promise<string>((resolve, reject) => {
		remark()
			.use(parse, { commonmark: true })
			.use(gfm)
			.use(links, {
				type,
				pure,
			})
			.use(emoji)
			.use(ally)
			.use(rehype, { allowDangerousHtml: true })
			.use(inline)
			.use(highlight, {
				aliases: alias,
			})
			.use(stringify, { closeSelfClosing: true })
			.process(content, (error, file) => {
				if (error || !file) {
					reject(error);

					return;
				}

				resolve(
					typeof file.value === "string"
						? file.value
						: Buffer.from(file.value.buffer).toString("utf8"),
				);
			});
	});
};
