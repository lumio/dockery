import collectArguments from './collectArguments';

describe('collectArguments', () => {
  it('should throw when invalid argument given', () => {
    expect(() => collectArguments({ _: [], foo: 'bar' }, {}))
      .toThrow('Unknown argument \'--foo\'. Try dockery --help.');
  });

  it('should throw when invalid argument type given', () => {
    const validArguments = {
      foo: { types: ['number'] },
      bar: { types: ['number', 'string'] },
    };
    const givenArguments1 = {
      _: [],
      foo: true,
    };
    const givenArguments2 = {
      foo: 'bar',
    };
    const givenArguments3 = {
      bar: { invalid: true },
    };

    expect(() => collectArguments(givenArguments1, validArguments))
      .toThrow('Expected value for --foo');

    expect(() => collectArguments(givenArguments2, validArguments))
      .toThrow('Expected --foo to be of type number but got string');

    expect(() => collectArguments(givenArguments3, validArguments))
      .toThrow('Expected --bar to be one of number, string but got object.\nTry dockery --help for help.');
  });

  it('should throw when multiple arguments of same group get passed along', () => {
    const validArguments = {
      a: { uniqueGroup: 'group1' },
      b: { uniqueGroup: 'group1' },
    };
    const givenArguments = {
      _: [],
      a: true,
      b: true,
    };

    expect(() => collectArguments(givenArguments, validArguments))
      .toThrow('Argument -b cannot be used in combination with -a');
  });

  it('should return valid arguments', () => {
    const validArguments = {
      a: { alias: 'abc' },
      abc: { uniqueGroup: 'group1' },
    };
    const givenArguments = {
      _: [],
      a: true,
    };
    expect(collectArguments(givenArguments, validArguments))
      .toEqual({ _: [], a: true, abc: true });
  });
});
