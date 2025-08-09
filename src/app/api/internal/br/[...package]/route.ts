import type { NextRequest } from "next/server";
import { brotli } from "#/compressors/brotli";
import { respondInternal } from "#/utils/edge";
import { fetchScript } from "#/utils/esmsh";
import { InternalHeader } from "#/utils/headers";
import { normalizeSize } from "#/utils/size";

// eslint-disable-next-line func-style
export async function GET(req: NextRequest) {
	const buffer = await fetchScript(req.headers.get(InternalHeader.QUERY)!);
	const content = new Uint8Array(buffer);
	const size = await brotli(content);

	return respondInternal(200, String(normalizeSize(size)));
}
