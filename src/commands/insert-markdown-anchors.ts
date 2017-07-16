import { TextEditor, window } from 'vscode';
import { newExpanded } from '../bs/new-expanded';

const insertExpandeds = (
  editor: TextEditor, expandeds: string[]
): Promise<void> => {
  const document = editor.document;
  return expandeds.reduce((promise, expanded) => {
    return promise.then(() => void editor.edit((builder) => {
      const eof = document.lineAt(document.lineCount - 1).range.end;
      builder.insert(eof, '\n' + expanded);
    }));
  }, Promise.resolve());
};

const insertMarkdownAnchors = (): void => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  if (typeof editor === 'undefined') return; // No open text editor
  const document = editor.document;
  const expanded = newExpanded((f: (line: string) => void): void => {
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i).text;
      f(line);
    }
  });
  insertExpandeds(editor, expanded);
};

export { insertMarkdownAnchors };
