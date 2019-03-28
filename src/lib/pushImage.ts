import kleur from 'kleur';

import { ArgValues } from './args';
import runCommand from './runCommand';

const pushImage = async (tag: string, cwd: string, quiet: boolean = false) => {
  const result = await runCommand('docker', ['push', tag], cwd, quiet);
  return !result.exitCode;
};

export default pushImage;
