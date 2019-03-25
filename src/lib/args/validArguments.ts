interface Argument {
  desc?: string;
  uniqueGroup?: string;
  types?: string[];
  alias?: string;
}

interface ValidArguments {
  [key: string]: Argument;
}

interface ArgValues {
  [key: string]: any;
  _: string[];
}

const globalValidArguments: ValidArguments = {
  s: { alias: 'hash-prefix' },
  d: { alias: 'directory' },
  directory: {
    desc: 'Set current work directory',
    types: ['string'],
  },
  'fail-if-existing': {
    desc: 'Fail if the image already exists',
    types: ['boolean'],
  },
  h: { alias: 'help' },
  hash: {
    desc: 'Use latest commit hash as tag name',
    types: ['boolean'],
    uniqueGroup: 'tag',
  },
  'hash-prefix': {
    desc: 'Prefix of a hash tag. E.g. "build-". Default is none',
    types: ['string'],
  },
  help: {
    desc: 'Show this help text',
    types: ['boolean'],
  },
  push: {
    desc: 'Push docker image to registry',
    types: ['boolean'],
  },
  tag: {
    desc: 'Set manual tag name. Default is the package version number.',
    types: ['string', 'number'],
    uniqueGroup: 'tag',
  },
};

export {
  Argument,
  ArgValues,
  globalValidArguments,
  ValidArguments,
};
