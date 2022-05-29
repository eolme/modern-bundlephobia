import type { NPMSPackage } from 'src/types/npms';
import type { NPMPackage } from 'src/types/npm';

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
  homepageURL,
  packageFullURL,
  packageURL
} from 'src/utils/url';

export const loadInfo = async (name: string, version: string) => {
  const info = await requestPackage<NPMSPackage>(packageURL(name));
  const fullInfoPromise = requestPackage<NPMPackage>(packageFullURL(name));

  const collected = {
    description: '',
    readme: '',
    homepage: '',
    repository: ''
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
      collected.repository = info.collected.metadata.links.repository;
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
      collected.repository = fullInfo.repository.url;
    }
  }

  if (!collected.homepage) {
    collected.homepage = homepageURL(name);
  }

  return collected;
};
