import { formatPath } from 'src/utils/format';

export const fullQueryToName = (query: string) => query.slice(0, query.lastIndexOf('@'));

export const fullQueryToVersion = (query: string) => query.slice(query.lastIndexOf('@') + 1);

export const paramsToQuery = (params: string | string[]) => Array.isArray(params) ? params.join('/') : params;

export const queryToFullQuery = (query: string) => query.lastIndexOf('@') <= 0 ? `${query}@latest` : query;

export const pathToName = (path: string) => fullQueryToName(queryToFullQuery(formatPath(path.slice(1))));

export const linkToVersion = (name: string, link: string) => {
  const indexName = link.indexOf(name);
  const indexStart = indexName + name.length + 1;
  const indexEnd = link.indexOf('/', indexStart);

  return link.slice(indexStart, indexEnd);
};
