import { workspace } from 'vscode';

const getSlackChannel = (): string | null => {
  const config = workspace.getConfiguration('bsCode');
  const slackChannel: string | null = config.get('slackChannel', null);
  return slackChannel;
};

export { getSlackChannel };
