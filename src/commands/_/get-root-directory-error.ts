import { statSync } from 'fs';

const getRootDirectoryError = (rootDirectory: string | null): string => {
  if (rootDirectory === null) {
    return 'bsCode.rootDirectory is null';
  }
  if (!statSync(rootDirectory).isDirectory) {
    return 'bsCode.rootDirectory is not directory';
  }
  return null;
};

export { getRootDirectoryError };
