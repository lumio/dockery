import collectArguments from './collectArguments';

describe('collectArguments', () => {
  it('should throw when invalid argument given', () => {
    expect(() => collectArguments({ foo: 'bar' }, {}))
      .toThrow('Unknown argument \'--foo\'. Try dockery --help.');
  });

  it('should throw when invalid argument type given', () => {
    const validArguments = {
      foo: { types: ['number'] },
    };
    const givenArguments1 = {
      foo: true,
    };
    const givenArguments2 = {
      foo: 'bar',
    };

    expect(() => collectArguments(givenArguments1, validArguments))
      .toThrow('Expected value for --foo');

    expect(() => collectArguments(givenArguments2, validArguments))
      .toThrow('Expected --foo to be of type number but got string');
  });

  it('should return valid arguments', () => {
    expect(collectArguments({ foo: 'bar' }, { foo: {} }))
      .toEqual({ foo: 'bar' });
  });
});
