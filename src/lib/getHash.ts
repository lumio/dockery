import runCommand from './runCommand';

const getHash = async (cwd?: string) : Promise<string | boolean> => {
  try {
    const result = await runCommand(
      'git',
      [ 'rev-parse', '--short', '--verify', 'HEAD' ],
      cwd,
      true
    );

    const hash = result.stdout.trim();

    if ( !hash ) {
      return false;
    }

    return hash;
  } catch (e) {
    return false;
  }
};

export default getHash;
