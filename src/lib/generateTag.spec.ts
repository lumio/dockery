import generateTag from './generateTag';

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

  it('generate tag from argv', async () => {
    const tag = await generateTag(
      {
        _: [],
        repo: 'test-repo',
        tag: 'test',
      },
      __dirname,
      {
        name: 'test-package',
        version: '1.0.0',
      },
    );
    expect(tag).toBe('test-repo/test-package:test');
  });
});
