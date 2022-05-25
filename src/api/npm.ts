import type { NPMSearch } from 'src/types/npm';

import { requestSearch } from 'src/module/request/client';

import { searchURL } from 'src/utils/url';
import { NOTHING } from 'src/utils/const';

const isContentful = (search: NPMSearch) => !(
  search.package.name.startsWith('@types/') ||
  search.package.name.endsWith('/types')
);

const sortScore = (searchLeft: NPMSearch, searchRight: NPMSearch) => searchRight.searchScore - searchLeft.searchScore;

export const searchNPM = async (name: string) => {
  try {
    const json = await requestSearch(searchURL(name));

    return (json.objects as NPMSearch[]).filter(isContentful).slice(0, 4).sort(sortScore);
  } catch (ex: unknown) {
    console.error(ex);

    return NOTHING as NPMSearch[];
  }
};
