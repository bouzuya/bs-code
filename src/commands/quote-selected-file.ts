import { Selection, TextEditor, window } from 'vscode';
import { loadB } from '../bs/b';
import { fromString } from '../bs/bid';
import { getRootDirectory } from './_/get-root-directory';
import { getRootDirectoryError } from './_/get-root-directory-error';
import { getCursorText } from './_/get-cursor-text';
import { getSelectedText } from './_/get-selected-text';

const alt = (s1: string | null, s2: string | null): string | null => {
  return s1 !== null ? s1 : s2;
};

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
  const selectedText = alt(getSelectedText(), getCursorText(/[0-9TZ+:-]+/));
  if (selectedText === null) return;
  const text = new Date(selectedText.trim())
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z')
    .replace(/[-:+]/g, '');
  const id = fromString(text);
  if (id === null) return;
  const { content } = loadB(rootDirectory, id);
  appendContentToNextLine(content);
};

export { quoteSelectedFile };
