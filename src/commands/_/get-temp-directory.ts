import { workspace } from 'vscode';

const getTempDirectory = (): string | null => {
  const config = workspace.getConfiguration('bsCode');
  const value: string | null = config.get('tempDirectory', null);
  return value;
};

export { getTempDirectory };
