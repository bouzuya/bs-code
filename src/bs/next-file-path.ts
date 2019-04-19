import { join } from 'path';
import { getExtension } from './get-extension';
import { getFilePathsRecursive } from './get-file-paths';

const nextFilePath = (
  rootDirectory: string,
  currentFilePath: string
): string | null => {
  const extName = getExtension(currentFilePath);
  const flowDirectory = join(rootDirectory, 'flow');
  const filePaths = getFilePathsRecursive(flowDirectory).filter((i) => getExtension(i) === extName);
  const index = filePaths.indexOf(currentFilePath);
  if (index < 0) return null; // current file is not found
  if (index + 1 >= filePaths.length) return null; // next file is not found
  return filePaths[index + 1];
};

export { nextFilePath };
