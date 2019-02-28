import { basename } from 'path';
import { getExtension } from './get-extension';

// '/path/to/file.md' -> 'file'
const getBaseName = (filePath: string): string => {
  const extension = getExtension(filePath);
  const baseName = basename(filePath, extension);
  return baseName;
};

export { getBaseName };
