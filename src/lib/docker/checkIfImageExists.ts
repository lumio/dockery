import runCommand from '../runCommand';

const checkIfImageExists = async (
  tag: string,
  cwd: string,
  failIfExists: boolean = true,
): Promise<string | false> => {
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
    if (tagParts[0] === imageParts[0] && tagParts[1] === imageParts[1] && failIfExists) {
      throw new Error(`Image with the tag ${tag} already exists`);
    }

    return imageParts[2];
  }

  return false;
};

export default checkIfImageExists;
