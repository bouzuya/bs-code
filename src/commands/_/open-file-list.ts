import { join } from 'path';
import { window, workspace } from 'vscode';
import * as b from '../../bs/b';
import { getActiveViewColumn } from '../_/get-active-view-column';
import { getRootDirectory } from '../_/get-root-directory';
import { getRootDirectoryError } from '../_/get-root-directory-error';
import { getTempDirectory } from '../_/get-temp-directory';
import { toSummary } from '../../bs/to-summary';
import { findIds } from '../../bs/find-ids';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { plus } from 'time-keeper/plus';
import { toISOString } from 'time-keeper/to-iso-string';
import { now } from 'time-keeper/now';
import { tmpNameSync } from 'tmp';
import { outputFileSync } from 'fs-extra';

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

const openFileList = async (date: string): Promise<void> => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const tempDirectoryOrNull = getTempDirectory();
  const tempFile = tempDirectoryOrNull === null
    ? tmpNameSync()
    : tmpNameSync({ dir: tempDirectoryOrNull });
  const flowDirectory = join(rootDirectory, 'flow');
  const ids = findIds(flowDirectory, date);
  const header = buildHeader(date);
  const content = header + '\n' +
    ids.map((id) => {
      const loaded = b.loadB(rootDirectory, id);
      return toSummary(loaded);
    }).join('\n');
  outputFileSync(tempFile, content, { encoding: 'utf8' });
  const document = await workspace.openTextDocument(tempFile);
  const viewColumn = getActiveViewColumn(window);
  window.showTextDocument(document, viewColumn);
};

export { openFileList };
