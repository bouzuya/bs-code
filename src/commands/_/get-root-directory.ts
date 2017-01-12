import { workspace } from 'vscode';

const getRootDirectory = (): string | null => {
  const config = workspace.getConfiguration('bsCode');
  const rootDirectory: string | null = config.get('rootDirectory', null);
  return rootDirectory;
};

export { getRootDirectory };
