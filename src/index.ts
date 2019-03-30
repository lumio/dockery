#!/usr/bin/env node

import kleur from 'kleur';
import path from 'path';

import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';
import buildImage from './lib/docker/buildImage';
import checkIfImageExists from './lib/docker/checkIfImageExists';
import generateTag from './lib/docker/generateTag';
import pushImage from './lib/docker/pushImage';
import removeImage from './lib/docker/removeImage';
import failOnError from './lib/failOnError';
import buildPackage from './lib/node/buildPackage';

process.on('unhandledRejection', (reason, p) => {
  console.error(kleur.red('Unhandled Rejection at: Promise'), p);
  console.error(kleur.yellow('Reason:'), reason);
  process.exit(1);
});

const log = (message: string, quiet?: boolean) =>
  void (!quiet && console.log(message));

failOnError(async () => {
  const argv = await collectArguments();
  const cwd = path.resolve(argv.directory || process.cwd());
  const quiet = argv.quiet || false;

  if (argv.help) {
    printHelp();
    process.exit(1);
  }

  const tag = await generateTag(argv, cwd);
  const overwriteImage = !!argv.force;
  const image = await checkIfImageExists(tag, cwd, !overwriteImage);
  if (overwriteImage && image) {
    log(kleur.gray(`Removing existing image ${kleur.bold(image)}...`), quiet);
    await removeImage(image, cwd);
  }
  else {
    throw new Error('Existing image check failed');
  }

  log(kleur.gray('Building package...'), quiet);
  await buildPackage(cwd, quiet);
  log(kleur.gray('Building image...'), quiet);
  await buildImage(tag, cwd, quiet);

  if (argv.push) {
    log(kleur.gray('Pushing docker image to hub...'), quiet);
    await pushImage(tag, cwd, quiet);
  }

  log(kleur.green('Finished'), quiet);
});
