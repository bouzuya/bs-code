import { pairFilePaths } from './pair-file-paths';

const nextPairFilePath = (filePath: string): string | null => {
  const filePaths = pairFilePaths(filePath);
  if (filePaths.length === 1) return null; // No next pair file
  const index = filePaths.indexOf(filePath);
  if (index < 0) return null; // illegal state
  const nextIndex = index + 1 >= filePaths.length ? 0 : index + 1;
  const nextFilePath = filePaths[nextIndex];
  return nextFilePath;
};

export { nextPairFilePath };
