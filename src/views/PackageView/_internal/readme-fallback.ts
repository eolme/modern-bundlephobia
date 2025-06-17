import { ContentType } from "#/utils/headers";

export const fetchReadmeEsmsh = async (
	name: string,
	version: string,
	readmeFilename: string,
): Promise<string | undefined> => {
	try {
		return await (
			await fetch(`https://esm.sh/${name}@${version}/${readmeFilename}`, {
				keepalive: true,
				headers: {
					accept: ContentType.MARKDOWN,
				},
			})
		).text();
	} catch (ex: unknown) {
		console.error(ex);
	}

	try {
		return await (
			await fetch(`https://esm.sh/${name}/${readmeFilename}`, {
				keepalive: true,
				headers: {
					accept: ContentType.MARKDOWN,
				},
			})
		).text();
	} catch (ex: unknown) {
		console.error(ex);
	}

	return undefined;
};

export const fetchReadmeNpms = async (
	name: string,
): Promise<string | undefined> => {
	const npms = await (
		await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`, {
			headers: {
				accept: ContentType.JSON,
			},
		})
	).json();

	return npms?.collected?.metadata?.readme;
};
