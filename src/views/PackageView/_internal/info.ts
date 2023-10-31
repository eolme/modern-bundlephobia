import type { Collected } from './types';

import { RedirectType, redirect } from 'next/navigation';

import { merge, parts } from '#/utils/query';

import { Repository, repo } from './repo';
import { fetcher } from './fetcher';
import { markdown } from './markdown';
import { semverFind } from './semver';
import { fetchFallbackReadme } from './npms';

export const info = async (query: string) => {
  const record = parts(query);
  const pkg = await fetcher(record.name);

  if (record.version in pkg['dist-tags']) {
    record.version = pkg['dist-tags'][record.version];

    return redirect(`/p/${merge(record.name, record.version)}`, RedirectType.replace);
  }

  if (!(record.version in pkg.versions)) {
    const like = semverFind(pkg.versions, record.version, () => true);

    if (like !== null) {
      return redirect(`/p/${merge(record.name, like.version)}`, RedirectType.replace);
    }

    return redirect('/', RedirectType.replace);
  }

  const collected: Collected = {
    name: record.name,
    version: record.version,
    description: '',
    readme: '',
    homepage: null,
    repository: null
  };

  if (pkg.description) {
    collected.description = pkg.description;
  }

  if (pkg.homepage) {
    collected.homepage = pkg.homepage;
  }

  let repositoryType = Repository.UNKNOWN;
  let repositoryPure = '';

  if (typeof pkg.repository === 'string') {
    collected.repository = repo(pkg.repository);

    repositoryType = collected.repository.type;
    repositoryPure = collected.repository.pure;
  } else if (
    pkg.repository &&
    pkg.repository.url
  ) {
    collected.repository = repo(pkg.repository.url);

    repositoryType = collected.repository.type;
    repositoryPure = collected.repository.pure;
  } else {
    collected.repository = null;
  }

  const semver = semverFind(pkg.versions, record.version, (npm) => 'readme' in npm && npm.readme !== '');

  let invalid = true;

  if (
    invalid &&
    semver !== null &&
    semver.readme &&
    semver.readme !== semver.description
  ) {
    try {
      collected.readme = await markdown(
        semver.readme,
        repositoryType,
        repositoryPure
      );

      invalid = false;
    } catch (ex: unknown) {
      invalid = true;
      console.error(ex);
    }
  }

  if (
    invalid &&
    pkg.readme &&
    pkg.readme !== pkg.description
  ) {
    try {
      collected.readme = await markdown(
        pkg.readme,
        repositoryType,
        repositoryPure
      );

      invalid = false;
    } catch (ex: unknown) {
      invalid = true;
      console.error(ex);
    }
  }

  if (invalid) {
    try {
      const readme = await fetchFallbackReadme(pkg.name);

      collected.readme = await markdown(
        readme,
        repositoryType,
        repositoryPure
      );

      invalid = false;
    } catch (ex: unknown) {
      invalid = true;
      console.error(ex);
    }
  }

  if (invalid || !collected.readme) {
    collected.readme = collected.description;
  }

  return collected;
};
