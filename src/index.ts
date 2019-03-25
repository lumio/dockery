#!/usr/bin/env node

import kleur from 'kleur';
import path from 'path';

import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';
import failOnError from './lib/failOnError';
import generateTag from './lib/generateTag';
import getHash from './lib/getHash';

(async () => {
  const argv = await failOnError(collectArguments);
  const cwd = path.resolve(argv.directory || process.cwd());

  if (argv.help) {
    printHelp();
    process.exit(1);
  }

  const tag = await failOnError(() => generateTag(argv, cwd));
  console.log(tag);
})();
