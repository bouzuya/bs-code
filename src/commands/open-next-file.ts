import { window, workspace } from 'vscode';
import { nextFilePath as getNextFilePath } from '../bs/next-file-path';
import { getActiveFilePath } from './_/get-active-file-path';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const openNextFile = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const currentFilePath = getActiveFilePath(window);
  if (currentFilePath === null) return;
  const prevFilePath = getNextFilePath(rootDirectory, currentFilePath);
  if (prevFilePath === null) return; // No prev file
  workspace.openTextDocument(prevFilePath).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { openNextFile };
