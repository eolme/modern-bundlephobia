import { default as validate } from 'validate-npm-package-name';

const regex = /"(.+?)"/;

export const matchModuleLink = (content: string) => {
  const deep = regex.exec(content);
  return (deep && deep[1]) || null;
};

const toModule = (arr: string | string[]) => Array.isArray(arr) ? arr.join('/') : arr;

const toVersion = (name: string) => name.lastIndexOf('@') <= 0 ? `${name}@latest` : name;

export const toModuleVersion = (arr: string | string[]) => toVersion(toModule(arr));

export const toModuleName = (name: string) => name.slice(0, name.lastIndexOf('@'));

export const isValidModuleName = (name: string) => validate(name).validForNewPackages;
