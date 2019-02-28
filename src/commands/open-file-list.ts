import { join } from 'path';
import { languages, window, workspace } from 'vscode';
import * as b from '../bs/b';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getCursorText } from './_/get-cursor-text';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getSelectedText } from './_/get-selected-text';
import { toSummary } from '../bs/to-summary';
import { findIds } from '../bs/find-ids';

const alt = (s1: string | null, s2: string | null): string | null => {
  return s1 !== null ? s1 : s2;
};

const openFileList = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  languages.getLanguages()
    .then((languages) => {
      if (languages.indexOf('markdown') < 0) return Promise.reject(new Error());
      return Promise.resolve('markdown');
    })
    .then((language) => {
      const flowDirectory = join(rootDirectory, 'flow');
      const selectedText =
        alt(getSelectedText(), getCursorText(/[-0-9]+/));
      const ids = findIds(flowDirectory, selectedText);
      const content = ids
        .map((id) => {
          const loaded = b.loadB(rootDirectory, id);
          return toSummary(loaded);
        })
        .join('\n');
      return { content, language };
    })
    .then((options) => workspace.openTextDocument(options))
    .then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
};

export { openFileList };
