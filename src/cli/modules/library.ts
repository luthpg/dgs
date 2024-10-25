import * as path from 'node:path';
import { Separator, checkbox } from '@inquirer/prompts';
import * as fs from 'fs-extra';
import { LIBRARIES, type Library } from '../../libraries';
import { getLibrariesVersions } from './versions';

export interface AppsscriptJson {
  timeZone: string;
  dependencies?: {
    libraries?: Array<Library>;
  };
  exceptionLogging: 'STACKDRIVER';
  runtimeVersion: 'V8';
}

export const getTargetLibraries = async () => {
  const selectedLibraries = await checkbox<Library>({
    message: 'Select AppsScript Libraries you want to add:',
    choices: [
      ...LIBRARIES.sort((a, b) => (a.userSymbol > b.userSymbol ? 1 : -1)).map(
        (library) => ({
          name: library.userSymbol,
          value: library,
        }),
      ),
      new Separator(),
    ],
    required: true,
    loop: true,
  });
  const selectedLibrariesVersions =
    await getLibrariesVersions(selectedLibraries);
  const selectedLibrariesWighVersions = selectedLibraries.map((library) => {
    library.version =
      selectedLibrariesVersions
        .find(({ userSymbol }) => library.userSymbol === userSymbol)
        ?.versions.reduce((a, b) =>
          Number(a.version) > Number(b.version) ? a : b,
        ).version ?? '0';
    return library;
  });
  return selectedLibrariesWighVersions;
};

export const getClaspRootDir = async (): Promise<string> => {
  const claspPath = path.join(process.cwd(), '.clasp.json');

  if (!(await fs.pathExists(claspPath))) {
    throw new Error('.clasp.json file not found in the project root.');
  }

  const claspConfig = await fs.readJSON(claspPath);
  if (claspConfig.rootDir == null) {
    throw new Error('rootDir not found in .clasp.json');
  }

  return claspConfig.rootDir as string;
};

export async function pushLibrariesToAppsscriptJson(
  rootDir: string,
  libraries: Library[],
) {
  try {
    const appsscriptJsonPath = path.join(
      process.cwd(),
      rootDir,
      'appsscript.json',
    );

    if (!(await fs.pathExists(appsscriptJsonPath))) {
      throw new Error(
        'appsscript.json file not found in the target directory.',
      );
    }

    const appsscriptConfig: AppsscriptJson =
      await fs.readJSON(appsscriptJsonPath);

    if (appsscriptConfig.dependencies == null) {
      appsscriptConfig.dependencies = { libraries: [] };
    }
    if (appsscriptConfig.dependencies.libraries == null) {
      appsscriptConfig.dependencies.libraries = [];
    }

    for (const {
      userSymbol,
      libraryId,
      version,
      developmentMode,
    } of libraries) {
      const presetLibrarySettingIndex =
        appsscriptConfig.dependencies.libraries.findIndex(
          ({ libraryId: presetLibraryId }) => presetLibraryId === libraryId,
        );
      if (presetLibrarySettingIndex >= 0) {
        const preset = {
          ...appsscriptConfig.dependencies.libraries[presetLibrarySettingIndex],
        };
        appsscriptConfig.dependencies.libraries[presetLibrarySettingIndex] = {
          libraryId,
          userSymbol: preset.userSymbol,
          version,
          developmentMode: preset.developmentMode ?? developmentMode,
        };
      } else {
        appsscriptConfig.dependencies.libraries.push({
          userSymbol,
          libraryId,
          version,
          developmentMode,
        });
      }
    }

    await fs.writeJSON(appsscriptJsonPath, appsscriptConfig, { spaces: 2 });
    return appsscriptConfig;
  } catch (e) {
    console.error((e as Error).stack);
    return null;
  }
}