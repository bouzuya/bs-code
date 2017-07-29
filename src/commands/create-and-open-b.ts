import { window, workspace } from 'vscode';
import { createB } from '../bs/create-b';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const createAndOpenB = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const bFilePath = createB(rootDirectory);
  workspace.openTextDocument(bFilePath).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { createAndOpenB };
