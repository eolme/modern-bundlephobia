import { default as validate } from 'validate-npm-package-name';

const regexLink = /"(.+?)"/;
const regexTag = /\w+/;
const regexSemver = /^(?:(0|[1-9]\d*)\.){2}(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const semverValid = (version: string) => regexSemver.test(version);

export const matchModuleLink = (content: string) => {
  const deep = regexLink.exec(content);
  return (deep && deep[1]) || null;
};

export const toModuleQuery = (params: string | string[]) => Array.isArray(params) ? params.join('/') : params;

export const toModuleFullQuery = (query: string) => query.lastIndexOf('@') <= 0 ? `${query}@latest` : query;

export const toModuleVersion = (query: string) => query.slice(query.lastIndexOf('@') + 1);

export const toModuleName = (query: string) => query.slice(0, query.lastIndexOf('@'));

export const isValidModuleName = (name: string) => validate(name).validForNewPackages;

export const isValidModuleTag = (tag: string) => regexTag.test(tag);

export const isValidModuleVersion = (version: string) => isValidModuleTag(version) || semverValid(version);

export const fromPath = (path: string) => toModuleName(toModuleFullQuery(path.slice(1)));
