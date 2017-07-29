import { join } from 'path';
import { window, workspace } from 'vscode';
import { prevFilePath as getPrevFilePath } from '../bs/prev-file-path';
import { getActiveFilePath } from './_/get-active-file-path';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { pairFilePaths } from '../bs/pair-file-paths';

const getSelectedText = (): string | null => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return null; // No active text editor
  const document = editor.document;
  const selectedText = document.getText(
    editor.selection.isEmpty
      ? document.getWordRangeAtPosition(editor.selection.active, /[0-9TZ+:-]+/)
      : editor.selection
  );
  return selectedText;
};

const openSelectedFile = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const selectedText = getSelectedText();
  if (selectedText === null) return;
  const match = selectedText.trim().match(/^(\d{4})(\d{2})(\d{2})T\d{6}Z$/);
  if (match === null) return;
  const year = match[1];
  const month = match[2];
  const date = match[3];
  const path = join(
    rootDirectory, 'flow', year, month, date, selectedText + '.md'
  );
  const paths = pairFilePaths(path);
  workspace.openTextDocument(paths[1]).then((document) => {
    const viewColumn = getActiveViewColumn(window);
    window.showTextDocument(document, viewColumn);
  });
};

export { openSelectedFile };
