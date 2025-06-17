import type { Metadata } from "next";
import type { NextRouteParams } from "#/types/next";
import { mergeMetadata, metaImage, metaTitle } from "#/utils/meta";
import { merge } from "#/utils/path";

import { PackageView } from "#/views";

export const runtime = "edge";

export default async function PackagePage({
	params: _params,
}: NextRouteParams) {
	const params = await _params;

	return PackageView(merge(...params.package));
}

// eslint-disable-next-line func-style
export async function generateMetadata({
	params: _params,
}: NextRouteParams): Promise<Metadata> {
	const params = await _params;

	return mergeMetadata(metaTitle(params.package), metaImage(params.package));
}
