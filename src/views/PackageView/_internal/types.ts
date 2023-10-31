import type { Repository } from './repo';

type PackageAuthor = {
  name: string;
  email: string;
  url: string;
};

type PackageRepository = {
  type: string;
  url: string;
};

export type PackageVersion = {
  name: string;
  version: string;
  homepage: string;
  repository: PackageRepository;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  author: PackageAuthor;
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
  _npmUser: PackageAuthor;
  maintainers: PackageAuthor[];
  directories: unknown;
};

export type Package = {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  'dist-tags': Record<string, string>;
  versions: Record<string, PackageVersion>;
  time: {
    created: string;
    modified: string;
  };
  author: PackageAuthor;
  repository: PackageRepository;
  homepage: string;
  _attachments: unknown;
  readme: string;
  readmeFilename: string;
};

export type Collected = {
  name: string;
  version: string;
  description: string;
  readme: string;
  homepage: string | null;
  repository: {
    type: Repository;
    pure: string;
    link: string;
  } | null;
};
