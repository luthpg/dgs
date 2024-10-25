#! /usr/bin/env node
import { Command } from 'commander';
import { version } from './../../package.json';
import { setAppsScriptLibraries } from './index';

export const cli = async () => {
  const program = new Command();
  program.version(version, '-v, --version');
  program
    .command('install')
    .alias('i')
    .description(
      'install AppsScript libraries into your project `appsscript.json`',
    )
    .action(
      async (_param, command: Command) => await setAppsScriptLibraries(command),
    );
  program.parse(process.argv);
};

cli();
