import runCommand from '../runCommand';

const removeImage = async (image: string, cwd: string) => {
  try {
    await runCommand('docker', ['rmi', image, '-f'], cwd, true);
  } catch (e) {
    throw new Error(e.stderr);
  }

  return true;
};

export default removeImage;
