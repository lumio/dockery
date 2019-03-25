import kleur from 'kleur';
import util from 'util';

const failOnError = async <T>(fn: (...args: any[]) => T, ...args: any[]) => {
  try {
    const result = await fn(...args);
    return result;
  } catch (e) {
    const message = e.message || e.toString();
    console.error(kleur.red('ERROR!'));
    if (message === '[object Object]') {
      console.error(kleur.yellow('No error message found; printing error object'));
      console.error(util.inspect(e, false, null, true));
    }
    else {
      console.error(kleur.yellow(message));
    }
    process.exit(1);
  }

  // Will never be called, yet TS seems to not understand process.exit
  return {} as any;
};

export default failOnError;
