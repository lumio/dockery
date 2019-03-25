import fs from 'fs';
import path from 'path';
import runCommand from './runCommand';

const buildPackage = async (cwd: string, quiet: boolean = false) => {
  const command = fs.existsSync(path.resolve(cwd, 'yarn.lock'))
    ? 'yarn'
    : 'npm';

  try {
    await runCommand(
      command,
      ['run', 'build'],
      cwd,
      quiet,
    );
  } catch (e) {
    if (e.exitCode) {
      throw new Error('Package build command failed. Process exited with a non-zero code');
    }

    throw new Error('Package build command failed');
  }

  return true;
};

export default buildPackage;
