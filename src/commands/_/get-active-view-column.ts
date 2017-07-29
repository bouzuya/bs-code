import { TextEditor, ViewColumn } from 'vscode';

const getActiveViewColumn = (
  window: { activeTextEditor: TextEditor | undefined }
): ViewColumn => {
  const editor = window.activeTextEditor;
  if (typeof editor === 'undefined') return ViewColumn.One;
  const viewColumn = editor.viewColumn;
  if (typeof viewColumn === 'undefined') return ViewColumn.One;
  return viewColumn;
};

export { getActiveViewColumn };
