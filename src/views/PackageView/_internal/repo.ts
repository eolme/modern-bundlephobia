export enum Repository {
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket',
  UNKNOWN = 'unknown'
}

const GIT = /^\S+(@|\/\/)|\.git$/g;

const strip = (url: string) => `https://${url.replace(GIT, '')}`;

export const repo = (link: string) => {
  let type = Repository.UNKNOWN;
  let pure = '';

  try {
    const parsed = new URL(link);

    if (parsed.hostname.includes('github')) {
      type = Repository.GITHUB;
    } else if (parsed.hostname.includes('gitlab')) {
      type = Repository.GITLAB;
    } else if (parsed.hostname.includes('bitbucket') || parsed.hostname.includes('atlassian')) {
      type = Repository.BITBUCKET;
    }

    pure = strip(parsed.href);
  } catch (ex: unknown) {
    console.error(ex);
  }

  return {
    type,
    pure,
    link
  };
};

