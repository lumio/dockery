import runCommand from './runCommand';

const checkIfImageExists = async (tag, cwd) => {
  const result = await runCommand('docker', ['images'], cwd, true);

  const tagTokens = tag.split(':');
  const lines = result.stdout.split('\n').splice(1);

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const lineTokens = line.split(/\s+/);
    if (tagTokens[0] === lineTokens[0] && tagTokens[1] === lineTokens[1]) {
      return true;
    }
  }

  return false;
};
