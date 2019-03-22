import { spawn } from 'child_process';

interface RunCommandOutput {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

const runCommand = (
  command: string,
  args: string[] = [],
  cwd: string = process.cwd(),
  quiet: boolean = false,
): Promise<RunCommandOutput> => {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, { cwd });

    const output: RunCommandOutput | any = {
      exitCode: null,
      stderr: '',
      stdout: '',
    };

    const addToOutput = (std: string) => (data: Buffer) => {
      output[std] += data.toString();

      if (!quiet) {
        (process as any)[std].write(data);
      }
    };

    if (cmd.stderr) {
      cmd.stderr.on('data', addToOutput('stderr'));
    }
    if (cmd.stdout) {
      cmd.stdout.on('data', addToOutput('stdout'));
    }
    cmd.on('close', (exitCode: number) => {
      output.exitCode = exitCode;

      if (exitCode) {
        return reject(output as RunCommandOutput);
      }

      return resolve(output as RunCommandOutput);
    });
  });
};

export default runCommand;
