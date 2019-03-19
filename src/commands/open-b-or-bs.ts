import { window, workspace } from 'vscode';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getSelectedId } from './_/get-selected-id';
import { toContentFilePath } from '../bs/bid';
import { getSelectedText } from './_/get-selected-text';
import { getCursorText } from './_/get-cursor-text';
import { openFileList } from './_/open-file-list';

const openBOrBs = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const id = getSelectedId();
  if (id !== null) {
    // open b
    const path = toContentFilePath(rootDirectory, id);
    workspace.openTextDocument(path).then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
  } else {
    // open bs
    const selectedText = getSelectedText();
    const cursorText = getCursorText(/[-0-9]+/);
    const date = selectedText !== null ? selectedText : cursorText;
    if (date === null) return;
    openFileList(date);
  }
};

export { openBOrBs };
