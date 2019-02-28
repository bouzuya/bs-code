import * as eaw from 'eastasianwidth';
import { parseUNIXTime } from 'time-keeper/parse-unix-time';
import { toISOString } from 'time-keeper/to-iso-string';
import { B } from './b';

const toSummary = (b: B): string => {
  const createdAt = toISOString(parseUNIXTime(b.meta.createdAt));
  return b.content
    .replace(/[\n\r]/g, ' ')
    .split('')
    .reduce(({ content, length }, c) => {
      if (length > 80) return { content, length };
      const l = eaw.length(content + c);
      return { content: content + (l > 80 ? '' : c), length: l };
    }, { content: createdAt + ' ', length: (createdAt + ' ').length })
    .content;
};

export { toSummary };
