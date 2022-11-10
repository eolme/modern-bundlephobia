import type { NPMSPackage } from 'src/types/npms';
import type { NPMPackage } from 'src/types/npm';
import type { Repository } from 'src/utils/const';

import {
  markdown
} from 'src/module/markdown';

import {
  requestPackage
} from 'src/module/request/server';

import {
  semverFind
} from 'src/module/semver';

import {
  packageFullURL,
  packageURL
} from 'src/utils/url';

import { repo } from 'src/utils/repo';

type Collected = {
  description: string;
  readme: string;

  homepage: string | null;
  repository: {
    type: Repository;
    link: string;
  } | null;
};

export const loadInfo = async (name: string, version: string) => {
  const info = await requestPackage<NPMSPackage>(packageURL(name));
  const fullInfoPromise = requestPackage<NPMPackage>(packageFullURL(name));

  let repository = '';

  const collected: Collected = {
    description: '',
    readme: '',
    homepage: null,
    repository: null
  };

  if (info.collected.metadata.description) {
    collected.description = info.collected.metadata.description;
  } else {
    const fullInfo = await fullInfoPromise;

    if (fullInfo.description) {
      collected.description = fullInfo.description;
    }
  }

  if (info.collected.metadata.readme) {
    try {
      collected.readme = markdown(info.collected.metadata.readme);
    } catch (ex: unknown) {
      console.error(ex);
    }
  } else {
    const fullInfo = await fullInfoPromise;

    if (fullInfo.readme) {
      try {
        collected.readme = markdown(fullInfo.readme);
      } catch (ex: unknown) {
        console.error(ex);
      }
    } else {
      const semver = semverFind(fullInfo.versions, version, (npm) => 'readme' in npm && npm.readme !== '');

      if (semver !== null) {
        try {
          collected.readme = markdown(semver.readme!);
        } catch (ex: unknown) {
          console.error(ex);
        }
      }
    }
  }

  if (!collected.readme) {
    collected.readme = collected.description;
  }

  if (info.collected.metadata.links) {
    if (info.collected.metadata.links.repository) {
      repository = info.collected.metadata.links.repository;
    }

    if (info.collected.metadata.links.homepage) {
      collected.homepage = info.collected.metadata.links.homepage;
    }
  }

  if (!collected.repository) {
    const fullInfo = await fullInfoPromise;

    if (
      fullInfo.repository &&
      fullInfo.repository.url
    ) {
      repository = fullInfo.repository.url;
    }
  }

  if (repository) {
    collected.repository = repo(repository);
  }

  return collected;
};
