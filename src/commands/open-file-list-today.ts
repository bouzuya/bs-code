import * as eaw from 'eastasianwidth';
import * as fs from 'fs-extra';
import { join } from 'path';
import { ViewColumn, languages, window, workspace } from 'vscode';

import { getFilePaths } from '../bs/get-file-paths';
import { nextPairFilePath } from '../bs/next-pair-file-path';
import { getActiveViewColumn } from './_/get-active-view-column';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';

const getTodayInMs = (): number => {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
};

const openFileListToday = (): void => {
  const rootDirectory = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectory);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const today = getTodayInMs();
  languages.getLanguages()
    .then((languages) => {
      if (languages.indexOf('markdown') < 0) return Promise.reject(new Error());
      return Promise.resolve('markdown');
    })
    .then((language) => {
      const flowDirectory = join(rootDirectory, 'flow');
      const content = getFilePaths(flowDirectory)
        .filter((i) => i.match(/\.json$/) !== null)
        .map((i) => {
          const meta = JSON.parse(fs.readFileSync(i, { encoding: 'utf-8' }));
          return { meta, metaPath: i };
        })
        .filter(({ meta }) => new Date(meta.created_at).getTime() >= today)
        .reduce((a, { meta: { created_at: createdAt }, metaPath }) => {
          const contentPath = metaPath.replace(/\.json$/, '.md');
          const content = fs.readFileSync(contentPath, { encoding: 'utf-8' });
          const line = content
            .replace(/[\n\r]/g, ' ')
            .split('')
            .reduce(({ content, length }, c) => {
              if (length > 80) return { content, length };
              const l = eaw.length(content + c);
              return { content: content + (l > 80 ? '' : c), length: l };
            }, { content: createdAt + ' ', length: (createdAt + ' ').length })
            .content;
          return a + line + '\n';
        }, '');
      return { content, language };
    })
    .then((options) => workspace.openTextDocument(options))
    .then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
};

export { openFileListToday };
