#!/usr/bin/env node

import kleur from 'kleur';
import path from 'path';
import failOnError from './lib/failOnError';
import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';
import getHash from './lib/getHash';

(async () => {
  const argv = failOnError(collectArguments);
  const cwd = path.resolve(argv.directory || process.cwd());

  if (argv.help) {
    printHelp();
    process.exit(1);
  }

  const hash = await getHash(cwd);
  console.log(hash);
})();
