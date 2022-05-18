export type NPM = {
  name: string;
  description: string;
  version: string;
};

export type NPMSearch = {
  package: NPM;
  searchScore: number;
};
