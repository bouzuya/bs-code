import { newB, saveB, toId } from './b';
import { toContentFilePath } from './bid';

const createB = (rootDirectory: string): string => {
  const b = newB();
  const id = toId(b);
  const md = toContentFilePath(rootDirectory, id);
  saveB(rootDirectory, b);
  return md;
};

export { createB };
