import * as fs from 'fs';
import * as path from 'path';
import { getBaseName } from './get-base-name';

const dirName = (filePath: string): string => path.dirname(filePath);

const pairFilePaths = (filePath: string): string[] => {
  const targetDirPath = dirName(filePath);
  const targetBaseName = getBaseName(filePath);
  const filePaths = fs
    .readdirSync(targetDirPath)
    .filter((i) => getBaseName(i) == targetBaseName)
    .map((i) => path.join(targetDirPath, i));
  return filePaths;
};

export { pairFilePaths };
