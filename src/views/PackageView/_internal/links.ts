import type { Node } from "unist";
import { visit } from "unist-util-visit";

import { Repository } from "./repo";

type Options = {
	type: Repository;
	pure: string;
};

type LinkNode = Node & {
	type: "link";
	url: string;
};

type ImageNode = Node & {
	type: "image";
	url: string;
};

const normalizeLink = (
	type: Repository,
	pure: string,
	node: LinkNode | ImageNode,
) => {
	if (node.url.length > 0 && node.url[0] === "#") {
		return node.url;
	}

	if (node.url.length > 1 && node.url[0] === "/" && node.url[1] === "#") {
		return node.url.slice(1);
	}

	if (
		node.url.length > 2 &&
		node.url[0] === "." &&
		node.url[1] === "/" &&
		node.url[2] === "#"
	) {
		return node.url.slice(2);
	}

	const pureURL = new URL(pure);
	const ownerRepo = pureURL.pathname.split("/").slice(1, 3).join("/");
	const cleanURL = node.url[0] === "/" ? node.url.slice(1) : node.url;

	if (type === Repository.GITHUB) {
		const base =
			node.type === "link"
				? `${pureURL.origin}/${ownerRepo}/blob/HEAD/`
				: `https://cdn.jsdelivr.net/gh/${ownerRepo}@HEAD/`;
		return new URL(cleanURL, base).href;
	}

	if (type === Repository.GITLAB) {
		const base = `${pureURL.origin}/${ownerRepo}/-/${node.type === "link" ? "blob" : "raw"}/HEAD/`;
		return new URL(cleanURL, base).href;
	}

	if (type === Repository.BITBUCKET) {
		const base = `${pureURL.origin}/${ownerRepo}/${node.type === "link" ? "src" : "raw"}/HEAD/`;
		return new URL(cleanURL, base).href;
	}

	return node.url;
};

export const links = (options: Options) => (tree: Node) => {
	if (options.type === Repository.UNKNOWN || options.pure.length === 0) {
		return;
	}

	visit(tree, (node) => {
		if (
			(node.type === "image" || node.type === "link") &&
			"url" in node &&
			typeof node.url === "string"
		) {
			try {
				node.url = normalizeLink(
					options.type,
					options.pure,
					node as LinkNode | ImageNode,
				);
			} catch {
				// Ignore
			}
		}
	});
};
