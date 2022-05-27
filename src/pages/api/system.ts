import type { NextApiRequest, NextApiResponse } from 'next';

import { arch, platform, release } from 'node:os';
import { family, isNonGlibcLinux, version } from 'detect-libc';

import { sendJSON } from 'src/utils/send';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let detectFamily = null;

  try {
    detectFamily = await family();
  } catch {
    detectFamily = null;
  }

  let detectIsNonGlibcLinux = null;

  try {
    detectIsNonGlibcLinux = await isNonGlibcLinux();
  } catch {
    detectIsNonGlibcLinux = null;
  }

  let detectVersion = null;

  try {
    detectVersion = await version();
  } catch {
    detectVersion = null;
  }

  let osArch = null;

  try {
    osArch = arch();
  } catch {
    osArch = null;
  }

  let osPlatform = null;

  try {
    osPlatform = platform();
  } catch {
    osPlatform = null;
  }

  let osRelease = null;

  try {
    osRelease = release();
  } catch {
    osRelease = null;
  }

  sendJSON(res, 200, {
    detectFamily,
    detectIsNonGlibcLinux,
    detectVersion,
    osArch,
    osPlatform,
    osRelease
  });
};

export {
  handler as default
};
