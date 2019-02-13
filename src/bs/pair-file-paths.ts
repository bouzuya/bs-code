import * as fs from 'fs';
import * as path from 'path';
import { getExtension } from './get-extension';

const baseName = (filePath: string): string => {
  const extName = getExtension(filePath);
  const baseName = path.basename(filePath, extName);
  return baseName;
};

const dirName = (filePath: string): string => path.dirname(filePath);

const pairFilePaths = (filePath: string): string[] => {
  const targetDirPath = dirName(filePath);
  const targetBaseName = baseName(filePath);
  const filePaths = fs
    .readdirSync(targetDirPath)
    .filter((i) => baseName(i) == targetBaseName)
    .map((i) => path.join(targetDirPath, i));
  return filePaths;
};

export { pairFilePaths };
