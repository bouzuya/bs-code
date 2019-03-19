import { ExtensionContext, commands } from 'vscode';
import { createAndOpenB } from './commands/create-and-open-b';
import { insertMarkdownAnchors } from './commands/insert-markdown-anchors';
import { openBOrBs } from './commands/open-b-or-bs';
import { openFileList } from './commands/open-file-list';
import { openFileListToday } from './commands/open-file-list-today';
import { openNextFile } from './commands/open-next-file';
import { openPairFile } from './commands/open-pair-file';
import { openPrevFile } from './commands/open-prev-file';
import { openSelectedFile } from './commands/open-selected-file';
import { openSelectedFileBeside } from './commands/open-selected-file-beside';
import { quoteSelectedFile } from './commands/quote-selected-file';
import { sendToSlack } from './commands/send-to-slack';

const bsCodeCommands = [
  { name: 'bsCode.createAndOpenB', fn: createAndOpenB },
  { name: 'bsCode.insertMarkdownAnchors', fn: insertMarkdownAnchors },
  { name: 'bsCode.openBOrBs', fn: openBOrBs },
  { name: 'bsCode.openFileList', fn: openFileList },
  { name: 'bsCode.openFileListToday', fn: openFileListToday },
  { name: 'bsCode.openNextFile', fn: openNextFile },
  { name: 'bsCode.openPairFile', fn: openPairFile },
  { name: 'bsCode.openPrevFile', fn: openPrevFile },
  { name: 'bsCode.openSelectedFile', fn: openSelectedFile },
  { name: 'bsCode.openSelectedFileBeside', fn: openSelectedFileBeside },
  { name: 'bsCode.quoteSelectedFile', fn: quoteSelectedFile },
  { name: 'bsCode.sendToSlack', fn: sendToSlack }
];

export function activate(context: ExtensionContext): void {
  bsCodeCommands.forEach(({ name, fn }) => {
    const disposable = commands.registerCommand(name, fn);
    context.subscriptions.push(disposable);
  });
}

export function deactivate(): void {
}
