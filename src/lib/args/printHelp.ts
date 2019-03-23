import kleur from 'kleur';
import { globalValidArguments, ValidArguments, Argument } from './validArguments';

interface ArgumentWithAliases extends Argument {
  aliases: string[];
}

interface ArgumentListWithAliases {
  [key: string]: ArgumentWithAliases;
}

const defaultIntroText = [
  '',
  'dockery [options]',
  '    Runs npm/yarn build and then builds a docker image',
  '',
].join('\n');
const addPrefix = (name: string) => (name.length === 1 ? '-' : '--') + name;
const getArgType = (types?: string[]) => {
  if (!types || !types.length) {
    return '';
  }

  const joined = [...types].sort().join(',');
  switch (joined) {
    case 'boolean':
      return '';

    case 'number,string':
      return kleur.gray('=ALPHANUMERIC');

    case 'string':
      return kleur.gray('=STRING');

    default:
      return kleur.gray('=VALUE');
  }
};

const printHelp = (
  validArguments: ValidArguments = globalValidArguments,
  introText: string = defaultIntroText,
  returnOutput: boolean = false
) => {
  const aliases: { [key: string]: string } = {};
  const args: ArgumentListWithAliases = {};
  const output: string[] = [introText];

  for (const key of Object.keys(validArguments)) {
    const arg = validArguments[key];
    if (arg.alias) {
      aliases[key] = arg.alias;
      continue;
    }

    args[key] = {
      ...arg,
      aliases: [],
    };
  }

  for (const key of Object.keys(aliases)) {
    const argName = aliases[key];
    args[argName].aliases.push(key);
  }

  for (const argEntry of Object.entries(args)) {
    const [argName, arg] = argEntry;
    const argNames = [
      ...arg.aliases.map(addPrefix),
      addPrefix(argName),
    ];

    const printText =
      ` ${argNames.join(' ')}${getArgType(arg.types)}\n`
      + `    ${arg.desc}`;

    output.push(printText);
  }

  output.push('');

  if (returnOutput) {
    return output.join('\n');
  }

  return console.error(output.join('\n'));
};

export default printHelp;
