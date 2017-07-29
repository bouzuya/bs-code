import { window, workspace } from 'vscode';
import { nextPairFilePath } from '../bs/next-pair-file-path';
import { getActiveFilePath } from './_/get-active-file-path';
import { getActiveViewColumn } from './_/get-active-view-column';

const openPairFile = (): void => {
  const filePath = getActiveFilePath(window);
  if (filePath === null) return;
  const pairFilePath = nextPairFilePath(filePath);
  if (pairFilePath === null) return; // No next pair file
  workspace.openTextDocument(pairFilePath).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { openPairFile };
