import { RedirectType, redirect } from "next/navigation";
import { merge, parts } from "#/utils/query";
import { fetcher } from "./fetcher";
import { markdown } from "./markdown";
import { fetchReadmeEsmsh, fetchReadmeNpms } from "./readme-fallback";
import { Repository, repo } from "./repo";
import { semverFind } from "./semver";
import type { Collected } from "./types";

const validReadme = (readme: string | undefined): readme is string =>
	typeof readme === "string" &&
	readme.length > 0 &&
	!readme.startsWith("ERROR");

export const info = async (query: string) => {
	const record = parts(query);
	const pkg = await fetcher(record.name);

	if (record.version in pkg["dist-tags"]) {
		record.version = pkg["dist-tags"][record.version];

		return redirect(
			`/p/${merge(record.name, record.version)}`,
			RedirectType.replace,
		);
	}

	if (!(record.version in pkg.versions)) {
		const like = semverFind(pkg.versions, record.version, () => true);

		if (like !== null) {
			return redirect(
				`/p/${merge(record.name, like.version)}`,
				RedirectType.replace,
			);
		}

		return redirect("/", RedirectType.replace);
	}

	const collected: Collected = {
		name: record.name,
		version: record.version,
		description: "",
		readme: "",
		homepage: null,
		repository: null,
	};

	if (pkg.description) {
		collected.description = pkg.description;
	}

	if (pkg.homepage) {
		collected.homepage = pkg.homepage;
	}

	let repositoryType = Repository.UNKNOWN;
	let repositoryPure = "";

	if (typeof pkg.repository === "string") {
		collected.repository = repo(pkg.repository);

		repositoryType = collected.repository.type;
		repositoryPure = collected.repository.pure;
	} else if (pkg.repository?.url) {
		collected.repository = repo(pkg.repository.url);

		repositoryType = collected.repository.type;
		repositoryPure = collected.repository.pure;
	} else {
		collected.repository = null;
	}

	if (collected.homepage === collected.repository?.pure) {
		collected.homepage = null;
	}

	const semver = semverFind(
		pkg.versions,
		record.version,
		(npm) => "readme" in npm && validReadme(npm.readme),
	);

	let invalid = true;

	if (
		invalid &&
		semver !== null &&
		semver.readme &&
		semver.readme !== semver.description
	) {
		try {
			collected.readme = await markdown(
				semver.readme,
				repositoryType,
				repositoryPure,
			);

			invalid = false;
		} catch (ex: unknown) {
			invalid = true;
			console.error(ex);
		}
	}

	if (
		invalid &&
		pkg.readme &&
		pkg.readme !== pkg.description &&
		validReadme(pkg.readme)
	) {
		try {
			collected.readme = await markdown(
				pkg.readme,
				repositoryType,
				repositoryPure,
			);

			invalid = false;
		} catch (ex: unknown) {
			invalid = true;
			console.error(ex);
		}
	}

	if (invalid && pkg.readmeFilename) {
		try {
			const readme = await fetchReadmeEsmsh(
				pkg.name,
				record.version,
				pkg.readmeFilename,
			);

			if (validReadme(readme)) {
				collected.readme = await markdown(
					readme,
					repositoryType,
					repositoryPure,
				);
				invalid = false;
			} else {
				invalid = true;
			}
		} catch (ex: unknown) {
			invalid = true;
			console.error(ex);
		}
	}

	if (invalid) {
		try {
			const readme = await fetchReadmeNpms(pkg.name);

			if (validReadme(readme)) {
				collected.readme = await markdown(
					readme,
					repositoryType,
					repositoryPure,
				);
				invalid = false;
			} else {
				invalid = true;
			}
		} catch (ex: unknown) {
			invalid = true;
			console.error(ex);
		}
	}

	if (invalid) {
		try {
			const readme = collected.description;

			if (validReadme(readme)) {
				collected.readme = await markdown(
					readme,
					repositoryType,
					repositoryPure,
				);
				invalid = false;
			} else {
				invalid = true;
			}
		} catch (ex: unknown) {
			invalid = true;
			console.error(ex);
		}
	}

	if (invalid || !collected.readme) {
		collected.readme = collected.description;
	}

	return collected;
};
