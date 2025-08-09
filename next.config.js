/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const analyze = require("@next/bundle-analyzer");
const rspack = require("next-rspack");
const compose = require("next-compose-plugins");

/**
 * @type {import('next').NextConfig}
 */
const next = {
	trailingSlash: true,

	reactStrictMode: process.env.NODE_ENV === "production",

	productionBrowserSourceMaps: true,

	transpilePackages: ["@vkontakte/vkui"],
	modularizeImports: {
		"@vkontakte/vkui": {
			transform: "@vkontakte/vkui/dist/cssm",
			skipDefaultConversion: true,
		},
	},

	// turbopack: {
	//   rules: {
	//     "*.svg": {
	//       loaders: ["raw-loader"],
	//       as: "*.js",
	//     },
	//   },
	// },

	webpack(config, context) {
		// Load svg as string
		config.module.rules.unshift({
			test: /\.svg$/,
			type: "asset/source",
			issuer: {
				not: /\.(css|scss|sass)$/,
			},
			dependency: {
				not: ["url"],
			},
		});

		if (!context.dev && !context.isServer) {
			config.optimization.removeAvailableModules = true;
			config.optimization.usedExports = "global";

			let frameworkTest =
				config.optimization.splitChunks.cacheGroups.framework.test;
			const libTest = config.optimization.splitChunks.cacheGroups.lib.test;

			delete config.optimization.splitChunks.cacheGroups.framework.layer;
			config.optimization.splitChunks.cacheGroups.framework.reuseExistingChunk = true;

			frameworkTest = new RegExp(
				frameworkTest.source.replaceAll(
					"react|react-dom",
					"react|react-dom|react-server-dom-webpack|scheduler",
				),
			);
			config.optimization.splitChunks.cacheGroups.framework.test =
				frameworkTest;

			config.optimization.splitChunks.cacheGroups.lib.test = new RegExp(
				`(?!${frameworkTest.source})(?:${libTest.source})`,
			);
		}

		return config;
	},

	experimental: {
		useLightningcss: true,
		cssChunking: "strict",

		appDocumentPreloading: true,

		optimisticClientCache: true,

		fullySpecified: false,

		optimizeServerReact: true,
		serverMinification: true,

		serverSourceMaps: true,
		enablePrerenderSourceMaps: true,

		// Force react-experimental
		ppr: "incremental",
		viewTransition: true,
	},
	async headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Accept-CH",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
					{
						key: "Vary",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
					{
						key: "Critical-CH",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
				],
			},
			{
				source: "/p/:path*",
				headers: [
					{
						key: "Accept-CH",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
					{
						key: "Vary",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
					{
						key: "Critical-CH",
						value: "Sec-CH-Prefers-Color-Scheme",
					},
				],
			},
		];
	},
	env: {
		NEXT_PUBLIC_HOST:
			process.env.NEXT_PUBLIC_HOST ||
			(process.env.NEXT_PUBLIC_VERCEL_URL
				? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
				: "http://localhost:3000"),
		NEXT_PUBLIC_ANALYTICS:
			process.env.NEXT_PUBLIC_ANALYTICS ||
			(process.env.NODE_ENV === "production"
				? "/_vercel/insights/script.js"
				: "https://cdn.vercel-insights.com/v1/script.debug.js"),
	},
};

module.exports = compose(
	[rspack, analyze({ enabled: process.env.ANALYZE === "1" })],
	next,
);
