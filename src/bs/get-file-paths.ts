import { readdirSync } from 'fs';
import { join } from 'path';
import { getFileType } from './get-file-type';

const getDirectoryPaths = (filePath: string): string[] => {
  switch (getFileType(filePath)) {
    case null:
      return [];
    case 'file':
      return [];
    case 'directory':
      return readdirSync(filePath).map((i) => join(filePath, i));
  }
};

// '/path/to/file.md' -> ['/path/to/file.md']
// '/path/to/' -> ['/path/to/file1.md', '/path/to/file2.md']
// '/path/to/unknown' -> []
const getFilePathsRecursive = (filePath: string): string[] => {
  switch (getFileType(filePath)) {
    case null:
      return [];
    case 'file':
      return [filePath];
    case 'directory':
      return readdirSync(filePath)
        .reduce((a, i) => {
          return a.concat(getFilePathsRecursive(join(filePath, i)));
        }, [] as string[]);
  }
};

export { getDirectoryPaths, getFilePathsRecursive };
