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
  d: { alias: 'directory' },
  directory: {
    desc: 'Set current work directory',
    types: ['string'],
  },
  e: { alias: 'tag-prefix' },
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
  help: {
    desc: 'Show this help text',
    types: ['boolean'],
  },
  package: {
    desc: 'Set the package name.\nDefault is read from the name field in\nyour '
      + 'package.json',
    types: ['string', 'number'],
  },
  push: {
    desc: 'Push docker image to registry',
    types: ['boolean'],
  },
  repo: {
    desc: 'Set the docker repo.\nDefault is read from the docker-repository '
      + 'field in\nyour package.json',
    types: ['string', 'number'],
  },
  tag: {
    desc: 'Set manual tag name. Default is the package version number.',
    types: ['string', 'number'],
    uniqueGroup: 'tag',
  },
  'tag-prefix': {
    desc: 'Prefix of the generated tag. E.g. "build-". Default is none',
    types: ['string'],
  },
};

export {
  Argument,
  ArgValues,
  globalValidArguments,
  ValidArguments,
};
