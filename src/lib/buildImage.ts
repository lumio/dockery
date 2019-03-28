import runCommand from './runCommand';

const buildImage = async (tag: string, cwd: string, quiet: boolean = false) => {
  try {
    await runCommand(
      'docker',
      ['build', '-t', tag, '.'],
      cwd,
      quiet,
    );
  } catch (e) {
    throw new Error('Docker build command failed');
  }
};

export default buildImage;
