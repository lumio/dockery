import runCommand from './runCommand';

const getHash = async (cwd?: string): Promise<string> => {
  try {
    const result = await runCommand(
      'git',
      ['rev-parse', '--short', '--verify', 'HEAD'],
      cwd,
      true,
    );

    const hash = result.stdout.trim();

    if (!hash) {
      throw new Error('Could not retrieve latest git commit hash');
    }

    return hash;
  } catch (e) {
    throw new Error('Failed to retrieve latest git commit hash. Is this a git repo?');
  }

  return '';
};

export default getHash;
