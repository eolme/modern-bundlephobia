import { NPMSearch } from "src/types/npm";

export const label = (npm: NPMSearch) => {
  return {
    value: npm.package.name,
    label: npm.package.name,
    npm
  };
};
