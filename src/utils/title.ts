import { merge } from '#/utils/path';

const appTitle = 'Modern BundlePhobia';

export const title = (...parts: string[]) => parts.length === 0 ? appTitle : `${appTitle} | ${merge(...parts)}`;
