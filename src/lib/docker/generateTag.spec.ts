import generateTag, {
  getRepoName,
  loadPackageInfo,
  validateTag,
} from './generateTag';

describe('generateTag', () => {
  it('get tag from package info with tag prefix', async () => {
    const tag = await generateTag(
      { _: [], 'tag-prefix': 'v' },
      __dirname,
      {
        'docker-repo': 'test',
        name: 'test-package',
        version: '1.0.0',
      },
    );
    expect(tag).toBe('test/test-package:v1.0.0');
  });

  it('generates tag from argv', async () => {
    const tag = await generateTag(
      {
        _: [],
        package: 'overwritten',
        repo: 'test-repo',
        tag: 'test',
      },
      __dirname,
      {
        name: 'test-package',
        version: '1.0.0',
      },
    );
    expect(tag).toBe('test-repo/overwritten:test');
  });

  it('generates tag from scoped package name', async () => {
    const tag = await generateTag(
      { _: [] },
      __dirname,
      {
        name: '@test-repo/test-package',
        version: '1.0.0',
      },
    );
    expect(tag).toBe('test-repo/test-package:1.0.0');
  });

  it('getRepoName returns false if no repo info was specified', () => {
    expect(getRepoName({ _: [] }, { name: '', version: '' })).toBe(false);
  });

  it('loadPackageInfo throws error if unable to load package info', () => {
    expect(() => loadPackageInfo('/some-non-existing-path'))
      .toThrow('Cannot read package.json in /some-non-existing-path');
  });

  it('validateTag throws error on empty input', () => {
    expect(() => validateTag('')).toThrow('No tag or repo name received');
  });

  it('validateTag throws error on invalid input', () => {
    expect(() => validateTag('test-with-@symbols!'))
      .toThrow(
        'Only alphanumeric characters, dashes, dots and underscores are'
        + ' allowed in a tag/repo name. Got test-with-@symbols!',
      );
  });
});
