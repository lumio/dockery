import kleur from 'kleur';
import printHelp from './printHelp';

describe('printHelp', () => {
  it('transforms argument schema to help text', () => {
    const validArgs = {
      abc: {
        desc: 'Hello world',
        types: ['boolean'],
      },
      bar: {
        desc: 'Hello world',
        types: ['string', 'number'],
      },
      c: {
        desc: '',
        types: ['string'],
      },
      d: {
        desc: '',
        types: ['object'],
      },
      foo: { alias: 'bar' },
      test: {
        desc: '',
      },
    };
    expect(printHelp(validArgs, '', true)).toBe([
      '',
      ' --abc',
      '    Hello world',
      ` --foo --bar${kleur.gray('=ALPHANUMERIC')}`,
      '    Hello world',
      ` -c${kleur.gray('=STRING')}`,
      '    ',
      ` -d${kleur.gray('=VALUE')}`,
      '    ',
      ' --test',
      '    ',
      '',
    ].join('\n'));
  });
});
