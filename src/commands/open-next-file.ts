import { window, workspace } from 'vscode';
import { nextFilePath as getNextFilePath } from '../bs/next-file-path';
import { getActiveFilePath } from './_/get-active-file-path';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const openNextFile = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const currentFilePath = getActiveFilePath(window);
  if (currentFilePath === null) return;
  const prevFilePath = getNextFilePath(rootDirectory, currentFilePath);
  if (prevFilePath === null) return; // No prev file
  workspace.openTextDocument(prevFilePath).then((document) => {
    window.showTextDocument(document);
  });
};

export { openNextFile };
