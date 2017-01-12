import { TextEditor } from 'vscode';

const getActiveFilePath = (
  window: { activeTextEditor: TextEditor | undefined }
): string | null => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return null; // No active text editor
  const document = editor.document;
  if (document.isUntitled) return null; // No file
  const filePath = document.fileName;
  return filePath;
};

export { getActiveFilePath };
