import { default as validate } from 'validate-npm-package-name';

export const isValidName = (name: string) => validate(name).validForNewPackages;

// official semver
const regexSemver = /^(?:(0|[1-9]\d*)\.){2}(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const isValidSemver = (version: string) => regexSemver.test(version);

// dist-tag
const regexTag = /\w+/;

export const isValidTag = (tag: string) => regexTag.test(tag);

export const isValidVersion = (version: string) => isValidTag(version) || isValidSemver(version);
