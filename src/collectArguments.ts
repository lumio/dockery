import minimist from 'minimist';

interface ValidArguments {
  [key: string]: {
    desc?: string;
    alias?: string;
  };
}

const globalValidArguments: ValidArguments = {
  d: { alias: 'directory' },
  directory: { desc: 'Set current work directory' },
  hash: { desc: 'Use latest commit hash as tag name' },
  push: { desc: 'Push docker image to registry' },
  tag: { desc: 'Set manual tag name' },
};

const collectArguments = (
  argv: {[key: string]: any} = minimist(process.argv.slice(2)),
  validArguments: ValidArguments = globalValidArguments
) => {
  const argKeys = Object.keys(argv);
  const validKeys = Object.keys(validArguments);

  for (const key of argKeys) {
    if (key !== '_' && validKeys.indexOf(key) === -1) {
      const prefix = key.length > 1 ? '--' : '-';
      throw new Error(`Unknown argument '${prefix + key}'. Try dockery --help.`);
    }
  }
  console.log(argv);
};

export default collectArguments;
