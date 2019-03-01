import { join } from 'path';
import { languages, window, workspace } from 'vscode';
import * as b from '../../bs/b';
import { getActiveViewColumn } from '../_/get-active-view-column';
import { getRootDirectory } from '../_/get-root-directory';
import { getRootDirectoryError } from '../_/get-root-directory-error';
import { toSummary } from '../../bs/to-summary';
import { findIds } from '../../bs/find-ids';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { plus } from 'time-keeper/plus';
import { toISOString } from 'time-keeper/to-iso-string';
import { now } from 'time-keeper/now';

const buildHeader = (date: string): string => {
  const timeZone =
    toISOString(now()).substring('YYYY-MM-DDT00:00:00'.length);
  const dt = parseISOString(date + 'T00:00:00' + timeZone);
  const next = plus(dt, 1, 'day');
  const prev = plus(dt, -1, 'day');
  return [
    toISOString(prev).substring(0, 'YYYY-MM-DD'.length),
    '<<',
    date,
    '>>',
    toISOString(next).substring(0, 'YYYY-MM-DD'.length)
  ].join(' ');
};

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
      const language = 'plaintext';
      return languages.includes(language)
        ? Promise.resolve(language)
        : Promise.reject(new Error(`${language}`));
    })
    .then((language) => {
      const flowDirectory = join(rootDirectory, 'flow');
      const ids = findIds(flowDirectory, date);
      const header = buildHeader(date);
      const content = header + '\n' +
        ids.map((id) => {
          const loaded = b.loadB(rootDirectory, id);
          return toSummary(loaded);
        }).join('\n');
      return { content, language };
    })
    .then((options) => workspace.openTextDocument(options))
    .then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
};

export { openFileList };
