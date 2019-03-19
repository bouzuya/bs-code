import { window, workspace } from 'vscode';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getSelectedId } from './_/get-selected-id';
import { toContentFilePath } from '../bs/bid';

const openSelectedFile = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const id = getSelectedId();
  if (id === null) return;
  const path = toContentFilePath(rootDirectory, id);
  workspace.openTextDocument(path).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { openSelectedFile };
