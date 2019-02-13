import { getPrevFile } from '@bouzuya/bs';
import * as eaw from 'eastasianwidth';
import * as fs from 'fs-extra';
import { join } from 'path';
import { languages, window, workspace } from 'vscode';

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

const toOneLine = (meta: { created_at: string; }, content: string): string => {
  const createdAt = meta.created_at;
  return content
    .replace(/[\n\r]/g, ' ')
    .split('')
    .reduce(({ content, length }, c) => {
      if (length > 80) return { content, length };
      const l = eaw.length(content + c);
      return { content: content + (l > 80 ? '' : c), length: l };
    }, { content: createdAt + ' ', length: (createdAt + ' ').length })
    .content;
};

const openFileListToday = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const today = getTodayInMs();
  languages.getLanguages()
    .then((languages) => {
      if (languages.indexOf('markdown') < 0) return Promise.reject(new Error());
      return Promise.resolve('markdown');
    })
    .then((language) => {
      const flowDirectory = join(rootDirectory, 'flow');
      const f = (
        a: { content: string; language: string; },
        x: string | null
      ): Promise<{ content: string; language: string; }> => {
        const file = getPrevFile(flowDirectory)(x)();
        if (file === null) return Promise.resolve(a);
        const metaPath = file;
        const metaData = fs.readFileSync(metaPath, { encoding: 'utf-8' });
        const meta = JSON.parse(metaData);
        if (new Date(meta.created_at).getTime() < today)
          return Promise.resolve(a);
        const contentPath = metaPath.replace(/\.json$/, '.md');
        const contentData = fs.readFileSync(contentPath, { encoding: 'utf-8' });
        const line = toOneLine(meta, contentData);
        return f({
          content: line + '\n' + a.content,
          language: a.language
        }, file);
      };
      return f({ content: '', language }, null);
    })
    .then((options) => workspace.openTextDocument(options))
    .then((document) => {
      const viewColumn = getActiveViewColumn(window);
      window.showTextDocument(document, viewColumn);
    });
};

export { openFileListToday };
