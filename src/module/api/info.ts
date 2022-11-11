import type { NPMPackage } from 'src/types/npm';
import { EMPTY, Repository } from 'src/utils/const';

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
  packageFullURL
} from 'src/utils/url';

import { repo } from 'src/utils/repo';

type Collected = {
  description: string;
  readme: string;

  homepage: string | null;
  repository: {
    type: Repository;
    pure: string;
    link: string;
  } | null;
};

export const loadInfo = async (name: string, version: string) => {
  const info = await requestPackage<NPMPackage>(packageFullURL(name));

  const collected: Collected = {
    description: '',
    readme: '',
    homepage: null,
    repository: {
      type: Repository.UNKNOWN,
      pure: '',
      link: ''
    }
  };

  if (info.description) {
    collected.description = info.description;
  }

  if (info.homepage) {
    collected.homepage = info.homepage;
  }

  if (
    info.repository &&
    info.repository.url
  ) {
    collected.repository = repo(info.repository.url);
  }

  const semver = semverFind(info.versions, version, (npm) => 'readme' in npm && npm.readme !== '');

  if (semver !== null) {
    try {
      collected.readme = await markdown(
        semver.readme!,
        collected.repository!.type,
        collected.repository!.link
      );
    } catch (ex: unknown) {
      console.error(ex);
    }
  } else if (info.readme) {
    try {
      collected.readme = await markdown(
        info.readme,
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

  if (collected.repository!.pure === EMPTY) {
    collected.repository = null;
  }

  return collected;
};
