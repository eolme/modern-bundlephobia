export type NPMSearchPackage = {
  name: string;
  description: string;
  version: string;
};

export type NPMSearch = {
  package: NPMSearchPackage;
  searchScore: number;
};

export type NPMPackage = {
  time: {
    modified: string;
  };
  description?: string;
  readme?: string;
  homepage?: string;
  repository?: {
    type: string;
    url: string;
  };
};
