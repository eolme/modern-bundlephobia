import type { NextRequest } from "next/server";
import { badge, error } from "#/generators/badge";
import { respondNothing, respondSVG } from "#/utils/edge";
import { getErrorStatus } from "#/utils/errors";
import { InternalHeader } from "#/utils/headers";
import { fetchInternalSize } from "#/utils/internal";
import { SizeName, SizeType, validSize } from "#/utils/size";

export const runtime = "edge";

type NextRouteParams = {
	params: Promise<{
		type: string;
		package: string[];
	}>;
};

// eslint-disable-next-line func-style
export async function GET(
	req: NextRequest,
	{ params: _params }: NextRouteParams,
) {
	const params = await _params;

	if (params.type in SizeName) {
		const type = params.type as SizeType;

		try {
			let size: string;

			if (type === SizeType.INSTALL) {
				size = req.headers.get(InternalHeader.SIZE)!;
			} else {
				size = await fetchInternalSize(
					type,
					req.headers.get(InternalHeader.QUERY)!,
				);
			}

			return respondSVG(
				200,
				validSize(size) ? badge(type, size) : error(type, 424),
			);
		} catch (ex: unknown) {
			console.error(ex);

			return respondSVG(200, error(type, getErrorStatus(ex)));
		}
	}

	return respondNothing(404);
}
