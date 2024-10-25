import type { Command } from 'commander';
import {
  getClaspRootDir,
  getTargetLibraries,
  pushLibrariesToAppsscriptJson,
} from './modules/library';

export type { VersionInfo } from './modules/versions';
export type { Library } from '../libraries';
export type { AppsscriptJson } from './modules/library';

export async function setAppsScriptLibraries(_command?: Command) {
  try {
    const targetLibraries = await getTargetLibraries();
    const rootDir = await getClaspRootDir();
    await pushLibrariesToAppsscriptJson(rootDir, targetLibraries);
    console.info('└ Compelete to add libraries.');
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
