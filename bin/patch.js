const fs = require("node:fs/promises");
const path = require("node:path");
const glob = require("fast-glob");

const patchExports = async (mod, patch) => {
	mod = path.resolve(process.cwd(), "node_modules", mod, "package.json");

	const pkg = JSON.parse(await fs.readFile(mod, "utf8"));

	patch(pkg.exports);

	await fs.writeFile(mod, JSON.stringify(pkg), "utf8");
};

(async () => {
	console.log("patching...");

	await Promise.all([
		patchExports(
			"@vkontakte/vkui",
			(_exports) => (_exports["./dist/cssm/*"] = "./dist/cssm/*"),
		),
		patchExports(
			"@vkontakte/icons",
			(_exports) => (_exports["./dist/*"] = "./dist/*"),
		),
	]);

	const dts = await glob("node_modules/@vkontakte/vkui/dist/**/*.d.ts", {
		ignore: ["**/cssm/**"],
	});

	await Promise.all(
		dts.map(async (ts) =>
			fs.copyFile(ts, ts.replace("vkui/dist/", "vkui/dist/cssm/")),
		),
	);

	console.log("patched!");
})();
