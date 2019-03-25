import runCommand from './runCommand';

const checkIfImageExists = async (tag: string, cwd: string) => {
  let result;
  try {
    result = await runCommand('docker', ['images'], cwd, true);
  } catch (e) {
    result = e;
  }

  if (result.exitCode) {
    throw new Error('Failed checking for current docker image list');
  }

  const tagParts = tag.split(':');
  const imageList = result.stdout.split('\n').splice(1);

  for (const image of imageList) {
    if (!image.trim()) {
      continue;
    }

    const imageParts = image.split(/\s+/);
    if (tagParts[0] === imageParts[0] && tagParts[1] === imageParts[1]) {
      return true;
    }
  }

  return false;
};

const buildImage = async (tag: string, cwd: string, quiet: boolean = false) => {
  const imageExists = await checkIfImageExists(tag, cwd);
  if (imageExists) {
    throw new Error(`Image with the tag ${tag} already exists`);
  }

  try {
    await runCommand(
      'docker',
      ['build', '-t', tag, '.'],
      cwd,
      quiet,
    );
  } catch (e) {
    throw new Error(`Docker build command failed`);
  }
};

export default buildImage;
