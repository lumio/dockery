import kleur from 'kleur';
import printHelp from './printHelp';

describe('printHelp', () => {
  it('transforms argument schema to help text', () => {
    const validArgs = {
      bar: {
        desc: 'Hello world',
        types: ['string', 'number'],
      },
      foo: { alias: 'bar' },
    };
    expect(printHelp(validArgs, '', true)).toBe([
      '',
      ` --foo --bar${kleur.gray('=ALPHANUMERIC')}`,
      '    Hello world',
      '',
    ].join('\n'));
  });
});
