import { headers } from "next/headers";
import { header } from "#/utils/edge";
import { SecHeader, VercelHeader } from "#/utils/headers";
import { night } from "./_internal/night";
import { timezone } from "./_internal/timezone";

export const theme = async () => {
	const requested = await headers();

	const scheme = header(requested, SecHeader.SCHEME, "no-preference");

	if (scheme !== "no-preference") {
		return scheme;
	}

	const possible = header(requested, VercelHeader.TIMEZONE, "");
	const city = header(requested, VercelHeader.CITY, "");
	const country = header(requested, VercelHeader.COUNTRY, "");

	const dark = night(timezone(possible, city, country));

	return dark ? "dark" : "light";
};
