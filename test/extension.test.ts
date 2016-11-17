import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { activate } from '../src/extension';

suite('Extension Tests', () => {
  test('bsCode.insertMarkdownAnchors', () => {
    const push = sinon.stub();
    const context = { subscriptions: { push } };
    const registerCommand = sinon.stub();
    registerCommand.onCall(0).returns('command1');
    registerCommand.onCall(1).returns('command2');
    const commands = { registerCommand };
    proxyquire('../src/extension', {
      'vscode': { commands }
    });
    activate(<any>context);
    assert(context.subscriptions.push.callCount === 2);
    const [command1] = commands.registerCommand.getCall(0).args;
    assert(command1 === 'command1');
    const [command2] = commands.registerCommand.getCall(1).args;
    assert(command2 === 'command2');
    assert(commands.registerCommand.callCount === 2);
    const [name1, fn1] = commands.registerCommand.getCall(0).args;
    assert(name1 === 'bsCode.insertMarkdownAnchors');
    assert(fn1);
    const [name2, fn2] = commands.registerCommand.getCall(1).args;
    assert(name2 === 'bsCode.insertMarkdownAnchors');
    assert(fn2);
  });
});
