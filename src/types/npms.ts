type NPMSScore = {
  detail: {
    maintenance: number;
    popularity: number;
    quality: number;
  };
  final: number;
};

type NPMSAuthor = {
  email: string;
  name: string;
  url: string;
  username: string;
};

type NPMSLinks = {
  bugs: string;
  homepage: string;
  npm: string;
  repository: string;
};

type NPMSDates = {
  from: string;
  to: string;
  count: number;
};

type NPMSRepo = {
  type: string;
  url: string;
};

type NPMSSearchPackage = {
  author: NPMSAuthor;
  date: string;
  description: string;
  keywords: string[];
  links: NPMSLinks;
  maintainers: NPMSAuthor[];
  name: string;
  publisher: NPMSAuthor;
  scope: string;
  version: string;
};

export type NPMSSearch = {
  searchScore: number;
  score: NPMSScore;
  package: NPMSSearchPackage;
};

type NPMSPackageMetadata = {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  author: NPMSAuthor;
  publisher: NPMSAuthor;
  maintainers: NPMSAuthor[];
  repository: NPMSRepo;
  links: NPMSLinks;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  releases: NPMSDates[];
  hasTestScript: boolean;
  readme: string;
};

export type NPMSPackage = {
  analyzedAt: string;
  collected: {

    // TODO: types
    github: unknown;
    metadata: NPMSPackageMetadata;
    npm: {
      downloads: NPMSDates[];
      starsCount: number;
    };
  };

  // TODO: types
  evaluation: unknown;
  score: NPMSScore;
};
