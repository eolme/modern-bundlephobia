import type { Collected } from './types';

import { redirect } from 'next/navigation';

import { merge, parts } from '#/utils/query';

import { Repository, repo } from './repo';
import { fetcher } from './fetcher';
import { markdown } from './markdown';
import { semverFind } from './semver';

export const info = async (query: string) => {
  const record = parts(query);
  const pkg = await fetcher(record.name);

  if (record.version in pkg['dist-tags']) {
    record.version = pkg['dist-tags'][record.version];

    redirect(`/p/${merge(record.name, record.version)}`);
  }

  if (!(record.version in pkg.versions)) {
    const like = semverFind(pkg.versions, record.version, () => true);

    if (like !== null) {
      redirect(`/p/${merge(record.name, like.version)}`);
    }

    redirect('/');
  }

  const collected: Collected = {
    name: record.name,
    version: record.version,
    description: '',
    readme: '',
    homepage: null,
    repository: {
      type: Repository.UNKNOWN,
      pure: '',
      link: ''
    }
  };

  if (pkg.description) {
    collected.description = pkg.description;
  }

  if (pkg.homepage) {
    collected.homepage = pkg.homepage;
  }

  if (typeof pkg.repository === 'string') {
    collected.repository = repo(pkg.repository);
  } else if (
    pkg.repository &&
    pkg.repository.url
  ) {
    collected.repository = repo(pkg.repository.url);
  }

  const semver = semverFind(pkg.versions, record.version, (npm) => 'readme' in npm && npm.readme !== '');

  if (semver !== null) {
    try {
      collected.readme = await markdown(
        semver.readme,
        collected.repository!.type,
        collected.repository!.link
      );
    } catch (ex: unknown) {
      console.error(ex);
    }
  } else if (pkg.readme) {
    try {
      collected.readme = await markdown(
        pkg.readme,
        collected.repository!.type,
        collected.repository!.link
      );
    } catch (ex: unknown) {
      console.error(ex);
    }
  }

  if (!collected.readme) {
    collected.readme = collected.description;
  }

  if (collected.repository!.pure.length === 0) {
    collected.repository = null;
  }

  return collected;
};
