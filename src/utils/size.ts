import { default as bytes } from "pretty-bytes";

export const formatBytes = (value: string) =>
	bytes(Number(value), {
		locale: "en",
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	});

export enum SizeType {
	INSTALL = "in",
	GZIP = "gz",
	BROTLI = "br",
}

export const SizeName = {
	[SizeType.INSTALL]: "install",
	[SizeType.GZIP]: "gzip",
	[SizeType.BROTLI]: "brotli",
} as const;

export const validSize = (size: string | number) => {
	if (
		typeof size === "string" &&
		size.length > 0 &&
		size !== "0" &&
		size !== "NaN"
	) {
		return true;
	}

	if (typeof size === "number" && size === size && size > 0) {
		return true;
	}

	return false;
};

export const normalizeSize = (size: number) =>
	size !== size || size < 0 ? 0 : size;
