import minimist from 'minimist';

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
  hash: {
    desc: 'Use latest commit hash as tag name',
    types: ['boolean'],
    uniqueGroup: 'tag',
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

const throwTypeError = (argName: string, expectedType: string[], receivedType: string) => {
  if (receivedType === 'boolean') {
    throw new Error(`Expected value for ${argName}`);
  }

  if ( expectedType.length === 1 ) {
    throw new Error(`Expected ${argName} to be of type ${expectedType[0]} but got ${receivedType}`);
  }

  throw new Error(`Expected ${argName} to be one of ${expectedType.join(', ')} but got ${receivedType}`);
};

const collectArguments = (
  argv: {[key: string]: any} = minimist(process.argv.slice(2)),
  validArguments: ValidArguments = globalValidArguments
) => {
  const argKeys = Object.keys(argv);
  const validKeys = Object.keys(validArguments);
  const usedUniqueGroups : { [key: string]: string } = {};

  for (let key of argKeys) {
    if (key === '_') {
      continue;
    }

    const prefix = key.length > 1 ? '--' : '-';

    if (validKeys.indexOf(key) === -1) {
      throw new Error(`Unknown argument '${prefix + key}'. Try dockery --help.`);
    }

    const origKey = key;
    key = validArguments[key].alias || key;
    const {uniqueGroup, types} = validArguments[key];

    if (uniqueGroup && usedUniqueGroups[uniqueGroup]) {
      const usedArgName = usedUniqueGroups[uniqueGroup];
      const usedPrefix = usedArgName.length > 1 ? '--' : '-';
      throw new Error(`Argument ${prefix + key} cannot be used in combination with ${usedPrefix + usedArgName}`);
    }
    else if (uniqueGroup) {
      usedUniqueGroups[uniqueGroup] = key;
    }

    if (types && types.length && types.indexOf(typeof argv[origKey]) === -1) {
      throwTypeError(prefix + origKey, types, typeof argv[origKey]);
    }
  }
  console.log(argv);
};

export default collectArguments;
