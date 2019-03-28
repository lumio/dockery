import runCommand from './runCommand';

const getHash = async (cwd?: string, testHash: string = 'HEAD'): Promise<string> => {
  try {
    const result = await runCommand(
      'git',
      ['rev-parse', '--short', '--verify', testHash],
      cwd,
      true,
    );

    const hash = result.stdout.trim();

    if (hash) {
      return hash;
    }
  } catch (e) {
    throw new Error('Failed to retrieve latest git commit hash. Is this a git repo?');
  }

  throw new Error('Could not retrieve latest git commit hash');
};

export default getHash;
