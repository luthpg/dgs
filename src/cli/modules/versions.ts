import { execSync } from 'node:child_process';
import { mkdir, rm, rmdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Library } from '../../libraries';
import { pathExists } from './fsLib';

export interface VersionInfo {
  userSymbol: string;
  versions: {
    version: string;
    description: string;
  }[];
}

export const getLibrariesVersions = async (libraries: Array<Library>) => {
  const claspDirPath = path.join(process.cwd(), '.dgs-temp');
  let results: Array<VersionInfo> = [];
  try {
    if (!(await pathExists(claspDirPath))) {
      await mkdir(claspDirPath);
    } else {
      await rm(claspDirPath, { force: true, recursive: true });
      await mkdir(claspDirPath);
    }
    results = await Promise.all(
      libraries.map(async ({ userSymbol, libraryId }) => {
        const claspPath = path.join(claspDirPath, `.${userSymbol}-clasp.json`);
        try {
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
                version,
                description,
              };
            })
            .sort((a, b) => Number(a.version) - Number(b.version));
          await rm(claspPath, {
            recursive: true,
            force: true,
          });
          return {
            userSymbol,
            versions,
          };
        } catch (e) {
          await rm(claspPath, {
            recursive: true,
            force: true,
          });
          throw e;
        }
      }),
    );
  } catch (e) {
    console.error((e as Error).stack);
  }
  await rmdir(claspDirPath, { retryDelay: 1000 });
  return results;
};
