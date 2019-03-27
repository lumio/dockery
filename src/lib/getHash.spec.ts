import getHash from './getHash';

describe('getHash', () => {
  it('gets short hash', async () => {
    const hash = await getHash(process.cwd(), '5b7f3c1');
    expect(hash).toBe('5b7f3c1');
  });

  it('should fail when trying to get non-existing hash', async () => {
    await expect(getHash(process.cwd(), 'non-existing-hash'))
      .rejects.toEqual(new Error('Failed to retrieve latest git commit hash. Is this a git repo?'));
  });
});
