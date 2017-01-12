import { ExtensionContext, commands } from 'vscode';
import { createAndOpenB } from './commands/create-and-open-b';
import { insertMarkdownAnchors } from './commands/insert-markdown-anchors';
import { openNextFile } from './commands/open-next-file';
import { openPairFile } from './commands/open-pair-file';
import { openPrevFile } from './commands/open-prev-file';

const bsCodeCommands = [
  { name: 'bsCode.createAndOpenB', fn: createAndOpenB },
  { name: 'bsCode.insertMarkdownAnchors', fn: insertMarkdownAnchors },
  { name: 'bsCode.openNextFile', fn: openNextFile },
  { name: 'bsCode.openPairFile', fn: openPairFile },
  { name: 'bsCode.openPrevFile', fn: openPrevFile }
];

export function activate(context: ExtensionContext): void {
  bsCodeCommands.forEach(({ name, fn }) => {
    const disposable = commands.registerCommand(name, fn);
    context.subscriptions.push(disposable);
  });
}

export function deactivate(): void {
}
