import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

const imports = (): any => {
  const context = { subscriptions: { push: sinon.stub() } };
  const registerCommand = sinon.stub();
  registerCommand.onCall(0).returns('registerCommand result1');
  registerCommand.onCall(1).returns('registerCommand result2');
  registerCommand.onCall(2).returns('registerCommand result3');
  registerCommand.onCall(3).returns('registerCommand result4');
  registerCommand.onCall(4).returns('registerCommand result5');
  const commands = { registerCommand };
  const createAndOpenB = 'createAndOpenB';
  const insertMarkdownAnchors = 'insertMarkdownAnchors';
  const openNextFile = 'openNextFile';
  const openPairFile = 'openPairFile';
  const openPrevFile = 'openPrevFile';
  const extension = proxyquire('../src/extension', {
    'vscode': { commands },
    './commands/create-and-open-b': { createAndOpenB },
    './commands/insert-markdown-anchors': { insertMarkdownAnchors },
    './commands/open-next-file': { openNextFile },
    './commands/open-pair-file': { openPairFile },
    './commands/open-prev-file': { openPrevFile }
  });
  return {
    commands,
    context,
    extension,
    createAndOpenB,
    insertMarkdownAnchors,
    openNextFile,
    openPairFile,
    openPrevFile
  };
};

suite('Extension Tests', () => {
  test('register commands', () => {
    // setup
    const {
      commands,
      context,
      extension: { activate },
      createAndOpenB,
      insertMarkdownAnchors,
      openNextFile,
      openPairFile,
      openPrevFile
    } = imports();
    activate(<any>context);
    // assert
    assert(context.subscriptions.push.callCount === 5);
    const [command1] = context.subscriptions.push.getCall(0).args;
    assert(command1 === 'registerCommand result1');
    const [command2] = context.subscriptions.push.getCall(1).args;
    assert(command2 === 'registerCommand result2');
    const [command3] = context.subscriptions.push.getCall(2).args;
    assert(command3 === 'registerCommand result3');
    const [command4] = context.subscriptions.push.getCall(3).args;
    assert(command4 === 'registerCommand result4');
    const [command5] = context.subscriptions.push.getCall(4).args;
    assert(command5 === 'registerCommand result5');
    assert(commands.registerCommand.callCount === 5);
    const [name1, fn1] = commands.registerCommand.getCall(0).args;
    assert(name1 === 'bsCode.createAndOpenB');
    assert(fn1 === createAndOpenB);
    const [name2, fn2] = commands.registerCommand.getCall(1).args;
    assert(name2 === 'bsCode.insertMarkdownAnchors');
    assert(fn2 === insertMarkdownAnchors);
    const [name3, fn3] = commands.registerCommand.getCall(2).args;
    assert(name3 === 'bsCode.openNextFile');
    assert(fn3 === openNextFile);
    const [name4, fn4] = commands.registerCommand.getCall(2).args;
    assert(name4 === 'bsCode.openPairFile');
    assert(fn4 === openPairFile);
    const [name5, fn5] = commands.registerCommand.getCall(2).args;
    assert(name5 === 'bsCode.openPrevFile');
    assert(fn5 === openPrevFile);
  });
});
