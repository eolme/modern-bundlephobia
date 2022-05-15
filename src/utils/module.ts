import { default as validate } from 'validate-npm-package-name';
import { default as semver } from 'semver';

const regexLink = /"(.+?)"/;
const regexTag = /\w+/;

export const matchModuleLink = (content: string) => {
  const deep = regexLink.exec(content);
  return (deep && deep[1]) || null;
};

export const toModuleQuery = (params: string | string[]) => Array.isArray(params) ? params.join('/') : params;

export const toModuleFullQuery = (query: string) => query.lastIndexOf('@') <= 0 ? `${query}@latest` : query;

export const toModuleVersion = (query: string) => {
  const version = query.slice(query.lastIndexOf('@') + 1);
  return isValidModuleTag(version) ? version : (semver.clean(version, true) || version);
};

export const toModuleName = (query: string) => query.slice(0, query.lastIndexOf('@'));

export const isValidModuleName = (name: string) => validate(name).validForNewPackages;

export const isValidModuleTag = (tag: string) => regexTag.test(tag);

export const isValidModuleVersion = (version: string) => isValidModuleTag(version) || !!semver.valid(version, true);

export const fromPath = (path: string) => toModuleName(toModuleFullQuery(path.slice(1)));
