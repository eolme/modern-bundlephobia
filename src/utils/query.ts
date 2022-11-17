export const merge = (name: string, version: string) => `${name}@${version}`;

export const parts = (query: string) => {
  const last = query.lastIndexOf('@');

  return last <= 0 ?
    {
      name: query,
      version: 'latest'
    } :
    {
      name: query.slice(0, last),
      version: query.slice(last + 1)
    };
};

export const redirect = (url: string, version: string, rewrite: string) => {
  return url.endsWith(version) ? url.replace(version, rewrite) : `${url}@${rewrite}`;
};
