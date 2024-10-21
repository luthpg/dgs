import * as path from 'node:path';
import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';
import { LIBRARIES } from '../libraries';

export const installLibrary = async (targetLibraryName: string) => {
  const filePath = 'appsscript.json';
  const libraryDependency = { library: targetLibraryName };

  // JSONファイルを読み込む
  const data = await fs.promises.readFile(filePath, 'utf-8');
  const json = JSON.parse(data);

  // ライブラリ依存関係を設定
  json.dependencies = json.dependencies || {};
  json.dependencies[targetLibraryName] = libraryDependency;

  // 更新されたJSONファイルを書き込む
  await fs.promises.writeFile(filePath, JSON.stringify(json, null, 2));
};

// 1. ユーザーからpackageName（userSymbol）とscriptId（libraryId）を入力してもらう
async function promptUser() {
  const prompt = inquirer.createPromptModule();
  const answers = await prompt([
    {
      type: 'input',
      name: 'userSymbol',
      message: 'Enter the user symbol (library usage name):',
    },
    {
      type: 'input',
      name: 'libraryId',
      message: 'Enter the library Script ID:',
    },
    {
      type: 'input',
      name: 'version',
      message: 'Enter the library version (use "HEAD" for latest):',
      default: 'HEAD',
    },
    {
      type: 'confirm',
      name: 'developmentMode',
      message: 'Enable development mode (true/false)?',
      default: false,
    },
  ]);

  return answers;
}

// 2. .clasp.jsonファイルのrootDirの取得
async function getRootDir(): Promise<string> {
  const claspPath = path.join(process.cwd(), '.clasp.json');

  if (!(await fs.pathExists(claspPath))) {
    throw new Error('.clasp.json file not found in the project root.');
  }

  const claspConfig = await fs.readJSON(claspPath);
  if (!claspConfig.rootDir) {
    throw new Error('rootDir not found in .clasp.json');
  }

  return claspConfig.rootDir;
}

// 3. appsscript.jsonファイルの更新
async function updateAppsscriptJson(
  rootDir: string,
  userSymbol: string,
  libraryId: string,
  version: string,
  developmentMode: boolean,
) {
  const appsscriptJsonPath = path.join(
    process.cwd(),
    rootDir,
    'appsscript.json',
  );

  if (!(await fs.pathExists(appsscriptJsonPath))) {
    throw new Error('appsscript.json file not found in the target directory.');
  }

  const appsscriptConfig = await fs.readJSON(appsscriptJsonPath);

  // 既存のlibrariesがなければ初期化
  if (!appsscriptConfig.libraries) {
    appsscriptConfig.libraries = [];
  }

  // 新しいライブラリ依存関係を追加
  appsscriptConfig.libraries.push({
    userSymbol,
    libraryId,
    version,
    developmentMode,
  });

  // 更新したデータをファイルに書き込む
  await fs.writeJSON(appsscriptJsonPath, appsscriptConfig, { spaces: 2 });

  console.log('appsscript.json has been updated successfully!');
}

// メイン処理
async function main() {
  try {
    const { userSymbol, libraryId, version, developmentMode } =
      await promptUser();
    const rootDir = await getRootDir();
    await updateAppsscriptJson(
      rootDir,
      userSymbol,
      libraryId,
      version,
      developmentMode,
    );
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
