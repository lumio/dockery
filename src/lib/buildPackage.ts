import fs from 'fs';
import path from 'path';
import runCommand from './runCommand';

const buildPackage = async (cwd: string, quiet: boolean = false) => {
  const command = fs.existsSync(path.resolve(cwd, 'yarn.lock'))
    ? 'yarn'
    : 'npm';

  try {
    const result = await runCommand(
      command,
      ['run', 'build'],
      cwd,
      quiet,
    );
  } catch (e) {
    if (e.exitCode) {
      throw new Error('Build command failed. Process exited with a non-zero code');
    }

    throw new Error('Build command failed');
  }

  return true;
};

export default buildPackage;
