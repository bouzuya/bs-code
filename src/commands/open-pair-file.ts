import * as fs from 'fs';
import * as path from 'path';
import {
  TextEditor, window, workspace
} from 'vscode';

const baseName = (filePath: string): string => {
  const extName = path.extname(filePath);
  const baseName = path.basename(filePath, extName);
  return baseName;
};

const fileName = (filePath: string): string => path.basename(filePath);

const dirName = (filePath: string): string => path.dirname(filePath);

const pairFilePaths = (filePath: string): string[] => {
  const targetDirPath = dirName(filePath);
  const targetBaseName = baseName(filePath);
  const filePaths = fs
    .readdirSync(targetDirPath)
    .filter((i) => baseName(i) == targetBaseName)
    .map((i) => path.join(targetDirPath, i));
  return filePaths;
};

const nextPairFilePath = (filePath: string): string | null => {
  const filePaths = pairFilePaths(filePath);
  if (filePaths.length === 1) return null; // No next pair file
  const index = filePaths.indexOf(filePath);
  if (index < 0) return null; // illegal state
  const nextIndex = index + 1 >= filePaths.length ? 0 : index + 1;
  const nextFilePath = filePaths[nextIndex];
  return nextFilePath;
};

const activeFilePath = (
  window: { activeTextEditor: TextEditor | undefined }
): string | null => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return null; // No active text editor
  const document = editor.document;
  if (document.isUntitled) return null; // No file
  const filePath = document.fileName;
  return filePath;
};

const openPairFile = (): void => {
  const filePath = activeFilePath(window);
  if (filePath === null) return;
  const pairFilePath = nextPairFilePath(filePath);
  if (pairFilePath === null) return; // No next pair file
  workspace.openTextDocument(pairFilePath).then((document) => {
    window.showTextDocument(document);
  });
};

export { openPairFile };
