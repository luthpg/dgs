import { execSync } from 'node:child_process';
import { mkdir, rm, rmdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Library } from '../libraries';
import { pathExists } from './modules/fsLib';

export const getLibrariesVersions = async (libraries: Array<Library>) => {
  const claspDirPath = path.join(process.cwd(), '.dgs-temp');
  if (!(await pathExists(claspDirPath))) {
    await mkdir(claspDirPath);
  }
  const results = await Promise.all(
    libraries.map(async ({ userSymbol, libraryId }) => {
      const claspPath = path.join(claspDirPath, `${userSymbol}-clasp.json`);
      await writeFile(
        claspPath,
        JSON.stringify({
          scriptId: libraryId,
        }),
        'utf-8',
      );
      console.info(`| Getting versions for '${userSymbol}'...`);
      const stdout = execSync(
        `npx @google/clasp versions --project ${claspPath}`,
      );
      const versionLines = stdout.toString().match(/\d+\s\-\s.+/g) || [];
      const versions = versionLines
        .map((line) => {
          const [version, description] = line.split(' - ');
          return {
            version: Number(version),
            description,
          };
        })
        .sort((a, b) => a.version - b.version);
      await rm(claspPath, {
        recursive: true,
        force: true,
      });
      return {
        userSymbol,
        versions,
      };
    }),
  );

  await rmdir(claspDirPath, { retryDelay: 1000 });
  return results;
};
