import { join } from 'path';
import { now } from 'time-keeper/now';
import { toISOString } from 'time-keeper/to-iso-string';
import { languages, window, workspace } from 'vscode';
import { loadB } from '../bs/b';
import { findIds } from '../bs/find-ids';
import { toSummary } from '../bs/to-summary';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const openFileListToday = (): void => {
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
      const date = toISOString(now()).substring(0, 'YYYY-MM-DD'.length);
      const ids = findIds(flowDirectory, date);
      const content = ids
        .map((id) => toSummary(loadB(rootDirectory, id)))
        .join('\n');
      return { content, language };
    })
    .then((options) => workspace.openTextDocument(options))
    .then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
};

export { openFileListToday };
