const fs = require('node:fs/promises');
const glob = require('fast-glob');

/**
 * @param {string} version 
 * @returns {[number,number,number]}
 */
const toSemver = (version) => version.split('-')[0].split('.').map(Number);

/**
 * @param {string} left 
 * @param {string} right 
 * @returns {number}
 */
const compareString = (left, right) => String.prototype.localeCompare.call(left, right);

/**
 * @param {string} left 
 * @param {string} right 
 * @returns {number}
 */
const compareSemver = (left, right) => {
  const semverLeft = toSemver(left);
  const semverRight = toSemver(right);

  const major = semverLeft[0] - semverRight[0];

  if (major !== 0) {
    return major;
  }

  const minor = semverLeft[1] - semverRight[1];

  if (minor !== 0) {
    return minor;
  }

  const patch = semverLeft[2] - semverRight[2];

  if (patch !== 0) {
    return patch;
  }

  return left.length - right.length;
};

const strip = (repo) => {
  repo = repo.replace(/^(?:git\+)?(?:ssh|git|https?|file)?:?/, '');
  repo = repo.replace(/(?:\.git)?$/, '');
  
  if (repo.startsWith('//')) {
    repo = `https:${repo}`;
  } else {
    repo = `https://github.com/${repo}`;
  }

  return repo;
};

const stringify = (author) => {
  if (typeof author === 'string') {
    author = author.replaceAll('<', '&lt;');
    author = author.replaceAll('>', '&gt;');

    return author.trim();
  }

  if (typeof author === 'object' && author !== null) {
    let result = author.name || '';
    
    if (author.email) {
      result += ` &lt;${author.email}&gt;`;
    }

    if (author.url) {
      result += ` (${author.url})`;
    }

    return result.trim();
  }

  return '';
};

(async () => {
  console.log('searching...');

  const packages = await glob('node_modules/**/package.json', {
    ignore: [
      '**/test/**',
      '**/tests/**',
      '**/__test__/**',
      '**/__tests__/**',
      '**/fixture/**',
      '**/fixtures/**',
      '**/__fixture__/**',
      '**/__fixtures__/**',
      '**/e2e/**',
      '**/bin/**',
      '**/.bin/**'
    ]
  });

  const all = (await Promise.all(
    packages.map(async (path) => {
      console.log('found:', path);

      const file = await fs.readFile(path, { encoding: 'utf8' });

      try {
        return JSON.parse(file);
      } catch (ex) {
        console.error('malformed:', path);
      }

      return null;
    })
  ));

  const pairs = [];

  const safe = all.filter((json) => {
    if (json !== null && typeof json.name === 'string' && typeof json.version === 'string') {
      const query = `${json.name}@${json.version}`;
      if (pairs.includes(query)) {
        console.log('duplicate:', query);
        return false;
      }
      pairs.push(query);
      return true;
    }
    return false;
  });

  const licenses = safe.map((json) => {
    return {
      name: json.name,
      version: json.version,
      author: stringify(json.author),
      license: json.license || '',
      repository: strip(json.repository && (json.repository.url || json.repository) || '')
    };
  });

  licenses.sort((left, right) => {
    const name = compareString(left.name, right.name);

    if (name !== 0) {
      return name;
    }

    const version = compareSemver(left.version, right.version);

    if (version !== 0) {
      return version;
    }

    return 0;
  });

  let result = '';

  licenses.forEach((json) => {
    result += `<tr><td>${json.name}</td><td>${json.version}</td><td>${json.author}</td><td>${json.license}</td><td>${json.repository}</td></tr>`;
  });

  let template = await fs.readFile('src/assets/template/licenses.html', { encoding: 'utf8' });
  
  template = template.replace(/[ ]+/g, ' ');
  template = template.replace(/>\s+</g, '><');
  template = template.replace(/(\r?\n)+/g, '');

  await fs.writeFile('public/licenses.html', template.replace('<!---->', result), { encoding: 'utf8' });
})();
