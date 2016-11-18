import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

const imports = (): any => {
  const push = sinon.stub();
  const context = { subscriptions: { push } };
  const registerCommand = sinon.stub();
  registerCommand.onCall(0).returns('registerCommand result1');
  registerCommand.onCall(1).returns('registerCommand result2');
  const commands = { registerCommand };
  const insertMarkdownAnchors = 'insertMarkdownAnchors';
  const openPairFile = 'openPairFile';
  const extension = proxyquire('../src/extension', {
    'vscode': { commands },
    './commands/insert-markdown-anchors': { insertMarkdownAnchors },
    './commands/open-pair-file': { openPairFile }
  });
  return {
    commands,
    context,
    extension,
    insertMarkdownAnchors,
    openPairFile
  };
};

suite('Extension Tests', () => {
  test('register commands', () => {
    // setup
    const {
      commands,
      context,
      extension: { activate },
      insertMarkdownAnchors,
      openPairFile
    } = imports();
    activate(<any>context);
    // assert
    assert(context.subscriptions.push.callCount === 2);
    const [command1] = context.subscriptions.push.getCall(0).args;
    assert(command1 === 'registerCommand result1');
    const [command2] = context.subscriptions.push.getCall(1).args;
    assert(command2 === 'registerCommand result2');
    assert(commands.registerCommand.callCount === 2);
    const [name1, fn1] = commands.registerCommand.getCall(0).args;
    assert(name1 === 'bsCode.insertMarkdownAnchors');
    assert(fn1 === insertMarkdownAnchors);
    const [name2, fn2] = commands.registerCommand.getCall(1).args;
    assert(name2 === 'bsCode.openPairFile');
    assert(fn2 === openPairFile);
  });
});
