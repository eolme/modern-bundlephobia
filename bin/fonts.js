const fs = require('node:fs/promises');
const { resolve } = require('path');

const folder = resolve(process.cwd(), 'src/assets/fonts');

(async () => {
  const fonts = await fs.readdir(folder, { encoding: 'utf8' });

  await Promise.all(
    fonts.map(async (name) => {
      if (name.endsWith('ttf')) {
        const file = resolve(folder, name);

        const buffer = await fs.readFile(file);
        const raw = Array.from(new Uint8Array(buffer.buffer));
        const content = `const encoded = new Uint8Array(${JSON.stringify(raw)});\n\nexport { encoded as default };`;

        await fs.writeFile(file.replace('ttf', 'ts'), content, { encoding: 'utf8' });
      }
    })
  )
})();
