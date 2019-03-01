import { join } from 'path';
import { languages, window, workspace } from 'vscode';
import * as b from '../../bs/b';
import { getActiveViewColumn } from '../_/get-active-view-column';
import { getRootDirectory } from '../_/get-root-directory';
import { getRootDirectoryError } from '../_/get-root-directory-error';
import { toSummary } from '../../bs/to-summary';
import { findIds } from '../../bs/find-ids';

const openFileList = (date: string): void => {
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
      const ids = findIds(flowDirectory, date);
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
