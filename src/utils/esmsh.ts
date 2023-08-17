import { ModuleErrorType, fail } from '#/utils/errors';
import { ContentType } from '#/utils/headers';

const baseURL = 'https://esm.sh/';
const entryURL = (query: string) => `${baseURL}stable/${query}?target=node&bundle`;

const regexScriptLink = /export\s*(?:\*|{\s*default\s*})\s*from\s*["'](.+?)["']/;

const contentURL = (script: string) => {
  const exec = regexScriptLink.exec(script);

  const execMatch = exec === null ? '/' : exec[1] || '/';

  const execURL = new URL(execMatch, baseURL);

  return execURL.href;
};

const fetchEntryScript = async (url: string) => {
  const response = await fetch(url, {
    keepalive: true,
    headers: {
      accept: ContentType.JS
    }
  });

  if (!response.ok) {
    fail(ModuleErrorType.CONNECTION, url, response.status);
  }

  return response.text();
};

const fetchContentScript = async (url: string) => {
  if (url.length === 0 || url === baseURL) {
    fail(ModuleErrorType.EMPTY, url, 412);
  }

  const response = await fetch(url, {
    keepalive: true,
    headers: {
      accept: ContentType.JS
    }
  });

  if (!response.ok) {
    fail(ModuleErrorType.CONNECTION, url, response.status);
  }

  return response.arrayBuffer();
};

export const fetchScript = async (query: string) => {
  return fetchContentScript(contentURL(await fetchEntryScript(entryURL(query))));
};
