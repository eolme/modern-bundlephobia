import type { NPMSearch } from 'src/types/npm';

const scope = (a: NPMSearch, b: NPMSearch) => b.searchScore - a.searchScore;

export const npm = async (name: string): Promise<NPMSearch[]> => {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?size=8&quality=0.0&maintenance=0.0&popularity=1.0&text=${name}`);

  if (!response.ok) {
    return [];
  }

  const json = await response.json();

  return json.objects.sort(scope);
};
