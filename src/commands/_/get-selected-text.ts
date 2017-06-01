import { window } from 'vscode';

const getSelectedText = (): string | null => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return null; // No active text editor
  const selection = editor.selection;
  if (typeof selection === 'undefined') return null; // No selection
  if (selection.isEmpty) return null;
  const document = editor.document;
  const selectedText = document.getText(selection);
  return selectedText;
};

export { getSelectedText };
