import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

const imports = (): any => {
  const push = sinon.stub();
  const context = { subscriptions: { push } };
  const registerCommand = sinon.stub();
  registerCommand.onCall(0).returns('registerCommand result1');
  registerCommand.onCall(1).returns('registerCommand result2');
  registerCommand.onCall(2).returns('registerCommand result3');
  const commands = { registerCommand };
  const createB = 'createB';
  const insertMarkdownAnchors = 'insertMarkdownAnchors';
  const openPairFile = 'openPairFile';
  const extension = proxyquire('../src/extension', {
    'vscode': { commands },
    './commands/create-b': { createB },
    './commands/insert-markdown-anchors': { insertMarkdownAnchors },
    './commands/open-pair-file': { openPairFile }
  });
  return {
    commands,
    context,
    extension,
    createB,
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
      createB,
      insertMarkdownAnchors,
      openPairFile
    } = imports();
    activate(<any>context);
    // assert
    assert(context.subscriptions.push.callCount === 3);
    const [command1] = context.subscriptions.push.getCall(0).args;
    assert(command1 === 'registerCommand result1');
    const [command2] = context.subscriptions.push.getCall(1).args;
    assert(command2 === 'registerCommand result2');
    const [command3] = context.subscriptions.push.getCall(2).args;
    assert(command3 === 'registerCommand result3');
    assert(commands.registerCommand.callCount === 3);
    const [name1, fn1] = commands.registerCommand.getCall(0).args;
    assert(name1 === 'bsCode.createB');
    assert(fn1 === createB);
    const [name2, fn2] = commands.registerCommand.getCall(1).args;
    assert(name2 === 'bsCode.insertMarkdownAnchors');
    assert(fn2 === insertMarkdownAnchors);
    const [name3, fn3] = commands.registerCommand.getCall(2).args;
    assert(name3 === 'bsCode.openPairFile');
    assert(fn3 === openPairFile);
  });
});
