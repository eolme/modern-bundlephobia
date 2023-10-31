export const fetchFallbackReadme = async (name: string) => {
  const fallback = await (await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`)).json();

  return fallback.collected.metadata.readme as string;
};
