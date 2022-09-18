import { default as validate } from 'validate-npm-package-name';

export const isValidName = (name: string) => validate(name).validForNewPackages;

// Official semver
const regexSemver = /^(?:(0|[1-9]\d*)\.){2}(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*))?(?:\+([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?$/;

const isValidSemver = (version: string) => regexSemver.test(version);

// Dist-tag
const regexTag = /\w+/;

export const isValidTag = (tag: string) => regexTag.test(tag);

export const isValidVersion = (version: string) => isValidTag(version) || isValidSemver(version);
