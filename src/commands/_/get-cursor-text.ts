import { window } from 'vscode';

const getCursorText = (regex: RegExp): string | null => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return null; // No active text editor
  const selection = editor.selection;
  if (typeof selection === 'undefined') return null; // No selection
  const position = selection.active;
  const document = editor.document;
  const range = document.getWordRangeAtPosition(position, regex);
  const text = document.getText(range);
  return text;
};

export { getCursorText };
