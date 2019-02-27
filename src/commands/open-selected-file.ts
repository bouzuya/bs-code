import { join } from 'path';
import { window, workspace } from 'vscode';
import { pairFilePaths } from '../bs/pair-file-paths';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getCursorText } from './_/get-cursor-text';
import { getSelectedText } from './_/get-selected-text';

const alt = (s1: string | null, s2: string | null): string | null => {
  return s1 !== null ? s1 : s2;
};

const openSelectedFile = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const selectedText = alt(getSelectedText(), getCursorText(/[0-9TZ+:-]+/));
  if (selectedText === null) return;
  const text = new Date(selectedText.trim())
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z')
    .replace(/[-:+]/g, '');
  const match = text.match(/^(\d{4})(\d{2})(\d{2})T\d{6}Z$/);
  if (match === null) return;
  const year = match[1];
  const month = match[2];
  const date = match[3];
  const path = join(
    rootDirectory, 'flow', year, month, date, text + '.md'
  );
  const paths = pairFilePaths(path);
  workspace.openTextDocument(paths[1]).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { openSelectedFile };
