import { window, workspace } from 'vscode';
import { prevFilePath as getPrevFilePath } from '../bs/prev-file-path';
import { getActiveFilePath } from './_/get-active-file-path';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const openPrevFile = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const currentFilePath = getActiveFilePath(window);
  if (currentFilePath === null) return;
  const prevFilePath = getPrevFilePath(rootDirectory, currentFilePath);
  if (prevFilePath === null) return; // No prev file
  workspace.openTextDocument(prevFilePath).then((document) => {
    window.showTextDocument(document);
  });
};

export { openPrevFile };
