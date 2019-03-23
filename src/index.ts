#!/usr/bin/env node

import collectArguments from './lib/args/collectArguments';
import printHelp from './lib/args/printHelp';

(() => {
  const argv = collectArguments();

  if (argv.help) {
    printHelp();
    process.exit(1);
  }
})();
