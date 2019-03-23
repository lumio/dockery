import collectArguments from './collectArguments';

describe('collectArguments', () => {
  it('should throw when invalid argument given', () => {
    expect(() => collectArguments({ foo: 'bar' }, {}))
      .toThrow('Unknown argument \'--foo\'. Try dockery --help.');
  });

  it('should return valid arguments', () => {
    expect(collectArguments({ foo: 'bar' }, { foo: {}}))
      .toEqual({ foo: 'bar' });
  });
});
