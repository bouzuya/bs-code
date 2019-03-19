import { window, workspace, ViewColumn } from 'vscode';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getSelectedId } from './_/get-selected-id';
import { toContentFilePath } from '../bs/bid';

const openSelectedFileBeside = (): void => {
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
    // TODO: Use ViewColumn.Beside
    window.showTextDocument(document, ViewColumn.Three);
  });
};

export { openSelectedFileBeside };
