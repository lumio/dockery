import runCommand from './runCommand';

describe('runCommand', () => {
  it('executes command', async () => {
    const output = await runCommand('echo', ['Hello world'], undefined, true);
    expect(output).toEqual({
      exitCode: 0,
      stderr: '',
      stdout: 'Hello world\n',
    });
  });
});
