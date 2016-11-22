import * as fs from 'fs';
import { TextEditor, window, workspace } from 'vscode';
import { createB } from '../bs/create-b';

const getRootDirectory = (): string | null => {
  const config = workspace.getConfiguration('bsCode');
  const rootDirectory: string | null = config.get('rootDirectory', null);
  return rootDirectory;
};

const getRootDirectoryError = (rootDirectory: string | null): string => {
  if (rootDirectory === null) {
    return 'bsCode.rootDirectory is null';
  }
  if (!fs.statSync(rootDirectory).isDirectory) {
    return 'bsCode.rootDirectory is not directory';
  }
  return null;
};

const createAndOpenB = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const bFilePath = createB(rootDirectory);
  workspace.openTextDocument(bFilePath).then((document) => {
    window.showTextDocument(document);
  });
};

export { createAndOpenB };
