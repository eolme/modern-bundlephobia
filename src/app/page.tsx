import type { Metadata } from "next";
import { metaTitle } from "#/utils/meta";

export const experimental_ppr = true;

// eslint-disable-next-line func-style
export default function RootPage() {
	return null;
}

// eslint-disable-next-line func-style
export async function generateMetadata(): Promise<Metadata> {
	return metaTitle();
}
