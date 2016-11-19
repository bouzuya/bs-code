import { ExtensionContext, commands } from 'vscode';
import { createAndOpenB } from './commands/create-and-open-b';
import { insertMarkdownAnchors } from './commands/insert-markdown-anchors';
import { openPairFile } from './commands/open-pair-file';

const bsCodeCommands = [
  { name: 'bsCode.createAndOpenB', fn: createAndOpenB },
  { name: 'bsCode.insertMarkdownAnchors', fn: insertMarkdownAnchors },
  { name: 'bsCode.openPairFile', fn: openPairFile }
];

export function activate(context: ExtensionContext): void {
  bsCodeCommands.forEach(({ name, fn }) => {
    const disposable = commands.registerCommand(name, fn);
    context.subscriptions.push(disposable);
  });
}

export function deactivate(): void {
}
