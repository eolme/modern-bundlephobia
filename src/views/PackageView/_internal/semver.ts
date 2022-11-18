import type { PackageVersion } from './types';

type Semver = [number, number, number];

const toSemver = (version: string) => version.split('-')[0].split('.').map(Number) as Semver;

export const semverFind = (
  versions: Record<string, PackageVersion>,
  version: string,
  find: (npm: PackageVersion) => boolean
) => {
  if (version in versions && find(versions[version])) {
    return versions[version];
  }

  const match = toSemver(version);

  const findable: string[] = [];

  for (const ver in versions) {
    if (find(versions[ver])) {
      findable.push(ver);
    }
  }

  let major = 0;
  let minor = 0;
  let patch = 0;

  const matched = findable
    .map((ver) => ({
      version: ver,
      semver: toSemver(ver)
    }))
    .filter((constraint) => constraint.semver[0] === match[0])
    .sort((left, right) => {
      major = right.semver[0] - left.semver[0];

      if (major === 0) {
        minor = right.semver[1] - left.semver[1];

        if (minor === 0) {
          patch = right.semver[2] - left.semver[2];

          if (patch === 0) {
            return left.version.length - right.version.length;
          }

          return patch;
        }

        return minor;
      }

      return major;
    });

  if (matched.length === 0) {
    return null;
  }

  return versions[matched[0].version];
};
