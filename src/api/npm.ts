import type { NPMSearch } from 'src/types/npm';

const scope = (a: NPMSearch, b: NPMSearch) => b.searchScore - a.searchScore;

const options: RequestInit = {
  method: 'GET',
  cache: 'no-store',
  credentials: 'omit',
  keepalive: true,
  referrerPolicy: 'no-referrer',
  headers: {
    Accept: 'application/json'   
  }
};

const url = (name: string) => `https://registry.npmjs.org/-/v1/search?size=3&quality=0.0&maintenance=0.0&popularity=1.0&text=${name}`;

export const npm = async (name: string): Promise<NPMSearch[]> => {
  const response = await fetch(url(name), options);

  if (!response.ok) {
    return [];
  }

  const json = await response.json();

  return json.objects.sort(scope);
};
