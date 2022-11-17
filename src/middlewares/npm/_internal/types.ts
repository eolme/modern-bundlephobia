export type VersionPart = {
  dist: {
    unpackedSize: number;
  };
};

export type Package = {
  'dist-tags': Record<string, string>;
  modified: string;
  name: string;
  versions: Record<string, VersionPart>;
};
