import {
  ExtensionContext, TextDocument, TextEditor, commands, window
} from 'vscode';
import { expand } from 'expand-markdown-anchors';

const isExpanded = (s: string): boolean => {
  const expanded = s.match(/^\[[^\]]+\]:\s+.*$/);
  return expanded !== null;
};

const insertExpandeds = (
  document: TextDocument, editor: TextEditor, expandeds: string[]
): Promise<void> => {
  return expandeds.reduce((promise, expanded) => {
    return promise.then(() => editor.edit((builder) => {
      const eof = document.lineAt(document.lineCount - 1).range.end;
      builder.insert(eof, '\n' + expanded);
    }));
  }, Promise.resolve());
};

const insertMarkdownAnchors = () => {
  const editor: TextEditor | undefined = window.activeTextEditor;
  if (typeof editor === 'undefined') return; // No open text editor
  const allExpanded = [];
  const oldExpandeds = [];
  const document = editor.document;
  for (let line = 0; line < document.lineCount; line++) {
    const text = document.lineAt(line).text;
    if (isExpanded(text)) {
      oldExpandeds.push(text);
    }
    expand(text).forEach((anchor) => {
      allExpanded.push(anchor);
    });
  }
  const newExpandeds = allExpanded.filter((expanded) => {
    return !oldExpandeds.some((i) => i === expanded);
  });
  insertExpandeds(document, editor, newExpandeds);
};

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(
    'bsCode.insertMarkdownAnchors',
    insertMarkdownAnchors);
  context.subscriptions.push(disposable);
}

export function deactivate() {
}
