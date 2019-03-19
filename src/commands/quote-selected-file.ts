import { Selection, TextEditor, window } from 'vscode';
import { loadB } from '../bs/b';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getSelectedId } from './_/get-selected-id';

const appendContentToNextLine = async (content: string): Promise<void> => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  if (typeof editor === 'undefined') return;
  const selection: Selection | undefined = editor.selection;
  if (typeof selection === 'undefined') return;
  await editor.edit((builder) => {
    const cursor = selection.active;
    const cursorLineEnd = editor.document.lineAt(cursor.line).range.end;
    builder.insert(cursorLineEnd, '\n' + content);
  });
};

const quoteSelectedFile = (): void => {
  const rootDirectoryUnchecked = getRootDirectory();
  const rootDirectoryError = getRootDirectoryError(rootDirectoryUnchecked);
  if (rootDirectoryError !== null) {
    window.showErrorMessage(rootDirectoryError);
    return;
  }
  const rootDirectory = rootDirectoryUnchecked!;
  const id = getSelectedId();
  if (id === null) return;
  const { content } = loadB(rootDirectory, id);
  appendContentToNextLine(content);
};

export { quoteSelectedFile };
