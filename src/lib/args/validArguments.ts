interface ValidArguments {
  [key: string]: {
    desc?: string;
    uniqueGroup?: string;
    types?: string[];
    alias?: string;
  };
}

const globalValidArguments: ValidArguments = {
  d: {alias: 'directory'},
  directory: {
    desc: 'Set current work directory',
    types: ['string'],
  },
  h: {alias: 'help'},
  hash: {
    desc: 'Use latest commit hash as tag name',
    types: ['boolean'],
    uniqueGroup: 'tag',
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
    desc: 'Set manual tag name',
    types: ['string', 'number'],
    uniqueGroup: 'tag',
  },
};

export { ValidArguments, globalValidArguments };
