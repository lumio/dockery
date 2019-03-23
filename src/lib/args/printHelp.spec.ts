import kleur from 'kleur';
import printHelp from './printHelp';

describe('printHelp', () => {
  it('transforms argument schema to help text', () => {
    const validArgs = {
      foo: { alias: 'bar' },
      bar: {
        desc: 'Hello world',
        types: ['string', 'number'],
      },
    }
    expect(printHelp(validArgs, '', true)).toBe([
      '',
      ` --foo --bar${kleur.gray('=ALPHANUMERIC')}`,
      '    Hello world',
      '',
    ].join('\n'));
  });
});
