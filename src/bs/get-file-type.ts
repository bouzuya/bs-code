import { statSync } from 'fs';

// '/path/to/file.md' -> 'file'
// '/path/to/' -> 'directory'
// '/path/to/unknown' -> null
const getFileType = (filePath: string): 'file' | 'directory' | null => {
  try {
    return statSync(filePath).isDirectory()
      ? 'directory' : 'file';
  } catch (_error) {
    return null;
  }
};

export { getFileType };
