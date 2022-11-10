import type { NPMSSearch } from 'src/types/npms';

import { requestSearch } from 'src/module/request/client';

import { searchURL } from 'src/utils/url';
import { NOTHING } from 'src/utils/const';

const isContentful = (search: NPMSSearch) => !(
  search.package.name.startsWith('@types/') ||
  search.package.name.endsWith('/types')
);

const sortScore = (searchLeft: NPMSSearch, searchRight: NPMSSearch) => searchRight.searchScore - searchLeft.searchScore;

export const searchNPM = async (name: string) => {
  try {
    const json = await requestSearch(searchURL(name));

    return (json as NPMSSearch[]).filter(isContentful).slice(0, 4).sort(sortScore);
  } catch (ex: unknown) {
    console.error(ex);

    return NOTHING as NPMSSearch[];
  }
};
