#!/usr/bin/env node

import kleur from 'kleur';
import path from 'path';

import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';
import buildImage from './lib/buildImage';
import buildPackage from './lib/buildPackage';
import failOnError from './lib/failOnError';
import generateTag from './lib/generateTag';

process.on('unhandledRejection', (reason, p) => {
  console.error(kleur.red('Unhandled Rejection at: Promise'), p);
  console.error(kleur.yellow('Reason:'), reason);
  process.exit(1);
});

(async () => {
  const argv = await failOnError(collectArguments);
  const cwd = path.resolve(argv.directory || process.cwd());
  const quiet = argv.quiet || false;

  if (argv.help) {
    printHelp();
    process.exit(1);
  }

  const tag = await failOnError(generateTag, argv, cwd);
  await failOnError(buildPackage, cwd, quiet);
  await failOnError(buildImage, tag, cwd, quiet);

  !quiet && console.log(kleur.green('Finished'));
})();
