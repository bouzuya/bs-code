import { ExtensionContext, commands } from 'vscode';
import { insertMarkdownAnchors } from './commands/insert-markdown-anchors';
import { openPairFile } from './commands/open-pair-file';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(commands.registerCommand(
    'bsCode.insertMarkdownAnchors',
    insertMarkdownAnchors));
  context.subscriptions.push(commands.registerCommand(
    'bsCode.openPairFile',
    openPairFile));
}

export function deactivate() {
}
