import type { NextRequest } from "next/server";
import { og } from "#/generators/og";
import { respondNothing } from "#/utils/edge";
import { getErrorStatus } from "#/utils/errors";
import { InternalHeader } from "#/utils/headers";
import { fetchInternalSize } from "#/utils/internal";
import { SizeType } from "#/utils/size";

// eslint-disable-next-line func-style
export async function GET(req: NextRequest) {
	try {
		const query = req.headers.get(InternalHeader.QUERY)!;

		const [gz, br] = await Promise.all([
			fetchInternalSize(SizeType.GZIP, query),
			fetchInternalSize(SizeType.BROTLI, query),
		]);

		return og(
			req.headers.get(InternalHeader.NAME)!,
			req.headers.get(InternalHeader.SIZE)!,
			gz,
			br,
		);
	} catch (ex: unknown) {
		console.error(ex);

		return respondNothing(getErrorStatus(ex));
	}
}
