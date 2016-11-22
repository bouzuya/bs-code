import { join, sep } from 'path';
import * as fs from 'fs-extra';
import { DateTime } from 'time-keeper/types/date-time'; // ?
import { now } from 'time-keeper/now';
import { inTimeZone } from 'time-keeper/in-time-zone';
import { parseUNIXTime } from 'time-keeper/parse-unix-time';
import { toISOString } from 'time-keeper/to-iso-string';
import { toUNIXTime } from 'time-keeper/to-unix-time';
import { toTimeZoneOffsetString } from 'time-keeper/to-time-zone-offset-string';

interface B {
  createdAt: number; // unix time (s)
  data: string; // markdown
  tags: string[];
}

const newB = (): B => {
  return {
    createdAt: toUNIXTime(now()),
    data: '',
    tags: []
  };
};

const toISODateString = (dt: DateTime): string => {
  const isoString = toISOString(inTimeZone(dt, 'Z'));
  return isoString.replace(/T.*Z$/, '');
};

const toIdString = (id: B): string => {
  // YYYY-MM-DDTHH:MM:SSZ -> YYYYMMDDTHHMMSSZ
  const isoString = toISOString(inTimeZone(parseUNIXTime(id.createdAt), 'Z'));
  return isoString.replace(/[-:]/g, '');
};

const toDirectoryPath = (rootDirectory: string, id: B): string => {
  // YYYY-MM-DDTHH:MM:SSZ -> root/YYYY/MM/DD
  const isoDateString = toISODateString(parseUNIXTime(id.createdAt));
  return join(rootDirectory, isoDateString.split('-').join(sep));
};

const toMetaJson = (b: B): string => {
  const createdAt = toISOString(parseUNIXTime(b.createdAt));
  const meta = Object.assign(
    { created_at: createdAt },
    (b.tags.length > 0 ? { tags: b.tags } : {}),
    // shared: [
    //   { type: 'twitter', url: 'http://example.com' }
    // ]
  );
  return JSON.stringify(meta);
};

const saveB = (rootDirectory: string, b: B): void => {
  const options = { encoding: 'utf-8' };
  const json = jsonPath(rootDirectory, b);
  (<any>fs.outputFileSync)(json, toMetaJson(b), options);
  const md = markdownPath(rootDirectory, b);
  (<any>fs.outputFileSync)(md, '', options);
};

const markdownPath = (rootDirectory: string, b: B): string => {
  const dir = toDirectoryPath(join(rootDirectory, 'flow'), b);
  const md = join(dir, toIdString(b) + '.md');
  return md;
};

const jsonPath = (rootDirectory: string, b: B): string => {
  const dir = toDirectoryPath(join(rootDirectory, 'flow'), b);
  const json = join(dir, toIdString(b) + '.json');
  return json;
};

const createB = (homeDirectory: string): string => {
  const rootDirectory = join(homeDirectory, '.bs-code');
  const b = newB();
  const md = markdownPath(rootDirectory, b);
  saveB(rootDirectory, b);
  return md;
};

export { createB };