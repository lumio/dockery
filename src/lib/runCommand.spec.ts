import runCommand from './runCommand';

describe('runCommand', () => {
  it('executes command', async () => {
    const output1 = await runCommand('echo', ['Hello world'], undefined, true);
    expect(output1).toEqual({
      exitCode: 0,
      stderr: '',
      stdout: 'Hello world\n',
    });

    const output2 = await runCommand('echo');
    expect(output2).toEqual({
      exitCode: 0,
      stderr: '',
      stdout: '\n',
    });
  });
});
