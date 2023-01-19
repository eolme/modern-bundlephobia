export type Author = string | {
  name: string;
  email: string;
  url: string;
};

export type Repository = string | {
  type: string;
  url: string;
};

export type Version = {
  name: string;
  version: string;
  homepage: string;
  repository: Repository;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  author: string | {
    name: string;
    email: string;
    url: string;
  };
  license: string;
  readme: string;
  readmeFilename: string;
  _id: string;
  description: string;
  dist: {
    shasum: string;
    tarball: string;
  };
  _npmVersion: string;
  _npmUser: {
    name: string;
    email: string;
  };
  maintainers: Author[];
  directories: unknown;
};

export type Package = {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  'dist-tags': unknown;
  versions: Version[];
  time: {
    created: string;
    modified: string;
  };
  author: Author;
  repository: Repository;
  _attachments: unknown;
  readme: string;
};

export type SearchObject = {
  package: Version;
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
};

export type Search = {
  objects: SearchObject[];
  total: number;
  time: number;
};
