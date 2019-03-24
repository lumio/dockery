import kleur from 'kleur';

const failOnError = (fn: () => any) => {
  try {
    return fn();
  } catch (e) {
    const message = e.message || e.toString();
    console.error(kleur.red('ERROR!\n') + kleur.yellow(message));
    process.exit(1);
  }

  // Will never be called, yet TS seems to not understand process.exit
  return {} as any;
}

export default failOnError;
