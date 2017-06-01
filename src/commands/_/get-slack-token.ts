import { workspace } from 'vscode';

const getSlackToken = (): string | null => {
  const config = workspace.getConfiguration('bsCode');
  const slackToken: string | null = config.get('slackToken', null);
  return slackToken;
};

export { getSlackToken };
