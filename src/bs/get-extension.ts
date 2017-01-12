import { extname } from 'path';

// '/path/to/file.md' -> '.md'
const getExtension = (filePath: string): string => {
  return extname(filePath);
};

export { getExtension };
