const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  console.log('patching...');

  const modPath = path.resolve(
    process.cwd(),
    'node_modules',
    'next',
    'dist',
    'esm',
    'shared',
    'lib',
    'router',
    'utils',
    'sorted-routes.js'
  );

  let mod = await fs.readFile(modPath, 'utf8');

  mod = mod.replace(/.*Catch-all must be the last part of the URL.*/, '');

  await fs.writeFile(modPath, mod, 'utf8');

  console.log('patched!');
})();
