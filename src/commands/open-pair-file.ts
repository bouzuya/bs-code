import { window, workspace } from 'vscode';
import { nextPairFilePath } from '../bs/next-pair-file-path';
import { getActiveFilePath } from './_/get-active-file-path';

const openPairFile = (): void => {
  const filePath = getActiveFilePath(window);
  if (filePath === null) return;
  const pairFilePath = nextPairFilePath(filePath);
  if (pairFilePath === null) return; // No next pair file
  workspace.openTextDocument(pairFilePath).then((document) => {
    window.showTextDocument(document);
  });
};

export { openPairFile };
