import {
  TextEditor, window, workspace
} from 'vscode';
import { nextPairFilePath } from '../bs/next-pair-file-path';

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
