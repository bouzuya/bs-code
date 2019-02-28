import * as fs from 'fs-extra';
import { now } from 'time-keeper/now';
import { inTimeZone } from 'time-keeper/in-time-zone';
import { parseISOString } from 'time-keeper/parse-iso-string';
import { parseUNIXTime } from 'time-keeper/parse-unix-time';
import { toISOString } from 'time-keeper/to-iso-string';
import { toUNIXTime } from 'time-keeper/to-unix-time';
import * as bid from './bid';

interface B {
  content: string; // markdown
  meta: {
    createdAt: number; // unix time (s)
    tags: string[];
  };
}

const loadB = (rootDirectory: string, id: bid.BID): B => {
  const options = { encoding: 'utf-8' };
  const metaPath = bid.toMetaFilePath(rootDirectory, id);
  const contentPath = bid.toContentFilePath(rootDirectory, id);
  const metaObj = fs.readJSONSync(metaPath, options);
  const createdAt = toUNIXTime(parseISOString(metaObj.created_at));
  const tags = typeof metaObj.tags === 'undefined' ? [] : metaObj.tags;
  const meta = { createdAt, tags };
  const content = fs.readFileSync(contentPath, options);
  return { content, meta };
};

const newB = (): B => {
  return {
    content: '',
    meta: {
      createdAt: toUNIXTime(now()),
      tags: []
    }
  };
};

const toMetaJson = (b: B): string => {
  const createdAt = toISOString(parseUNIXTime(b.meta.createdAt));
  const meta = Object.assign(
    { created_at: createdAt },
    (b.meta.tags.length > 0 ? { tags: b.meta.tags } : {}),
    // shared: [
    //   { type: 'twitter', url: 'http://example.com' }
    // ]
  );
  return JSON.stringify(meta);
};

const saveB = (rootDirectory: string, b: B): void => {
  const id = toId(b);
  const options = { encoding: 'utf-8' };
  const metaPath = bid.toMetaFilePath(rootDirectory, id);
  const meta = toMetaJson(b);
  const contentPath = bid.toContentFilePath(rootDirectory, id);
  const content = '';
  fs.outputFileSync(metaPath, meta, options);
  fs.outputFileSync(contentPath, content, options);
};

const toId = (b: B): bid.BID | null => {
  const isoString =
    toISOString(inTimeZone(parseUNIXTime(b.meta.createdAt), 'Z'));
  const idString = isoString.replace(/[-:]/g, '');
  return bid.fromString(idString);
};

export {
  B,
  loadB,
  newB,
  saveB,
  toId
};
